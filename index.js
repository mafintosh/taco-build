var tar = require('tar-fs')
var cuid = require('cuid')
var duplexify = require('duplexify')
var os = require('os')
var fs = require('fs')
var path = require('path')
var exec = require('npm-execspawn')

module.exports = function (cmd) {
  var stream = duplexify()
  var tmp = path.join(os.tmpdir(), 'taco-build-' + cuid())

  fs.mkdir(tmp, function (err) {
    if (err) return stream.destroy(err)

    var extract = tar.extract(tmp)
    stream.setWritable(extract)

    var destroy = function (err) {
      stream.destroy(err)
    }

    extract.on('finish', function () {
      var build = exec(cmd, {cwd: tmp})

      if (!stream.emit('build', build)) {
        build.stdout.resume()
        build.stderr.resume()
      }

      build.on('error', destroy)
      build.on('exit', function (code) {
        if (code) return destroy(new Error('Build failed (' + code + ')'))

        var pack = tar.pack(tmp)
        stream.setReadable(pack)
      })
    })
  })

  return stream
}

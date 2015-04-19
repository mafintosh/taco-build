#!/usr/bin/env node

var build = require('./')
var cmd = process.argv.slice(2).join(' ')

var stream = build(cmd)

stream.on('build', function (proc) {
  proc.stdout.pipe(process.stderr)
  proc.stderr.pipe(process.stderr)
})

process.stdin.pipe(stream).pipe(process.stdout)

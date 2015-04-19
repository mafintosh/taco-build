#!/usr/bin/env node

var build = require('./')
var cmd = process.argv.slice(2).join(' ')

if (!cmd) {
  console.error('Usage: taco-build command')
  process.exit(1)
}

var stream = build(cmd)

stream.on('build', function (proc) {
  proc.stdout.pipe(process.stderr)
  proc.stderr.pipe(process.stderr)
})

process.stdin.pipe(stream).pipe(process.stdout)

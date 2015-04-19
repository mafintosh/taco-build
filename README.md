# taco-build

Build pipeline for [taco](https://github.com/maxogden/taco)

```
npm install -g taco-build
```

## Usage

Simply pipe a tarball to `taco-build some-build-command` and taco-build
will extract the tarball in a tmp dir, run the build command, and pipe out a new tarball with the results

``` js
cat some-tarball.tar | taco-build npm install | tar x
```

## Programmatic usage

``` js
var build = require('taco-build')

process.stdin.pipe(build('npm install')).pipe(process.stdout)
```

## License

MIT

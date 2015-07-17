# Distribucache Console Logger [![Build Status](https://secure.travis-ci.org/dowjones/distribucache-console-logger.png)](http://travis-ci.org/dowjones/distribucache-console-logger) [![NPM version](https://badge.fury.io/js/distribucache-console-logger.svg)](http://badge.fury.io/js/distribucache-console-logger)

Log all events emitted by [Distribucache] to the `stdout` / `stderr`.
This logger was designed to be used for debugging the cache.

**Note:** requires [Distribucache] version `>=6.0.0`.


## Usage

```js
import distribucache from 'distribucache';
import memoryStore from 'distribucache-memory-store';
import logEvents from 'distribucache-console-logger';

const cacheClient = distribucache.createClient(memoryStore());
const cache = cacheClient.create('nsp');

logEvents(cache);

cache.get('k', (err, value) => {
  //...
});
```


## License

[MIT](/LICENSE)


[Distribucache]: https://github.com/dowjones/distribucache

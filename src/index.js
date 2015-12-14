import colors from 'colors/safe';
import _forEach from 'lodash/collection/forEach';

const IS_ERROR_RE = /^error/;

export default function logEvents(cache, options = {}) {
  if (options.events) {
    const events = options.events;
    _forEach(events, function (event) {
      cache.on(event, function (...args) {
        const out = IS_ERROR_RE.test(this.event) ? 'stderr' : 'stdout';
        const timestamp = (new Date()).toISOString();
        const log = [colors.grey(timestamp)];

        if (options.namespace) log.push(options.namespace);
        log.push(colors.cyan(this.event), args);

        process[out].write(log.join(' ') + '\n');
      });
    });
  } else {
    cache.onAny(function (...args) {
      const out = IS_ERROR_RE.test(this.event) ? 'stderr' : 'stdout';
      const timestamp = (new Date()).toISOString();
      const log = [colors.grey(timestamp)];

      if (options.namespace) log.push(options.namespace);
      log.push(colors.cyan(this.event), args);

      process[out].write(log.join(' ') + '\n');
    });
  }
}


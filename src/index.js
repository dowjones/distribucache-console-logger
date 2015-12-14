import colors from 'colors/safe';

const IS_ERROR_RE = /^error/;

export default function logEvents(cache, options = {}) {
  if (options.events) {
    const events = options.events;
    events.forEach(function (event) {
      cache.on(event, _logEvent);
    });
  } else {
    cache.onAny(_logEvent);
  }

  function _logEvent (...args){
    const out = IS_ERROR_RE.test(this.event) ? 'stderr' : 'stdout';
    const timestamp = (new Date()).toISOString();
    const log = [colors.grey(timestamp)];
    if (options.namespace) log.push(options.namespace);
    log.push(colors.cyan(this.event), args);
    process[out].write(log.join(' ') + '\n');
  }
}

const IS_ERROR_RE = /^error/;

export default function logEvents(cache) {
  cache.onAny(function (...args) {
    const out = IS_ERROR_RE.test(this.event) ? 'stderr' : 'stdout';
    const timestamp = (new Date()).toISOString();
    process[out].write(
      `${timestamp} ${this.event} - ${args}\n`
    );
  });
}

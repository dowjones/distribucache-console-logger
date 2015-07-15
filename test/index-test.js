import {stub} from 'sinon';
import logEvents from '../src';

describe('distribucache-console-logger', () => {
  let outStub, errStub;

  beforeEach(() => {
    outStub = stub(process.stdout, 'write');
    errStub = stub(process.stderr, 'write');
  });

  afterEach(() => {
    outStub.restore();
    errStub.restore();
  });

  it('should write non-error events to stdout', () => {
    const cache = {
      onAny(cb) {
        cb.call({event: 'e'}, 'a1', 'a2');
      }
    };
    logEvents(cache);
    outStub.calledOnce.should.be.ok();
    errStub.called.should.not.be.ok();
  });

  it('should write error events to stderr', () => {
    const cache = {
      onAny(cb) {
        cb.call({event: 'error'}, 'a1', 'a2');
      }
    };
    logEvents(cache);
    errStub.calledOnce.should.be.ok();
    outStub.called.should.not.be.ok();
  });
});

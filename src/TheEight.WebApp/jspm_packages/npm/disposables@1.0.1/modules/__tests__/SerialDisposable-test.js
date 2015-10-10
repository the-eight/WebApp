/* */ 
'use strict';
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
};
var _expect = require("expect.js");
var _expect2 = _interopRequireWildcard(_expect);
var _Disposable = require("../Disposable");
var _Disposable2 = _interopRequireWildcard(_Disposable);
var _SerialDisposable = require("../SerialDisposable");
var _SerialDisposable2 = _interopRequireWildcard(_SerialDisposable);
describe('SerialDisposable', function() {
  var dispA = undefined;
  var dispB = undefined;
  var dispC = undefined;
  beforeEach(function() {
    dispA = new _Disposable2['default'](function() {
      dispA.disposed = true;
    });
    dispB = new _Disposable2['default'](function() {
      dispB.disposed = true;
    });
    dispC = new _Disposable2['default'](function() {
      dispC.disposed = true;
    });
  });
  it('throws on bad disposable', function() {
    var serial = new _SerialDisposable2['default']();
    _expect2['default'](function() {
      return serial.setDisposable(42);
    }).to.throwError();
    _expect2['default'](function() {
      return serial.setDisposable({});
    }).to.throwError();
    _expect2['default'](function() {
      return serial.setDisposable(0);
    }).to.throwError();
    _expect2['default'](function() {
      return serial.setDisposable('');
    }).to.throwError();
  });
  it('lets you get and set the current disposable', function() {
    var serial = new _SerialDisposable2['default']();
    _expect2['default'](serial.getDisposable()).equal(null);
    serial.setDisposable(dispA);
    _expect2['default'](serial.getDisposable()).equal(dispA);
    serial.setDisposable(null);
    _expect2['default'](serial.getDisposable()).equal(null);
    serial.setDisposable();
    _expect2['default'](serial.getDisposable()).equal(null);
    serial.setDisposable(dispA);
    _expect2['default'](serial.getDisposable()).equal(dispA);
  });
  it('disposes the current disposable on own dispose', function() {
    var serial = new _SerialDisposable2['default']();
    serial.setDisposable(dispA);
    _expect2['default'](dispA.disposed).to.equal(undefined);
    serial.dispose();
    _expect2['default'](dispA.disposed).to.equal(true);
  });
  it('disposes the just current disposable if is disposed itself', function() {
    var serial = new _SerialDisposable2['default']();
    serial.dispose();
    serial.setDisposable(dispA);
    _expect2['default'](dispA.disposed).to.equal(true);
    serial.setDisposable(null);
    serial.setDisposable(dispB);
    _expect2['default'](dispB.disposed).to.equal(true);
  });
  it('disposes the previous disposable ', function() {
    var serial = new _SerialDisposable2['default']();
    serial.setDisposable(dispA);
    _expect2['default'](dispA.disposed).to.equal(undefined);
    serial.setDisposable(dispB);
    _expect2['default'](dispA.disposed).to.equal(true);
    _expect2['default'](dispB.disposed).to.equal(undefined);
    serial.setDisposable(null);
    _expect2['default'](dispB.disposed).to.equal(true);
    serial.setDisposable(dispC);
    _expect2['default'](dispC.disposed).to.equal(undefined);
    serial.setDisposable(null);
    _expect2['default'](dispC.disposed).to.equal(true);
  });
  it('does not attempt to dispose the child twice', function() {
    var serial = new _SerialDisposable2['default']();
    serial.setDisposable(dispA);
    serial.dispose();
    _expect2['default'](dispA.disposed).to.equal(true);
    dispA.disposed = 42;
    serial.dispose();
    _expect2['default'](dispA.disposed).to.equal(42);
  });
});

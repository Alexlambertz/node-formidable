if (global.GENTLY) require = GENTLY.hijack(require);

var Buffer = require('buffer').Buffer;

function PLAINParser() {
  this.data = new Buffer('');
  this.bytesWritten = 0;
}
exports.PLAINParser = PLAINParser;

PLAINParser.prototype.initWithLength = function(length) {
  this.data = new Buffer(length);
};

PLAINParser.prototype.write = function(buffer) {
  if (this.data.length >= this.bytesWritten + buffer.length) {
    buffer.copy(this.data, this.bytesWritten);
  } else {
    this.data = Buffer.concat([this.data, buffer]);
  }
  this.bytesWritten += buffer.length;
  return buffer.length;
};

PLAINParser.prototype.end = function() {
  this.onField("plain", this.data.toString('utf8'));
  this.data = null;

  this.onEnd();
};

'use strict';
function toLine(arg_string) {
  return arg_string.replace(/[A-Z]/g, item => `_${item.toLowerCase()}`);
}
module.exports = { toLine };

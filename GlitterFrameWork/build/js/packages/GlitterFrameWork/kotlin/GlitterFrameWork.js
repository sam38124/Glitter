(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'GlitterFrameWork'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'GlitterFrameWork'.");
    }root.GlitterFrameWork = factory(typeof GlitterFrameWork === 'undefined' ? {} : GlitterFrameWork, kotlin);
  }
}(this, function (_, Kotlin) {
  'use strict';
  Kotlin.defineModule('GlitterFrameWork', _);
  return _;
}));

//# sourceMappingURL=GlitterFrameWork.js.map

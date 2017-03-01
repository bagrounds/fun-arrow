/**
 *
 * @module fun-arrow
 */
;(function () {
  'use strict'

  /* imports */
  var compose = require('fun-compose')

  /* exports */
  module.exports = Arrow
  module.exports.compose = arrowCompose
  module.exports.first = arrowFirst
  module.exports.second = arrowSecond
  module.exports.parallel = arrowParallel
  module.exports.split = arrowSplit
  module.exports.merge = arrowMerge

  function Arrow (f) {
    if (!this) {
      return new Arrow(f)
    }

    this.compute = f
  }

  function arrowCompose (a1, a2) {
    return Arrow(compose([a1.compute, a2.compute]))
  }

  function arrowFirst (a) {
    return Arrow(function (pair) {
      return [a.compute(pair[0]), pair[1]]
    })
  }

  function arrowSecond (a) {
    return Arrow(function (pair) {
      return [pair[0], a.compute(pair[1])]
    })
  }

  function arrowParallel (a1, a2) {
    return Arrow(function (pair) {
      return [a1.compute(pair[0]), a2.compute(pair[1])]
    })
  }

  function arrowSplit (a) {
    return Arrow(function (x) {
      return [a.compute(x), a.compute(x)]
    })
  }

  function arrowMerge (a) {
    return Arrow(function (pair) {
      return a.compute(pair[0], pair[1])
    })
  }

  Arrow.prototype.compose = function (arrow) {
    return arrowCompose(arrow, this)
  }

  Arrow.prototype.first = function () {
    return arrowFirst(this)
  }

  Arrow.prototype.second = function () {
    return arrowSecond(this)
  }

  Arrow.prototype.parallel = function (arrow) {
    return arrowParallel(arrow, this)
  }

  Arrow.prototype.split = function () {
    return arrowSplit(this)
  }

  Arrow.prototype.merge = function () {
    return arrowMerge(this)
  }
})()


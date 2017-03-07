/**
 *
 * @module fun-arrow
 */
;(function () {
  'use strict'

  /* imports */
  var funCompose = require('fun-compose')

  /* exports */
  module.exports = {}
  module.exports.compose = compose
  module.exports.first = first
  module.exports.second = second
  module.exports.parallel = parallel
  module.exports.split = split
  module.exports.merge = merge

  /**
   *
   * >>> :: Y a b -> Y b c -> Y a c
   *
   * @function module:fun-arrow.compose
   *
   * @param {Function} f - a -> b
   * @param {Function} g - b -> c
   *
   * @return {Function} a -> c
   */
  function compose (f, g) {
    return funCompose(f, g)
  }

  /**
   *
   * first :: Y a b -> Y (a, c) (b, c)
   *
   * @function module:fun-arrow.first
   *
   * @param {Function} f - a -> b
   *
   * @return {Function} [a, c] -> [b, c]
   */
  function first (f) {
    return function (pair) {
      return [f(pair[0]), pair[1]]
    }
  }

  /**
   *
   * second :: Y a b -> Y (c, a) (c, b)
   *
   * @function module:fun-arrow.second
   *
   * @param {Function} f - a -> b
   *
   * @return {Function} [c, a] -> [c, b]
   */
  function second (f) {
    return function (pair) {
      return [pair[0], f(pair[1])]
    }
  }

  /**
   *
   * *** :: Y a b -> Y c d -> Y (a, c) (b, d)
   *
   * @function module:fun-arrow.parallel
   *
   * @param {Function} f - a -> b
   * @param {Function} g - c -> d
   *
   * @return {Function} [a, c] -> [b, d]
   */
  function parallel (f, g) {
    return function (pair) {
      return [f(pair[0]), g(pair[1])]
    }
  }

  /**
   *
   * &&& :: Y a b -> Y a c -> Y a (b, c)
   *
   * @function module:fun-arrow.split
   *
   * @param {Function} f - a -> b
   * @param {Function} g - a -> c
   *
   * @return {Function} a -> [b, c]
   */
  function split (f, g) {
    return function (x) {
      return [f(x), g(x)]
    }
  }

  /**
   *
   * ??? :: Y (a, b) c -> Y (a, b) c
   *
   * @function module:fun-arrow.merge
   *
   * @param {Function} f - (a, b) -> c
   *
   * @return {Function} [a, b] -> c
   */
  function merge (f) {
    return function (pair) {
      return f(pair[0], pair[1])
    }
  }
})()


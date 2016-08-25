'use strict'

const union = require('lodash.union');
const bindKey = require('lodash.bindkey');

/**
 * Takes a target object and attaches the source object's properties via a new
 * delegate property as named in the function call.
 *
 * @param {object} thisArg - The `this` object which will have the new delegate
 * @param {object} delegate - The delegate object itself
 * @param {string} name - The name of the parameter. If unchanged it will override
 */
const delegate = (thisArg, delegate, name) => {
  if (!name) name = '_delegate';

  let proto = Object.getPrototypeOf(delegate);
  let properties = union(
    // ES6 classes need to get names from proto whilst properties will be avail on delegate
    Object.getOwnPropertyNames(delegate).concat(Object.getOwnPropertyNames(proto))
  );

  // Set the delegate
  thisArg[name] = delegate;

  // Delegate all of the properties
  for (let property of properties) {
    if (typeof(delegate[property]) === 'function')
      thisArg[property] = bindKey(delegate, property);
    else
      Object.defineProperty(thisArg, property, {
        get: () => delegate[property],
        set: (v) => delegate[property] = v
      })
  }
}

module.exports = delegate;

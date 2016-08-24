'use strict'

class NestedInternal {
  doStuff() {
    return 'Doing amazing stuff!';
  }
}

class Counter {
  constructor() {
    this._internal = new NestedInternal();
    this.count = 0;
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

const Point = function(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.location = function() { return `(${this.x}, ${this.y})`; }

module.exports = {
  Counter: Counter,
  Point: Point
}

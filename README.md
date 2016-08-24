# Auto Delegate

> A simple auto delegation utility which attaches all the properties of some delegate to a single property under the owner

[![Build Status](https://travis-ci.org/lteacher/auto-delegate.svg?branch=master)](https://travis-ci.org/lteacher/auto-delegate)
[![Coverage Status](https://coveralls.io/repos/github/lteacher/auto-delegate/badge.svg?branch=master)](https://coveralls.io/github/lteacher/auto-delegate?branch=master)
## What for?

This can be helpful if you want to mixin some object instance and its functionality without directly extending the target object.

Here is some random example from the tests (sort of)

```javascript
// There is some counter class (babel-ified)
class Counter {
  let count = 0;
  
  increment = () => this.count++;
  decrement = () => this.count--;
}

// There is some point thingo
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  get location = () => `(${this.x}, ${this.y})`;
}

/* Well here you can delegate to these two additional classes. Its not an amazing example 
 * but shows the idea. Its a bit more useful with a bigger object that also has its state 
 * spoiled when extending but this is just a demo */
class TrackedLocation {
  constructor() {
    delegate(this, new Counter(), '_counter');
    delegate(this, new Point(0,2), '_point');
  }
}

// And use the methods
let tracked = new TrackedLocation();
tracked.increment();
console.log(tracked.count); // 1
console.log(tracked.location); // '(0, 2)'
```

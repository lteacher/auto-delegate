import test from 'ava';
import delegate from '../lib/index';
import {Counter, Point} from './fixtures/setup';

test('Counter is standalone with increment', async t => {
  let c1 = new Counter();
  let c2 = new Counter();
  c1.increment();
  c1.increment();

  t.is(c1.count, 2);
  t.is(c2.count, 0);
});

test('Default delegate name is set', async t => {
  let t1 = new Tracker();

  t.not(t1._delegate, undefined);
});

test('Custom delegate name is set', async t => {
  let t1 = new Tracker('_counter');

  t.not(t1._counter, undefined);
});

test('Can delegate to a counter', async t => {
  let t1 = new Tracker();

  t.is(t1.count, 0);
  t1.increment();
  t.is(t1.count, 1);
});

test('A delegate is unique to an instance', async t => {
  let t1 = new Tracker();
  let t2 = new Tracker();

  t1.increment();
  t1.increment();

  t.is(t1.count, 2);
  t.is(t2.count, 0);
});

test(`A delegate's property methods are not delegated`, async t => {
  let t1 = new Tracker();

  t.is(t1.doStuff, undefined);
});

test(`A non ES6 class can be delegated happily`, async t => {
  let t1 = new TrackedLocation();
  t1.increment();

  t.is(t1.location(), '(10, 20)');
  t.is(t1.count, 1);
});

test(`Can override a delegated method`, async t => {
  let t1 = new Tracker();
  t1.increment = () => 'Not counting';
  t.is(t1.increment(), 'Not counting');
});

test(`Can change a delegated property`, async t => {
  let t1 = new Tracker();
  t1.count = 10;
  t.is(t1.count, 10);
  t.is(t1._delegate.count, 10);
});

test(`A built-in can be delegated`, async t => {
  let parser = new AwesomeParser();

  let json = parser.parse(`{"data":"amazingsz"}`);

  t.deepEqual(json, {data:"amazingsz"});
});

class Tracker {
  constructor(name) {
    delegate(this, new Counter(), name);
  }
}

class AwesomeParser {
  constructor() {
    delegate(this, JSON, '_parser');
  }
}

class TrackedLocation {
  constructor() {
    delegate(this, new Point(10, 20), '_point');
    delegate(this, new Counter(), '_counter');
  }
}

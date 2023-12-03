import { Counter } from "./Counter";

const counter = new Counter();

counter.increment();
counter.increment();
counter.increment();
counter.decrement();

console.log(counter.value);
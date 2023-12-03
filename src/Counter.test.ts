import { Counter } from "./Counter"

describe("Counter tests", () => {
    let _counter: Counter;

    beforeEach(() => {
        _counter = new Counter();
    })

    it("should start with a value of zero", () => {
        expect(_counter.value).toEqual(0);
    })

    it("should increment", () => {
        _counter.increment();
        expect(_counter.value).toEqual(1);
    })

    it("should decrement", () => {
        _counter.decrement();
        expect(_counter.value).toEqual(-1);
    })
})
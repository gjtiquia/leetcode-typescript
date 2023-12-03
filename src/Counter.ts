export class Counter {
    public get value() { return this._value }

    private _value: number = 0;

    public increment() {
        this._value++;
    }

    public decrement() {
        this._value--;
    }
}
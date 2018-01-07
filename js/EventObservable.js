class EventObservable {
    constructor() {
        this.observers = [];
    }
}

EventObservable.prototype.subscribe = function(fn) {
    this.observers.push(fn);

    return () => this.unsubscribe(fn);
};

EventObservable.prototype.unsubscribe = function(fn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
};

EventObservable.prototype.broadcast = function(data) {
    this.observers.forEach((subscriber) => subscriber(data));
};

export default EventObservable
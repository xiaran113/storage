export default class DefaultCache {

    constructor(storage, options) {
        this.storage = storage;
        this.expires = options.expires;
    }

    get(key) {
        let item = this.storage[key];
        if (!item) {
            return null;
        } else if (item.expires && item.expires < +new Date) {
            this.remove(key);
            return null;
        } else {
            return this.storage[key].value;
        }
    };

    set(key, value) {
        this.storage[key] = this.storage[key] || {};
        this.storage[key].value = value;
        if (this.expires) {
            this.storage[key].expires = +new Date + this.expires * 1000;
        }
        return this.storage;
    };

    remove(key) {
        delete this.storage[key];
        return this.storage;
    }
}
import LRUCache from './lruCache';

const localStorage = window.localStorage;

export default class Storage {
    constructor(options) {
        options = options || {};
        this.options = options;
        if (!window.localStorage) return null;
        this.id = options.id || this.generateId(4);
        // 通过id来区分模块，模块之间互不干扰
        this.storage = JSON.parse(localStorage.getItem(this.id)) || {};
        if (!this.storage) {
            this.storage = {};
            localStorage.setItem(this.id, JSON.stringify(this.storage));
        }
        this.strategy = new LRUCache(this.storage, options);
    }

    // 随机生成0-9a-z的字符串
    generateId(size) {
        let id = '';
        for(let i = 0; i < size; i++) {
            id = id + parseInt(Math.random() * 36, 10).toString(36)
        }
        return id;
    }

    // 获取模块中的某个key值
    getItem(key) {
        let value = this.strategy.get(key);
        localStorage.setItem(this.id, JSON.stringify(this.storage));
        return value;
    }

    // 设置模块某个key值
    setItem(key, value) {
        this.strategy.set(key, value);
        localStorage.setItem(this.id, JSON.stringify(this.storage));
    }

    // 删除模块中的key值
    removeItem(key) {
        delete this.storage[key];
        localStorage.setItem(this.id, JSON.stringify(this.storage));
    }

    // 从localStorage中移除模块
    clear() {
        localStorage.removeItem(this.id);
        this.storage = null;
    }

    // 设置存储策略
    setCacheStrategy(Strategy, options) {
        options = Object.assign(this.options, options);
        this.strategy = new Strategy(this.storage, options);
    }
}
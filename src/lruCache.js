export default class LRUCache {

    constructor(storage, options) {
        options = options || {};
        this.capacity = options.capacity || 2;
        this.storage = storage || {};
        this.keyIndex = []; // key的索引
        this.priorityIndex = []; // 优先值索引
        this.priority = 0; // 最新的优先值
        // 初始化keyIndex, priorityIndex, priority
        for(var i in this.storage) {
            var item = this.storage[i];
            this.keyIndex.push(i);
            this.priorityIndex.push(item.p);
            if (!this.priority || item.p > this.priority) {
                this.priority = item.p;
            }
        }
        this.priority++;
    }

    get(key) {
        let item = this.storage[key]; // 根据key获取条目
        if (item) {
            item.p = this.priority; // 设置条目为最新
            this.priorityIndex[this.keyIndex.indexOf(key)] = this.priority; // 存入优先值索引
            this.priority++; // 更新最新优先值
            return item.v;
        } else {
            return null;
        }
    }

    set(key, value) {
        let item = this.storage[key];
        let min = -1;
        if (item) {
            // 如果条目存在，则更新条目，并将最新优先值设置进去
            item.v = value;
            item.p = this.priority;
            this.priorityIndex[this.keyIndex.indexOf(key)] = this.priority;
        } else if (this.keyIndex.length < this.capacity && !item) {
            // 条目不存在，并且容量允许，则创建新条目
            this.storage[key] = {
                v: value,
                p: this.priority
            };
            this.keyIndex.push(key);
            this.priorityIndex.push(this.priority);
        } else {
            // 超过容量，根据优先值索引，找出优先值最小的条目索引
            for(var i = 0; i < this.capacity; i++) {
                if (min < 0 || this.priorityIndex[min] > this.priorityIndex[i]) {
                    min = i;
                }
            }
            delete this.storage[this.keyIndex[min]]; // 删除优先值最小条目

            // 插入新条目
            this.storage[key] = {
                v: value,
                p: this.priority
            };
            this.keyIndex[min] = key;
            this.priorityIndex[min] = this.priority;
        }
        this.priority++;
        return this.storage;
    }
}


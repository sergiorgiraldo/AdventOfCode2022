// From https://stackoverflow.com/a/66511107/4235871
const MinHeap = {
	shiftDown(h, i = 0, v = h[i]) {
		if (i < h.length) {
			let k = v[0];
			while (1) {
				let j = i * 2 + 1;
				if (j + 1 < h.length && h[j][0] > h[j + 1][0]) j++;
				if (j >= h.length || k <= h[j][0]) break;
				h[i] = h[j];
				i = j;
			}
			h[i] = v;
		}
	},
	heapify(h) {
		for (let i = h.length >> 1; i--; ) this.shiftDown(h, i);
		return h;
	},
	pop(h) {
		return this.exchange(h, h.pop());
	},
	exchange(h, v) {
		if (!h.length) return v;
		let w = h[0];
		this.shiftDown(h, 0, v);
		return w;
	},
	push(h, v) {
		let k = v[0],
			i = h.length,
			j;
		while ((j = (i - 1) >> 1) >= 0 && k < h[j][0]) {
			h[i] = h[j];
			i = j;
		}
		h[i] = v;
		return h;
	}
};

class Queue {
	constructor() {
		this.elements = {};
		this.head = 0;
		this.tail = 0;
	}
	enqueue(element) {
		this.elements[this.tail] = element;
		this.tail++;
	}
	dequeue() {
		const item = this.elements[this.head];
		delete this.elements[this.head];
		this.head++;
		return item;
	}
	peek() {
		return this.elements[this.head];
	}
	get length() {
		return this.tail - this.head;
	}
	get isEmpty() {
		return this.length === 0;
	}
}

class PQueue {
	constructor() {
		this.elements = {};
		this.head = 0;
		this.tail = 0;
		this.count = 0;
		this.max_priority = -Infinity;
	}
	enqueue(element) {
		element.priority = element.priority || 0;
		if (this.count > 0) {
			let prev = this.tail;
			this.tail = this.head > this.tail ? this.head + 1 : this.tail + 1;
			this.elements[prev].next = this.tail;
			this.elements[this.tail] = element;
			this.elements[this.tail].prev = prev;
		} else {
			this.elements[this.tail] = element;
			this.elements[this.tail].prev = null;
			this.elements[this.tail].next = null;
		}
		if (element.priority > this.max_priority) {
			this.max_priority = element.priority;
			if (this.count > 0) {
				this.elements[this.tail].next = this.head;
				this.elements[this.head].prev = this.tail;
				this.head = this.tail;
				this.tail = this.elements[this.tail].prev;
				this.elements[this.tail].next = null;
				this.elements[this.head].prev = null;
			}
		}
		this.count++;
	}
	dequeue() {
		if (this.count === 0) return undefined;
		let item = this.elements[this.head];
		this.head = item.next;
		this.count--;
		if (this.count === 0) {
			this.head = 0;
			this.tail = 0;
			this.max_priority = -Infinity;
		} else {
			this.max_priority = this.elements[this.head].priority;
		}
		delete this.elements[item];
		return item;
	}

	peek() {
		return this.elements[this.head];
	}

	get length() {
		return this.count;
	}

	get isEmpty() {
		return this.count === 0;
	}
}

module.exports = { MinHeap, Queue, PQueue };

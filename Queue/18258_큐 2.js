const fs = require('fs');
const [N, ...input] = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim());

class Queue {
  constructor() {
    this.front = null;
    this.back = null;
    this.size = 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.front) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }
    this.size++;
  }

  pop() {
    if (this.isEmpty()) {
      return -1;
    }
    const removeNode = this.front;
    this.front = removeNode.next;
    if (!this.front) {
      this.back = null;
    }
    this.size--;
    return removeNode.value;
  }

  isEmpty() {
    return this.size === 0 ? 1 : 0;
  }
  getFront() {
    return this.isEmpty() ? -1 : this.front.value;
  }
  getBack() {
    return this.isEmpty() ? -1 : this.back.value;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function solution() {
  const result = [];
  const queue = new Queue();

  for (let i = 0; i < input.length; i++) {
    const [command, value] = input[i].split(' ').map((line) => line.trim());

    switch (command) {
      case 'push':
        queue.push(value);
        break;
      case 'pop':
        result.push(queue.pop());
        break;
      case 'size':
        result.push(queue.size);
        break;
      case 'empty':
        result.push(queue.isEmpty());
        break;
      case 'front':
        result.push(queue.getFront());
        break;
      case 'back':
        result.push(queue.getBack());
        break;
    }
  }

  console.log(result.join('\n'));
}

solution();

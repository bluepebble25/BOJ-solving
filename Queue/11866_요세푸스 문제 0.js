const fs = require('fs');
const [N, K] = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  shift() {
    const removeNode = this.head;
    this.head = removeNode.next;
    if (!this.head) {
      this.tail = null;
    }
    this.size--;
    return removeNode.value;
  }
  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.size++;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function solution() {
  const queue = new Queue();
  const result = [];
  for (let i = 1; i <= N; i++) {
    queue.push(i);
  }
  while (queue.size > 0) {
    for (let i = 0; i < K - 1; i++) {
      queue.push(queue.shift());
    }
    result.push(queue.shift());
  }

  return '<' + result.join(', ') + '>';
}

console.log(solution());

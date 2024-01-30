const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim();
const N = Number(input);

/*
  shift() 연산은 시간복잡도가 O(N)이므로 Queue를 LinkedList 방식으로 직접 구현하자.
*/

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  shift() {
    if (!this.head) {
      return null;
    }

    const removeNode = this.head;
    this.head = removeNode.next;
    if (!this.head) {
      this.tail = null;
    }
    this.size--;
    return removeNode.value;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function solution() {
  if (N === 1) return 1;

  const queue = new Queue();
  for (let i = 1; i <= N; i++) {
    queue.push(i);
  }

  while (true) {
    queue.shift();
    if (queue.size === 1) return queue.head.value;
    queue.push(queue.shift());
  }
}

console.log(solution());

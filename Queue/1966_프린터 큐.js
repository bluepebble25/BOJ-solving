const fs = require('fs');
const input = fs.readFileSync('input.txt').toString().trim().split('\n');
const T = input.shift();
const result = [];

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(importance, order) {
    const newNode = new Node(importance, order);
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.size++;
  }

  shift() {
    const removeNode = this.head;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.size--;
    return removeNode;
  }
}

class Node {
  constructor(importance, order) {
    this.importance = importance;
    this.order = order;
    this.next = null;
  }
}

function solution(N, M, docs) {
  const queue = new Queue();
  let count = 0;
  let index = 0;
  const importanceArr = docs.slice().sort((a, b) => b - a);

  for (let i = 0; i < N; i++) {
    queue.push(docs[i], i);
  }

  while (queue.size > 0) {
    const curr = queue.shift();
    if (curr.importance < importanceArr[index]) {
      queue.push(curr.importance, curr.order);
    } else if (curr.importance === importanceArr[index]) {
      count++;
      index++;

      if (curr.order === M) {
        break;
      }
    }
  }

  return count;
}

for (let i = 0; i < T; i++) {
  const [N, M] = input[i * 2].trim().split(' ').map(Number);
  const docs = input[i * 2 + 1].trim().split(' ').map(Number);
  result.push(solution(N, M, docs));
}

console.log(result.join('\n'));

/*
  Queue를 구현한다.
  그런데 숫자 같은 문서가 여러개 있을 시
  queue를 섞다보면 원래 지정한 M번째 정수를 구분할 수 없다.
  따라서 M번째 정수를 구분할 무언가가 필요하다.
  각 node는 처음 순서를 order라는 속성에 갖고있도록 하자.

  queue의 size가 0이 될 때까지 while문으로 문서를 출력한다.
  head 문서의 중요도보다 높은 값이 있는지는 중요도를 내림차순으로 정렬한 배열을 만들어놓고 확인한다.

  - 중요도를 내림차순으로 저장한 배열에서 가장 큰 수를 index라는 변수로 가리킨다.
  - 만약 shift()한 문서와 중요도 배열에서 현재 가리키고 있는 값이 같다면
    문서를 출력할 수 있는 것이므로 push하지 않고, 그 다음 출력할 문서 가리키기 위해 index 1 증가
    출력 됐으므로 count++를 한다
  - 만약 shift()한 문서가 M번째 문서라면 종료한다.
  - 만약 현재 가장 큰 중요도 숫자보다 현재 문서가 작다면 push로 뒤에 덧붙인다.

  count가 최종 답
*/

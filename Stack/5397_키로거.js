const fs = require('fs');
const [T, ...TC] = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim());

function solution(str) {
  const A = [];
  const B = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '<') {
      A.length && B.push(A.pop());
    } else if (str[i] === '>') {
      B.length && A.push(B.pop());
    } else if (str[i] === '-') {
      A.pop();
    } else {
      A.push(str[i]);
    }
  }

  return A.join('') + B.reverse().join('');
}

const result = TC.map((testCase) => solution(testCase));
console.log(result.join('\n'));

/*
  방법 2로 풀었다!

  방법 1)
  splice(startIndex, (deleteCount), (삭제하는 곳에 대신 대체할 원소들))
  배열의 중간에 원소를 삽입할 때 deleteCount를 0으로 설정하는 식으로 삽입할 때 쓸수도 있다.

  커서 역할을 할 index 변수를 둔다.
  - 문자열을 입력할 때마다 index++ 한다.
    그리고 index가 arr.length가 아니라면 해당 위치에 splice로 삽입, 아니면 맨 끝에 push한다.
  - <를 입력받았을 때는 index > 0일 때만 index-- 할 수 있다. 그 외에는 무시한다.
  - >를 입력받았을 때는 index < arr.length 일 때만 index++ 할 수 있다. 그 외에는 무시한다.
  - -를 입력받으면 해당 위치의 문자를 삭제하고 index--한다.

  ...하지만 이렇게 하면 splice의 시간복잡도가 O(N)이기 때문에
  문자열의 길이가 최대 백만개인 이 경우에는 시간초과가 날 것 같다.

  방법 2)
  배열의 중간에 값을 삽입하는 것은 배열을 두 개로 갈라서 그 사이에 원소를 끼우고 덧붙이는 것과 같다.
  따라서 배열을 두 개 두고,
  문자를 덧붙이는 방향의 것은 A 배열에 push,
  커서로 뒤로 가는 경우에는 A에서 pop 해와서 B에 unshift (앞에 추가)
  커서가 오른쪽으로 가면 B 배열에서 shift (앞에서 빼오기) A에 push

  그런데 배열을 반으로 갈라 실제 커서의 움직임을 흉내내기 위해
  배열에 앞에 값을 삽입하거나 가져오는 행위는 시간복잡도면에서 비효율적이다.
  이 동작을 pop으로 대체하기 위해 B는 뒤집어서 저장해준다.

  정리하면
  - 문자 입력 -> A에 push
  - < 만나면 A에서 pop, B에 push
  - > 만나면 B에서 pop, A에 push
  - - 만나면 B에서 pop
*/

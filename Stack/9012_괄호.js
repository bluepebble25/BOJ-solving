const fs = require('fs');
const [T, ...TC] = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.trim());

function solution(PS) {
  const stack = [];
  for (let i = 0; i < PS.length; i++) {
    if (PS[i] === '(') {
      stack.push(PS[i]);
    } else {
      if (stack.length === 0) return 'NO';
      stack.pop();
    }
  }

  return stack.length !== 0 ? 'NO' : 'YES';
}

const result = TC.map((testCase) => solution(testCase));
console.log(result.join('\n'));

/*
  ( 가 들어오면 push,
  )가 들어오면 pop 한다.
  만약 )가 들어왔는데 stack.length가 0이라면 return NO
  들어온 괄호 문자열 검사를 마치고 맨 마지막에 stack에 남은게 있다면 NO, 아니면 YES
*/

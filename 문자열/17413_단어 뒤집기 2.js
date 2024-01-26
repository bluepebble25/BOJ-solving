const fs = require('fs');
const str = fs.readFileSync('input.txt').toString().trim();

function solution() {
  const answer = [];
  let word = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '<') {
      const tag = [];

      if (word.length !== 0) {
        answer.push(...word.reverse());
        word = [];
      }

      while (str[i] !== '>') {
        tag.push(str[i]);
        i++;
      }
      answer.push(...tag, '>');
    } else if (str[i] === ' ') {
      answer.push(...word.reverse(), ' ');
      word = [];
    } else {
      word.push(str[i]);
    }
  }

  if (word.length !== 0) {
    answer.push(...word.reverse());
  }

  return answer.join('');
}

console.log(solution());

/*
  문자열은 불변성(immutable)을 가지기 때문에 더하기 연산은 효율이 좋지 못하다.
  그러므로 태그나 단어는 배열 형태로 저장한 다음 나중에 join해주도록 하자.

  과연 단어를 뒤집어야 하는 타이밍은 언제일까?
  - 공백을 만났을 때
  - <를 만났을 때
  - 공백이나 <를 만나지 않고 str 순회가 끝났을 때 (끝났는데 word 스택에 뭐가 남아있을 때)

  *** pseudo code ***

  if (<를 만났을 때)
    - word 스택에 뭐가 있다면 단어를 뒤집고 result에 push
    - while문으로 >를 만날 때까지 <부터 >까지를 tag에 push한다.
    - result 배열에 push한다.
  else if (공백을 만났을 때)
    - word 스택에 뭐가 있다면 단어를 뒤집고 result에 push
    - 공백 result에 push
  else
    - 일반 문자열임. word에 push
  다 끝내고 wor에 뭐가 남아있으면 뒤집어서 result에 push

  result를 join으로 이어서 return
*/

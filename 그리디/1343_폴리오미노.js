const fs = require('fs');
const str = fs.readFileSync('./input.txt').toString().trim();

function solution() {
  const result = [];
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '.') {
      if (count % 2 !== 0) return -1;
      const Acount = Math.floor(count / 4);
      const Bcount = count % 4;
      const chunk = 'AAAA'.repeat(Acount) + 'B'.repeat(Bcount) + '.';
      result.push(chunk);
      count = 0;
    } else {
      count++;
    }
  }

  if (count % 2 !== 0) return -1;
  const Acount = Math.floor(count / 4);
  const Bcount = count % 4;
  const chunk = 'AAAA'.repeat(Acount) + 'B'.repeat(Bcount);
  result.push(chunk);

  return result.join('');
}

console.log(solution());

/*
  for문으로 검사해서 str[i]번째 문자열이
  1) X라면 count++
  2) .를 만나면
  - count가 홀수라면 return -1
  - 이전까지 셌던 count를 4로 나눈 몫을 구하고 그만큼 AAAA를 repeat,
    4로 나눈 나머지가 2라면 BB를 추가, 마지막으로 점을 더한다.
    그리고 최종 문자열을 result에 push
  - count = 0으로 초기화

  마무리로 .을 못만나고 count를 센 채로 끝났을 때를 대비해
  for문 바깥에서도 같은 작업을 해준다.
  이때는 문자열 마지막에 점을 추가하지 않는다.

  result를 join해 출력
*/

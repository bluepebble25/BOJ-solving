const fs = require('fs');
const str = fs.readFileSync('input.txt').toString().trim().split('').sort();

function solution() {
  const first = [];
  let middle = '';
  const countMap = new Map();

  for (let i = 0; i < str.length; i++) {
    if (!countMap.has(str[i])) {
      countMap.set(str[i], 1);
    } else {
      countMap.set(str[i], countMap.get(str[i]) + 1);
    }
  }

  for (let [s, count] of countMap) {
    if (count % 2 !== 0) {
      if (middle !== '') return `I'm Sorry Hansoo`;
      middle = s;
    }
    let halfCount = Math.floor(count / 2);

    const chunk = s.repeat(halfCount);
    first.push(chunk);
  }

  return first.join('') + middle + first.reverse().join('');
}

console.log(solution());

/*

  첫번째 시도에서 틀림
  > 문자 개수를 세면서 현재까지의 문자와 다른 게 나오면 여태까지 count한 것을 바탕으로 repeat한 문자열과 middle 문자열을 구하는 식으로 구현해봤는데
    맨 마지막 문자는 새로운 문자열을 만나지 않으므로 똑같은 로직을 한 번 더 작성해줘야 하고 14퍼에서 틀리는 등 문제가 있음
    그래서 개수 세면서 구하지 말고 한번 쫙 개수를 세 놓은 다음, count / 2만큼 repeat해주는 식으로 구현했다.

  팰린드롬이 가능한 경우는
  - 홀수인 문자열이 한개, 나머지는 짝수
  - 모두 짝수
  인 경우이다.
  일단 문자열들을 같은것끼리 모으기 위해 정렬해주자.

  팰린드롬은 앞부분, 중간, 뒷부분으로 나뉜다.
  앞부분은 짝수개로 이루어진 문자여야 하고, 중간은 1개 남은 문자열, 혹은 한 개 남은 문자열이 없다면 그냥 ''가 되어 연결했을 때 문제가 없다.
  뒷부분은 앞부분을 reverse한 문자열이다.

  count로 문자열의 개수를 세준다.
  짝수개라면 나누기 2를 한 만큼의 개수를 repeat해 front에 추가해준다.
  홀수개라면 남은 하나를 middle 용으로 따로 빼준다.
  back은 front를 뒤집은 것이다.
  front + middle + back을 합쳐서 출력한다.

  홀수개 문자열이 여러개 나오는 경우가 생길 수 있으므로,
  middle을 저장할 때 초기값인 ''이 아니라면 이미 저장해놓은 홀수 문자가 있다고 판단해 return하는 것으로 대비한다.
*/

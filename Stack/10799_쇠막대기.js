const fs = require('fs');
const str = fs.readFileSync('input.txt').toString().trim();

function solution() {
  const stack = [];
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(' && str[i + 1] === ')') {
      count += stack.length;
      i++;
    } else if (str[i] === '(') {
      stack.push('(');
      count++;
    } else {
      stack.pop();
    }
  }
  return count;
}

console.log(solution());
// 레이저 ()를 하나로 인식시키기 위해 i 증가해 건너뛰기
/*
  잘려진 막대의 각 조각의 길이르 구하는게 아니라 조각의 개수를 구하면 된다.

  ( 다음에 )가 오는 경우는 레이저
  ( 다음에 )가 오지 않는 평범한 괄호는 막대의 존재를 의미한다.
  )는 막대 하나의 끝을 의미한다.
  
  예를 들어 ()(((()())(())()))(()) 과 같은 막대에서
  (((()()) 이 구간만을 살펴보면
  (((로 인해 막대가 세 개 존재한 다는 것을 알 수 있고,
  원래 막대 조각이 세 개 있다고 할 수 있는 상태에서 병렬로 한 번 잘려
  총 +3이 되어 6개가 되었다.
  그 다음 레이저로 인해 한 번 더 잘려서 +3이 되어 총 9개가 되고,
  )로 인해 막대 하나가 끝났다.

  따라서 stack에 (를 만날 때마다 push를 해주고, 레이저로 잘릴 때마다 stack.length만큼 더해주면 된다.
  )를 만나면 막대 하나를 빼준다.
*/

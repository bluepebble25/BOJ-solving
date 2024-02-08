const fs = require('fs');
const str = fs.readFileSync('input.txt').toString().trim();

function solution() {
  const zero = str.split('1').filter((s) => s !== '').length;
  const one = str.split('0').filter((s) => s !== '').length;

  return Math.min(one, zero);
}
console.log(solution());

/*
  문자열 S 안에 있는 숫자를 전부 같게 만드는 문제이다.
  예를 들어 0001100을 모두 0이 되게 뒤집거나 모두 1이 되게 뒤집을 수 있다.
  무엇을 뒤집으면 이득일지는 0과 1의 묶음을 세서 둘 중에 더 적은 개수를 뒤집으면 된다.
  0만 골라내는 방법은 split('1')을 하고 ''이 아닌 것을 filter로 골라내면 된다. 1 골라낼때도 마찬가지.
  두 배열의 길이 중 더 작은 것을 return한다.
*/

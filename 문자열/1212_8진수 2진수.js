const fs = require('fs');
const num = fs.readFileSync('input.txt').toString().split('');

function solution() {
  if (num[0] === '0') return 0;

  const binary = num.reduce((acc, str, i) => {
    const temp = Number(str).toString(2);
    return i === 0 ? acc + temp : acc + temp.padStart(3, '0');
  }, '');

  return binary;
}

console.log(solution());

/*

  풀이1) 틀림(X)
  8진수 -> 10진수 -> 2진수
  const dec = parseInt(oct, 8), const binary = dec.toString(2)
  과정으로 변환하려고 했는데 수가 클 때는 오차가 생기나 보다.
  예제의 숫자를 넣으면 맞는데 결과는 틀렸다고 나왔다.
  
  풀이2)
  8진수 -> 2진수 변환의 정의를 이용하기로 했다.
  8진수의 한 자리는 이진수 세 자리를 묶어서 계산한 결과이다.
  예를 들어 325는 '011' + '010' + '101' = 011010101 로 바꿀 수 있다.

  각 자릿수를 2진수로 변화시킬 때 세자리수가 되지 않는다면 padStart()로 앞의 빈자리를 0으로 채워주자.
  그리고 맨 앞자리가 0 혹은 00으로 시작하는 경우를 대비해 i==0인 경우에는 padStart를 하지 않고 문자열을 더하자
*/

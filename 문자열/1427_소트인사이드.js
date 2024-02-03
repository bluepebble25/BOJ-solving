const fs = require('fs');
const str = fs.readFileSync('input.txt').toString().trim().split('');
console.log(str.sort((a, b) => b - a).join(''));

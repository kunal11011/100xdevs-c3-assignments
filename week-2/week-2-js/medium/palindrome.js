/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const strArr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase().split("");
  const loopLength = Math.floor(strArr.length / 2);
  let isPalindrome = true;
  for (let index = 0; index < loopLength; index++) {
    if(strArr[index] !== strArr[strArr.length - 1 - index]) {
      isPalindrome = false;
    }
  }
  return isPalindrome;
}

module.exports = isPalindrome;

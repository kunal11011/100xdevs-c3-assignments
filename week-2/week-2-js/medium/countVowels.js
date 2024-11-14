/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    // Your code here
    let totalVowels = 0;

    str.toLowerCase().split("").forEach(alphabet => {
      if (['a', 'e', 'i', 'o', 'u'].includes(alphabet)) {
        totalVowels++;
      }
    });
    return totalVowels;
}

module.exports = countVowels;
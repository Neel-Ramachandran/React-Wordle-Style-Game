// Simple test to verify word lists are valid

const WORD_LISTS = {
  food: ['APPLE', 'BREAD', 'PIZZA', 'PASTA', 'SALAD'],
  sports: ['TENNIS', 'RUGBY', 'SOCCER', 'BOXING', 'TRACK'],
  animals: ['TIGER', 'HORSE', 'ZEBRA', 'KOALA', 'PANDA'],
  countries: ['CHINA', 'JAPAN', 'SPAIN', 'ITALY', 'CHILE'],
  family: ['MOTHER', 'FATHER', 'UNCLE', 'AUNTY', 'SISTER']
};

// Test 1: Check all words are 5 letters
function testWordLength() {
  for (let category in WORD_LISTS) {
    for (let word of WORD_LISTS[category]) {
      if (word.length !== 5) {
        console.log(`FAIL: ${word} in ${category} is not 5 letters`);
        return false;
      }
    }
  }
  console.log("PASS: All words are 5 letters");
  return true;
}

// Test 2: Check all words are uppercase
function testUppercase() {
  for (let category in WORD_LISTS) {
    for (let word of WORD_LISTS[category]) {
      if (word !== word.toUpperCase()) {
        console.log(`FAIL: ${word} is not uppercase`);
        return false;
      }
    }
  }
  console.log("PASS: All words are uppercase");
  return true;
}

// Run tests
console.log("Running Word List Tests...");
testWordLength();
testUppercase();
console.log("Tests complete!");

const CORRECT = "correct";
const INCORRECT = "incorrect";
const EMPTY = "";

const resultObject = (char, className) => {
  return {
    ...char,
    character: char.character,
    cClass: className,
  };
};

const setClass = (char, inputChar) => {
  if (inputChar) {
    if (char.character === inputChar) {
      return resultObject(char, CORRECT);
    } else {
      return resultObject(char, INCORRECT);
    }
  } else {
    return resultObject(char, EMPTY);
  }
};

export const quoteModifier = (quote, input) => {
  return quote.map((char, index) => {
    return setClass(char, input[index]);
  });
};

export const everythingIsCorrect = (quote) => {
  return quote.every((char) => char.cClass === CORRECT);
};

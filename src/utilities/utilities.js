export const cammelCase = str => {
  const handleBlock = block => {
    const array2 = block.split('');
    let first = array2.shift();
    if (!Number.isNaN(first)) first = first.toUpperCase();

    const newBlock = array2.reduce((all, current) => {
      return all + current;
    }, first);

    return newBlock;
  };
  let newStr = '';

  if (str.indexOf(' ') > -1) {
    const array = str.split(' ');

    let c = 0;
    for (let block of array) {
      if (c > 0) newStr += ' ';
      newStr += handleBlock(block);
      c++;
    }
  } else {
    newStr = handleBlock(str);
  }
  return newStr;
};

export const orderObjToString = obj => {
  let str = '';

  Object.keys(obj).forEach(key => {
    if (obj[key] > 0) {
      if (str !== '') str += ', ';
      str += `${obj[key]} ${key}`;
    }
  });

  return str;
};

export const orderObjToStringNoSpace = obj => {
  let str = '';

  Object.keys(obj).forEach(key => {
    if (obj[key] > 0) {
      str += `${obj[key]}${key}`;
    }
  });

  return str;
};

export const emailValidator = str => {
  const regEx = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return regEx.test(str);
};

export const zipCodeValidator = str => {
  const regEx = /^[0-9]{5}$/;
  return regEx.test(str);
};

export const checkForInvalidField = obj => {
  const array = Object.keys(obj).map(key => obj[key].isValid);
  for (let item of array) {
    if (!item) {
      return false;
    }
  }
  return true;
};

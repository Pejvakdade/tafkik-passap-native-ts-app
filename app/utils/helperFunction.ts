export const addZero = (number: any) => {
  if (parseInt(number) < 10) {
    return `0${number}`;
  } else {
    return number;
  }
};

export const prettySeconds = (time: any) => {
  const minutes = addZero(Math.floor(time / 60));
  const seconds = addZero(time % 60);
  if (minutes === '00' && seconds === '00') {
    return '0';
  }

  if (minutes === '00') {
    return seconds;
  } else {
    return `${minutes}:${seconds}`;
  }
};

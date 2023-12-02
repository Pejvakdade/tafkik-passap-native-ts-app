import {toJalaali} from 'jalaali-js';

function convertGregorianToJalali(isoDateString: string): string {
  const isoDate = new Date(isoDateString);
  const jalaliDate = toJalaali(
    isoDate.getUTCFullYear(),
    isoDate.getUTCMonth() + 1,
    isoDate.getUTCDate(),
  );
  return `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`;
}

export default convertGregorianToJalali;

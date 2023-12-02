import {keyWords} from '../constants';

export const isValidMobileNumber = (mobileNumber: string, toast: any) => {
  if (mobileNumber.trim() === '') {
    toast.current.show({
      type: 'warning',
      text: keyWords.emptyNumber,
      duration: 3000,
    });
    return false;
  }

  if (!mobileNumber.toString().startsWith('09')) {
    toast.current.show({
      type: 'warning',
      text: keyWords.numberError,
      duration: 3000,
    });
    return false;
  }

  if (mobileNumber.toString().length != 11) {
    toast.current.show({
      type: 'warning',
      text: keyWords.numberCompleate,
      duration: 3000,
    });
    return false;
  }

  return {
    error: false,
  };
};

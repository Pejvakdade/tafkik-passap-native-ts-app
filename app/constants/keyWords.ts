//!======================================
const BASE_URL: string = 'http://passapp.ajansro.com/api/v1/';
//!======================================

const packageJson = require('../../package.json');
const appVersion = packageJson.version;
const applicationSlogan = 'تفکیک , جامع ترین سامانه تفکیک زباله از مبدا';
const moreHeaderText = 'حساب کاربری';
const homeWasteTitle = 'زباله خانگی';
const supportTitle = 'پشتیبانی';
const historyTitle = 'تاریخچه';
const myAddressTitle = 'آدرس‌های من';
const termsTitle = 'قوانین و مقررات';
const emptyNumber = 'لطفاٌ شماره خودتان را وارد کنید';
const numberError = 'لطفاٌ شماره خودتان را با ۰۹ شروع کنید';
const numberCompleate = 'لطفاٌ شماره خودتان را کامل کنید';
const sendSmsError = 'مشکلی پیش آمده است';
const locationError = 'مشکلی پیش آمده است دوباره تلاش کنید';
const expireCode = 'مدت زمان کد تایید شما تمام نشده';
const reSendCode = 'کد تایید برای شما ارسال شد';
const SendCodeExpire = 'کد تایید شما منقضی شده است';
const SendCodeWorng = 'کد تایید شما اشتباه است';
const emptyOtpCode = 'لطفاٌ کد تایید را وارد کنید';
const emptyArray = 'موردی برای نمایش وجود ندارد';
const tokenExpire = 'کلید ورود شما منقضی شده است';
const logOutText = 'از خروج از حساب مطمعن هستید';
const commingSoon = 'به زودی';
const successRequest = 'درخواست شما با موفقیت ثبت شد';
const locationOff = 'لوکیشن شما خاموش است';

export default {
  BASE_URL,
  applicationSlogan,
  appVersion,
  moreHeaderText,
  homeWasteTitle,
  emptyNumber,
  numberError,
  numberCompleate,
  sendSmsError,
  expireCode,
  reSendCode,
  SendCodeExpire,
  SendCodeWorng,
  emptyOtpCode,
  tokenExpire,
  logOutText,
  commingSoon,
  supportTitle,
  termsTitle,
  historyTitle,
  myAddressTitle,
  emptyArray,
  locationError,
  successRequest,
  locationOff,
};

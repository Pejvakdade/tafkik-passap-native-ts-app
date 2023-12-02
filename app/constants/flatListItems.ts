import values from '../values';
import icons from './icons';
import images from './images';
const screensTags = values.ScreensTags;

// home screen slider images
const sliderImages = [
  images.waste1,
  images.waste2,
  images.waste3,
  images.waste4,
];
// home screen items
const homeItemsSchema = [
  {
    _id: 1,
    name: 'تخلیه‌چاه',
    iconName: icons.garbageTruckColor,
    navigation: undefined,
  },
  {
    _id: 2,
    name: 'نخاله‌ساختمانی',
    iconName: icons.roadClosurColor,
    navigation: undefined,
  },
  {
    _id: 3,
    name: 'خانگی',
    iconName: icons.homeColor,
    screen: screensTags.BodyScreen.HOME_WASTE_SCREEN,
  },
  {
    _id: 4,
    name: 'بیمارستانی',
    iconName: icons.hospitalColor,
    navigation: undefined,
  },
  {
    _id: 5,
    name: 'ادارات',
    iconName: icons.officeColor,
    navigation: undefined,
  },
  {
    _id: 6,
    name: 'دست‌دوم',
    iconName: icons.sofaColor,
    navigation: undefined,
  },
  {
    _id: 7,
    name: 'صنعتی',
    iconName: icons.factoryColor,
    navigation: undefined,
  },
];

// more screen items
const moreItemSchema = [
  {
    _id: 1,
    name: 'تاریخچه',
    iconName: icons.history,
    screen: screensTags.BodyScreen.HISTORY_SCREEN,
  },
  {
    _id: 2,
    name: 'آدرس‌های من',
    iconName: icons.map,
    screen: screensTags.BodyScreen.MY_ADDRESS_SCREEN,
  },
  // {
  //   _id: 3,
  //   name: 'سوالات‌‌ متداول',
  //   iconName: icons.faq,
  //   navigation: undefined,
  // },
  // {
  //   _id: 4,
  //   name: 'آموزش‌ها',
  //   iconName: icons.traning,
  //   navigation: undefined,
  // },
  {
    _id: 5,
    name: 'قوانین و مقررات',
    iconName: icons.terms,
    screen: screensTags.BodyScreen.TERMS_SCREEN,
  },
  {
    _id: 6,
    name: 'پیام‌ها',
    iconName: icons.tickets,
    navigation: undefined,
  },
  {
    _id: 7,
    name: 'فروشگاه',
    iconName: icons.basket,
    navigation: undefined,
  },
  {
    _id: 9,
    name: 'پشتیبانی',
    iconName: icons.headset,
    screen: screensTags.BodyScreen.SUPPORT_SCREEN,
  },
  {
    _id: 10,
    name: 'خروج',
    iconName: icons.logOut,
  },
];

const homeWasteItems = [
  {
    _id: 1,
    name: 'آهن',
    icon: images.metal,
    value: '',
  },
  {
    _id: 2,
    name: 'مس',
    icon: images.cooper,
    value: '',
  },
  {
    _id: 3,
    name: 'حلب',
    icon: images.aleppo,
    value: '',
  },
  {
    _id: 4,
    name: 'آلومینیوم',
    icon: images.aluminium,
    value: '',
  },
  {
    _id: 5,
    name: 'پارچه',
    icon: images.cloth,
    value: '',
  },
  {
    _id: 6,
    name: 'چوب',
    icon: images.wood,
    value: '',
  },
  {
    _id: 7,
    name: 'برنجی',
    icon: images.brass,
    value: '',
  },
  {
    _id: 8,
    name: 'ضایعات الگترونیکی',
    icon: images.cpu,
    value: '',
  },
  {
    _id: 9,
    name: 'لاک',
    icon: images.lac,
    value: '',
  },
];

export default {homeItemsSchema, sliderImages, moreItemSchema, homeWasteItems};

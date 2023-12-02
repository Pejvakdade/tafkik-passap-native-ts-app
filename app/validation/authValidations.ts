import * as yup from 'yup';

export const RegisterItems = yup.object().shape({
  firstName: yup
    .string()
    .required('وارد کردن نام اجباری میباشد')
    .min(3, 'نام وارد شده کوتاه میباشد')
    .max(25, 'نام وارد شده طولانی میباشد')
    .matches(
      /^(?!^string)(?=.*[^\s])([آ-ی۰-۹ ]+)$/,
      'نام وارد شده معتبر نمیباشد',
    ),
  lastName: yup
    .string()
    .required('وارد کردن نام خانوادگی اجباری میباشد')
    .min(4, 'نام خانوادکی وارد شده کوتاه میباشد')
    .max(50, 'نام خانوادگی وارد شده طولانی میباشد')
    .matches(
      /^(?!^string)(?=.*[^\s])([آ-ی۰-۹ ]+)$/,
      'نام خانوادگی وارد شده معتبر نمیباشد',
    ),
  selectedOptionCity: yup.string().required('انتخاب شهر اجباری میباشد'),
  selectedOptionProvince: yup.string().required('انتخاب استان اجباری میباشد'),
});

export const CreateAddressItems = yup.object().shape({
  addressName: yup
    .string()
    .required('وارد کردن نام آدرس  اجباری میباشد')
    .min(3, 'نام آدرس وارد شده کوتاه میباشد')
    .max(25, 'نام آدرس وارد شده طولانی میباشد')
    .matches(
      /^(?!^string)(?=.*[^\s])([آ-ی۰-۹ ]+)$/,
      'نام آدرس وارد شده معتبر نمیباشد',
    ),
  completeAddress: yup
    .string()
    .required('وارد کردن آدرس اجباری میباشد')
    .min(10, 'آدرس وارد شده کوتاه میباشد')
    .matches(
      /^(?!^string)(?=.*[^\s])([آ-ی۰-۹.\/ -]+)$/,
      'آدرس وارد شده معتبر نمیباشد',
    ),
  postalCode: yup
    .number()
    .required('وارد کردن کد پستی اجباری میباشد')
    .min(10, 'کد پستی وارد شده کوتاه میباشد'),

  selectedOptionCity: yup.string().required('انتخاب شهر اجباری میباشد'),
  selectedOptionProvince: yup.string().required('انتخاب استان اجباری میباشد'),
});

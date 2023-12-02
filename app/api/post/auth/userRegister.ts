import baseAxios from '../../baseAxios';
import {VERIFY_SMS_OR_SING_UP} from '../../routes';
interface UserRegisterProps {
  mobailNumber: string; // Assuming mobailNumber is a string, adjust the type accordingly
  values: {
    otpNumber: string;
    firstName: string;
    lastName: string;
    selectedOptionCity: string;
  };
}

async function userRegister({
  mobailNumber,
  values,
}: UserRegisterProps): Promise<any> {
  const signUpValues = {
    phoneNumber: mobailNumber,
    verifyCode: values.otpNumber,
    firstName: values.firstName,
    lastName: values.lastName,
    county: values.selectedOptionCity,
  };

  try {
    const axiosInstance = await baseAxios();
    const result = (
      await axiosInstance.post(VERIFY_SMS_OR_SING_UP, signUpValues)
    ).data;
    return result;
  } catch (error: any) {
    console.log({userRegister: error});
    return {success: false, error: error?.response};
  }
}

export default userRegister;

import baseAxios from '../../baseAxios';
import {VERIFY_SMS_OR_SING_UP} from '../../routes';
interface UserSingInProps {
  mobailNumber: string; // Assuming mobailNumber is a string, adjust the type accordingly
  values: {
    otpNumber: string;
  };
}

async function userSingIn({
  mobailNumber,
  values,
}: UserSingInProps): Promise<any> {
  const signInValues = {
    phoneNumber: mobailNumber,
    verifyCode: values.otpNumber,
  };

  try {
    const axiosInstance = await baseAxios();
    const result = (
      await axiosInstance.post(VERIFY_SMS_OR_SING_UP, signInValues)
    ).data;
    return result;
  } catch (error: any) {
    console.log({userSingIn: error});
    return {success: false, error: error?.response};
  }
}

export default userSingIn;

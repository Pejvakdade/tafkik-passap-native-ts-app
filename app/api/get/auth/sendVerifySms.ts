import baseAxios from '../../baseAxios';
import {SEND_VERIFY_SMS} from '../../routes';

type Props = {
  phoneNumber: string;
};

const sendVerifySms = async ({phoneNumber}: Props) => {
  try {
    const axiosInstance = await baseAxios();
    const result = (
      await axiosInstance.get(`${SEND_VERIFY_SMS}?phoneNumber=${phoneNumber}`)
    ).data;
    return result;
  } catch (error) {
    console.log({sendVerifySms: error});
    return false;
  }
};

export default sendVerifySms;

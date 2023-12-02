import baseAxios from '../../baseAxios';
import {GET_USER_INFO} from '../../routes';

const getUserInfo = async () => {
  try {
    const axiosInstance = await baseAxios();
    const result = (await axiosInstance.get(`${GET_USER_INFO}`)).data;
    return result;
  } catch (error: any) {
    console.log({getUserInfo: error});
    return error?.response;
  }
};

export default getUserInfo;

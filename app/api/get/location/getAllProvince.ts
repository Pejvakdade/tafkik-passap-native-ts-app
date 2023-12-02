import baseAxios from '../../baseAxios';
import {GET_PROVINCE_AND_CITY} from '../../routes';

const getAllProvince = async () => {
  try {
    const axiosInstance = await baseAxios();
    const result = (await axiosInstance.get(`${GET_PROVINCE_AND_CITY}`)).data;
    return result;
  } catch (error: any) {
    console.log({getAllProvince: error});
    return error?.response;
  }
};

export default getAllProvince;

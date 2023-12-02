import baseAxios from '../../baseAxios';
import {GET_PROVINCE_AND_CITY} from '../../routes';

type Props = {
  id: string;
};

const getAllCitys = async ({id}: Props) => {
  try {
    const axiosInstance = await baseAxios();
    const result = (
      await axiosInstance.get(`${GET_PROVINCE_AND_CITY}?id=${id}`)
    ).data;
    return result;
  } catch (error) {
    console.log({getAllCitys: error});
    return false;
  }
};

export default getAllCitys;

import baseAxios from '../../baseAxios';
import {GET_NEAR_CLIENT_COMPANYS} from '../../routes';

type Props = {
  id: string | undefined;
};

const getNearCompanys = async ({id}: Props) => {
  if (!id) return false;
  try {
    const axiosInstance = await baseAxios();
    const result = (
      await axiosInstance.get(`${GET_NEAR_CLIENT_COMPANYS}?addressId=${id}`)
    ).data;
    return result;
  } catch (error) {
    console.log({getNearCompanys: error});
    return false;
  }
};

export default getNearCompanys;

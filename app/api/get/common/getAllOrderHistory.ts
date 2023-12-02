import baseAxios from '../../baseAxios';
import {GET_ALL_ORDER_HISTORY} from '../../routes';

const getAllOrderHistory = async () => {
  try {
    const axiosInstance = await baseAxios();
    const result = (await axiosInstance.get(`${GET_ALL_ORDER_HISTORY}`)).data;
    return result;
  } catch (error) {
    console.log({getAllOrderHistory: error});
    return false;
  }
};

export default getAllOrderHistory;

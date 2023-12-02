import baseAxios from '../../baseAxios';
import {GET_ALL_CATEGORIES} from '../../routes';

type Props = {
  type: string;
  page?: number;
  limit?: number;
};

const getAllCategories = async ({type, page = 1, limit = 20}: Props) => {
  try {
    const axiosInstance = await baseAxios();
    const result = (
      await axiosInstance.get(
        `${GET_ALL_CATEGORIES}?page=${page}&limit=${limit}&type=${type}`,
      )
    ).data;
    return result;
  } catch (error) {
    console.log({getAllCategories: error});
    return false;
  }
};

export default getAllCategories;

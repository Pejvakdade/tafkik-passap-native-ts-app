import baseAxios from '../baseAxios';
import {DELETE_ADDRESS} from '../routes';

type Props = {
  id: string | undefined;
};

const deleteAddress = async ({id}: Props) => {
  console.log({id});

  try {
    const axiosInstance = await baseAxios();
    const result = (
      await axiosInstance.delete(`${DELETE_ADDRESS}?addressId=${id}`)
    ).data;
    return result;
  } catch (error) {
    console.log({deleteAddress: error});
    return false;
  }
};

export default deleteAddress;

import baseAxios from '../../baseAxios';
import {CREATE_ORDER} from '../../routes';
interface CreateOrderProps {
  userItems: [
    {
      weight: string;
      price: string;
      category: string;
      pricePerKg: string;
      categoryName: string;
    },
  ];
  addressId: string | undefined;
  totalPrice: string | undefined;
  companyId: string | undefined;
}

async function createOrder({
  userItems,
  addressId,
  totalPrice,
  companyId,
}: CreateOrderProps): Promise<any> {
  const orderValues = {
    orderInformation: userItems,
    address: addressId,
    totalPrice: totalPrice,
    company: companyId,
  };
  console.log({orderValues});

  try {
    const axiosInstance = await baseAxios();
    const result = (await axiosInstance.post(CREATE_ORDER, orderValues)).data;
    return result;
  } catch (error: any) {
    console.log({createOrder: error});
    return false;
  }
}

export default createOrder;

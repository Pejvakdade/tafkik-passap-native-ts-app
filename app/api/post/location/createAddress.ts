import baseAxios from '../../baseAxios';
import {CREATE_ADDRESS} from '../../routes';
interface CreateAddressProps {
  values: {
    addressName: string;
    completeAddress: string;
    postalCode: string;
    selectedOptionCity: string;
    latitude: string;
    longitude: string;
  };
}

async function createAddress({values}: CreateAddressProps): Promise<any> {
  const addressValues = {
    addressName: values?.addressName,
    county: values?.selectedOptionCity,
    postalCode: String(values?.postalCode),
    completeAddress: values?.completeAddress,
    lat: values?.latitude,
    long: values?.longitude,
  };

  try {
    const axiosInstance = await baseAxios();
    const result = (await axiosInstance.post(CREATE_ADDRESS, addressValues))
      .data;
    return result;
  } catch (error: any) {
    console.log({createAddress: error});
    return {success: false, error: error?.response};
  }
}

export default createAddress;

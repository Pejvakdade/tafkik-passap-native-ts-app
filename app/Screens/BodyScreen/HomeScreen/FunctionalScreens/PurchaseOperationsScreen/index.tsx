import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import api from '../../../../../api';
import {
  CustomButton,
  CustomDropDown,
  CustomInput,
  CustomMap,
  CustomModal,
  CustomModalAddAddress,
  CustomToast,
  FlatICompanyItemPrice,
} from '../../../../../components';
import {COLORS, FONTS, SIZES, keyWords} from '../../../../../constants';
import {
  getAllNearCompany,
  splashGetUserInfo,
} from '../../../../../values/querryTags';
import values from '../../../../../values';

type AddressType = {
  addressName: string;
  completeAddress: string;
  lat: string;
  long: string;
  postalCode: string;
  _id: string; // Replace 'string' with the actual type of _id
};

type Props = {
  route: any;
  navigation: any;
};

const PurchaseOperationsScreen = (props: Props) => {
  console.log({props});

  const screensTags = values.ScreensTags;
  const toastRef: React.MutableRefObject<any> = useRef<any>(null);
  const items = props?.route.params.items;
  const [isLoading, setIsLosading] = useState(false);
  const [isAddressModal, setIsAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
    null,
  );
  const [selectedCompany, setSelectedCompany] = useState<{
    company: any;
    totalPrice: string;
    itemPrices: any;
  } | null>(null);

  // call api
  const {data: userData, refetch} = useQuery(
    splashGetUserInfo,
    api.get.auth.getUserInfo,
    {
      enabled: true,
    },
  );

  const {data: nearCompany, refetch: refetchCompany} = useQuery(
    [getAllNearCompany],
    () => api.get.common.getNearCompanys({id: selectedAddress?._id}),
    {
      enabled: !!selectedAddress,
    },
  );

  const handleSubmit = async () => {
    setIsLosading(true);

    const submitOrder = await api.post.common.createOrder({
      addressId: selectedAddress?._id,
      companyId: selectedCompany?.company?._id,
      totalPrice: selectedCompany?.totalPrice,
      userItems: selectedCompany?.itemPrices,
    });
    if (!submitOrder) {
      toastRef.current.show({
        type: 'error',
        text: keyWords.locationError,
        duration: 3000,
      });
    } else if (submitOrder.CODE === 2010 && submitOrder.result) {
      toastRef.current.show({
        type: 'success',
        text: keyWords.successRequest,
        duration: 3000,
      });
      setTimeout(() => props.navigation.replace(screensTags.SCREEN_MAIN), 1700);
    }

    setIsLosading(false);
  };

  useEffect(() => {
    if (!selectedAddress) {
      refetchCompany();
    } else if (selectedAddress) {
      // Call the API and refetch data when selectedAddress changes
      refetchCompany();
    }
  }, [selectedAddress]);

  //todo ==============
  //todo must be better
  //todo ==============

  const data = userData?.result?.user;

  const toggleAddressModal = () => {
    setIsAddressModal(!isAddressModal);
  };

  const handleSuccess = async () => {
    // Call the refetch function to refresh the user data
    await refetch();
    // Close the modal
    setIsAddressModal(false);
  };
  const handleSelect = (selectedItem: any) => {
    // Handle the selection here
    setSelectedAddress(selectedItem);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <CustomToast ref={toastRef} />
      <Text style={styles.headerTitle}>آدرس مورد نظر را انتخاب کنید</Text>
      <View style={styles.addressContainer}>
        <CustomDropDown
          options={data?.address}
          onSelect={handleSelect}
          caption="محل تحویل زباله"
          rowItemName="addressName"
        />
        <CustomButton title="افزودن آدرس" onPress={toggleAddressModal} />
      </View>
      <Text style={styles.headerTitle}>شرکت مورد نظر را انتخاب کنید</Text>
      {nearCompany?.result ? (
        <FlatICompanyItemPrice
          userItems={items}
          onSelectCompany={setSelectedCompany}
          selectedCompany={selectedCompany}
          company={nearCompany?.result}
        />
      ) : (
        <View style={styles.emptyCompanyContainer}>
          <Text style={styles.emptyCompany}>لطفاٌ آدرس خود را انتخاب کنید</Text>
        </View>
      )}
      <CustomButton
        title="ثبت درخواست"
        onPress={handleSubmit}
        isLoading={isLoading}
      />

      {/* modal for add new address */}
      <CustomModal
        height={SIZES.height / 1.5}
        buttonText={'افزودن آدرس جدید'}
        isVisible={isAddressModal}
        position="flex-end"
        onPress={toggleAddressModal}>
        <CustomInput
          lableText="نام آدرس"
          placeholder="نام آدرس را وارد کنید"
          textAlign="right"
        />
        <CustomInput
          lableText="آدرس کامل را وارد کنید"
          placeholder="نام آدرس را وارد کنید"
          textAlign="right"
        />
        <CustomMap lableText="آدرس روی نقشه" />
        <CustomButton title="افزودن آدرس" onPress={toggleAddressModal} />
      </CustomModal>

      {/* modal for add select company */}
      <CustomModalAddAddress
        isVisible={isAddressModal}
        position="flex-end"
        onPress={toggleAddressModal}
        isVisibleFunc={setIsAddressModal}
        onSuccess={handleSuccess}
      />
    </SafeAreaView>
  );
};

export default PurchaseOperationsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.light.backgroudnColor,
    flex: 1,
  },
  headerTitle: {
    fontFamily: FONTS.h2.fontFamily,
    fontSize: FONTS.h2.fontSize,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    color: COLORS.light.greenText,
    borderColor: COLORS.light.greenText,
    marginVertical: 10,
  },
  addressContainer: {
    paddingVertical: 10,
  },
  acceptButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  acceptModalText: {
    fontFamily: FONTS.body3.fontFamily,
    fontSize: FONTS.body3.fontSize,
    marginHorizontal: 10,
    paddingTop: 20,
  },
  emptyCompany: {
    marginHorizontal: 10,
    fontFamily: FONTS.body3.fontFamily,
    fontSize: FONTS.body3.fontSize,
    textAlign: 'center',
  },
  emptyCompanyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

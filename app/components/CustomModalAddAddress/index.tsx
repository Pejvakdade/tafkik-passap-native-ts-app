import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {useMutation} from 'react-query';
import api from '../../api';
import {FONTS, SIZES, icons} from '../../constants';
import {CreateAddressItems} from '../../validation/authValidations';
import CustomButton from '../CustomButton';
import CustomDropDownCity from '../CustomDropDownCity';
import CustomDropDownProvince from '../CustomDropDownProvince';
import CustomInput from '../CustomInput';
import CustomMap from '../CustomMap';
import CustomToast from '../CustomToast';

interface FormValues {
  selectedOptionCity: string;
  selectedOptionProvince: string;
  addressName: string;
  postalCode: string;
  completeAddress: string;
  latitude: string;
  longitude: string;
}

type Props = {
  isVisible?: boolean;
  onPress?: () => void;
  position?: 'center' | 'flex-start' | 'flex-end';
  toast?: any;
  isVisibleFunc: any;
  onSuccess?: () => void;
};

const CustomModalAddAddress = (props: Props) => {
  const toastRef: React.MutableRefObject<any> = useRef<any>(null);
  const [selectedOptionProvince, setSelectedOptionProvince] = useState<
    any | null
  >(null);
  const [selectedOptionCity, setSelectedOptionCity] = useState<any | null>(
    null,
  );

  const handleSelectCity = (selectedItem: any) => {
    setSelectedOptionCity(selectedItem);
  };
  const handleSelectProvince = (selectedItem: any) => {
    setSelectedOptionProvince(selectedItem);
  };

  const mutation = useMutation(async (formData: FormValues) => {
    const response = await api.post.location.createAddress({
      values: formData,
    });
    props.onSuccess && props.onSuccess();
    props.isVisibleFunc(false);
  });

  return (
    <>
      <Modal
        deviceHeight={SIZES.height / 1.2}
        animationIn="fadeInUpBig"
        onBackButtonPress={props.onPress}
        isVisible={props.isVisible}
        testID={'modal'}
        style={[
          styles.modalContainer,
          {
            justifyContent: props.position,
            margin: props.position === 'center' ? 10 : 0,
          },
        ]}>
        <View style={[styles.modalBodyContainer]}>
          <CustomToast ref={toastRef} />

          <TouchableOpacity
            onPress={props.onPress}
            style={styles.closeContainer}>
            <Text style={styles.closeButton}>افزودن آدرس جدید</Text>
            <Image source={icons.x} />
          </TouchableOpacity>

          <Formik
            validationSchema={CreateAddressItems}
            initialValues={{
              selectedOptionCity: '',
              selectedOptionProvince: '',
              addressName: '',
              postalCode: '',
              completeAddress: '',
              latitude: '',
              longitude: '',
            }}
            onSubmit={values => mutation.mutate(values)}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View style={styles.formikContainer}>
                <CustomInput
                  lableText="عنوان آدرس"
                  placeholder="نام آدرس را وارد کنید"
                  textAlign="right"
                  onChangeText={handleChange('addressName')}
                  value={values.addressName}
                  error={errors.addressName}
                  touch={touched.addressName}
                />
                <CustomInput
                  lableText="آدرس"
                  placeholder="آدرس را وارد کنید"
                  textAlign="right"
                  onChangeText={handleChange('completeAddress')}
                  value={values.completeAddress}
                  error={errors.completeAddress}
                  touch={touched.completeAddress}
                />
                <CustomInput
                  lableText="کدپستی"
                  placeholder="کدپستی را وارد کنید"
                  textAlign="right"
                  keyboardType="number-pad"
                  onChangeText={handleChange('postalCode')}
                  value={values.postalCode}
                  error={errors.postalCode}
                  touch={touched.postalCode}
                  maxLength={10}
                />
                <CustomDropDownProvince
                  onSelect={handleSelectProvince}
                  error={errors.selectedOptionProvince}
                  touch={touched.selectedOptionProvince}
                  formikValue={setFieldValue}
                />
                <CustomDropDownCity
                  onSelect={handleSelectCity}
                  province={selectedOptionProvince}
                  formikValue={setFieldValue}
                  error={errors.selectedOptionCity}
                  touch={touched.selectedOptionCity}
                />

                <CustomMap
                  lableText="آدرس روی نقشه"
                  toastAlert={toastRef}
                  parentLatitude={selectedOptionCity?.latitude}
                  parentLongitude={selectedOptionCity?.longitude}
                  onRegionChangeComplete={(latitude, longitude) => {
                    // Update the form values when the region changes
                    setFieldValue('latitude', latitude);
                    setFieldValue('longitude', longitude);
                  }}
                />
                <CustomButton title="افزودن آدرس" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </>
  );
};

export default CustomModalAddAddress;

const styles = StyleSheet.create({
  modalContainer: {},
  formikContainer: {
    flex: 1,
  },
  closeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  closeButton: {
    paddingHorizontal: 5,
    fontFamily: FONTS.h1.fontFamily,
  },
  modalBodyContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: SIZES.modal.horizontalPadding,
    height: '100%',
  },
});

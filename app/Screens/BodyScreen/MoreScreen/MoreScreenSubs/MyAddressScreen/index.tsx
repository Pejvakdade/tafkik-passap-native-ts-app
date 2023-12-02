import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import api from '../../../../../api';
import {
  CustomButton,
  CustomModalAddAddress,
  FlatClientAddress,
} from '../../../../../components';
import {COLORS, FONTS, icons, keyWords} from '../../../../../constants';
import {splashGetUserInfo} from '../../../../../values/querryTags';

type Props = {};

const MyAddressScreen = (props: Props) => {
  const [isAddressModal, setIsAddressModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery(splashGetUserInfo, api.get.auth.getUserInfo, {
    enabled: true,
  });

  const data = userData?.result?.user;

  const handleSuccess = async () => {
    // Call the refetch function to refresh the user data
    await refetch();
    // Close the modal
    setIsAddressModal(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const toggleAddressModal = () => {
    setIsAddressModal(!isAddressModal);
  };
  return (
    <View style={styles.screenStyle}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.light.primaryColor} />
        </View>
      ) : data?.address.length <= 0 ? (
        <View style={styles.emptyTextView}>
          <Image source={icons.empty} />
          <Text style={styles.emptyText}>{keyWords.emptyArray}</Text>
        </View>
      ) : (
        <FlatClientAddress
          address={data?.address}
          onRefresh={onRefresh}
          refreshing={refreshing}
          fetch={refetch}
        />
      )}

      <CustomButton
        title="اضافه کردن آدرس    &#10010;"
        onPress={toggleAddressModal}
      />

      {/* modal for add new address */}
      <CustomModalAddAddress
        isVisible={isAddressModal}
        position="flex-end"
        onPress={toggleAddressModal}
        isVisibleFunc={setIsAddressModal}
        onSuccess={handleSuccess}
      />
    </View>
  );
};

export default MyAddressScreen;

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    backgroundColor: COLORS.light.backgroudnColor,
  },
  emptyTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
  },
  emptyText: {
    fontFamily: FONTS.body3.fontFamily,
    fontSize: FONTS.body3.fontSize,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

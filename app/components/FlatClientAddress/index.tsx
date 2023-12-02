import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomMiniMap from '../CustomMiniMap';
import {COLORS, FONTS} from '../../constants';
import CustomButton from '../CustomButton';
import CustomModal from '../CustomModal';
import api from '../../api';

type AddressType = {
  addressName: string;
  completeAddress: string;
  lat: string;
  long: string;
  postalCode: string;
  _id: string; // Replace 'string' with the actual type of _id
};

type Props = {
  address: any;
  onRefresh?: () => void;
  refreshing?: any;
  fetch: any;
};

const FlatClientAddress = ({address, onRefresh, refreshing, fetch}: Props) => {
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
    null,
  );
  const [acceptDeleteModal, setAcceptDeleteModal] = useState(false);

  const handleDeleteAddress = async () => {
    const deleteAddress = await api.del.deleteAddress({
      id: selectedAddress?._id,
    });

    if (deleteAddress.CODE === 2010) {
      // If the delete operation is successful, trigger the callback
      fetch();
    }

    setAcceptDeleteModal(false);
  };

  const toggleDeleteModal = (selected: any) => {
    setAcceptDeleteModal(!acceptDeleteModal);
    setSelectedAddress(selected);
  };
  //
  //
  function renderItem({item}: {item: any}) {
    return (
      <View key={item._id} style={styles.addressItemContainer}>
        <Text style={styles.fullAddress}>{item.completeAddress}</Text>
        <View style={styles.itemWrapper}>
          <CustomMiniMap latitude={item.lat} longitude={item.long} />
          <View style={styles.textItemsWrapper}>
            <Text style={styles.lightText}>
              نام آدرس : <Text style={styles.boldText}>{item.addressName}</Text>
            </Text>
            <Text style={styles.lightText}>
              کد پستی : <Text style={styles.boldText}>{item.postalCode}</Text>
            </Text>
            <CustomButton
              title="حذف آدرس"
              outline
              onPress={() => {
                toggleDeleteModal(item);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
  //
  //
  return (
    <View style={styles.addressContainer}>
      <FlatList
        data={address}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <CustomModal
        buttonText={'بستن'}
        isVisible={acceptDeleteModal}
        position="flex-end"
        onPress={() => setAcceptDeleteModal(false)}>
        <Text style={styles.acceptModalText}>آیا شرکت را تایید میکنید؟</Text>

        <View style={styles.acceptButtonWrapper}>
          <CustomButton
            title="تایید میکنم"
            onPress={() => handleDeleteAddress()}
            isFlex
          />
          <CustomButton
            title="خیر"
            onPress={() => setAcceptDeleteModal(false)}
            outline
            isFlex
          />
        </View>
      </CustomModal>
    </View>
  );
};

export default FlatClientAddress;

const styles = StyleSheet.create({
  addressContainer: {
    flex: 1,
  },
  addressItemContainer: {
    flex: 1,
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.light.primarylightColor,
    marginBottom: 8,
  },
  itemWrapper: {
    flexDirection: 'row',
  },
  textItemsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  fullAddress: {
    fontFamily: FONTS.body4.fontFamily,
    fontSize: FONTS.body4.fontSize,
    borderColor: COLORS.light.primarylightColor,
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingBottom: 4,
  },
  boldText: {
    fontFamily: FONTS.h3.fontFamily,
    fontSize: FONTS.h4.fontSize,
  },
  lightText: {
    fontFamily: FONTS.body4.fontFamily,
    fontSize: FONTS.body4.fontSize,
    marginBottom: 5,
  },
  acceptModalText: {
    fontFamily: FONTS.body3.fontFamily,
    fontSize: FONTS.body3.fontSize,
    marginHorizontal: 10,
    paddingTop: 20,
  },
  acceptButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

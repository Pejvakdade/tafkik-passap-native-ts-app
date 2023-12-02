import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constants';
import convertGregorianToJalali from '../../utils/convertGregorianToJalali';

type Props = {
  history: any;
  onRefresh?: () => void;
  refreshing?: any;
};

const FlatOrderHistory = ({history, onRefresh, refreshing}: Props) => {
  console.log({history});

  //
  //
  function renderItem({item}: {item: any}) {
    return (
      <View key={item._id} style={styles.addressItemContainer}>
        <Text style={styles.boldText}>
          تاریخ ثبت سفارش : {convertGregorianToJalali(item?.createdAt)}
        </Text>
        <Text style={styles.boldText}>
          قیمت کل سفارش : {item?.totalPrice.toLocaleString()}{' '}
        </Text>
        {item?.orderInformation.map((orderItem: any) => {
          return (
            <Text key={orderItem?._id} style={styles.regularText}>
              -{' '}
              {`${orderItem?.categoryName} / ${
                orderItem?.weight
              } کیلوگرم / قیمت واحد ${orderItem?.pricePerKg?.toLocaleString()} تومان / مبلغ ${orderItem?.price?.toLocaleString()} تومان `}
            </Text>
          );
        })}
      </View>
    );
  }
  //
  //
  return (
    <View style={styles.historyContainer}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default FlatOrderHistory;

const styles = StyleSheet.create({
  historyContainer: {flex: 1},
  addressItemContainer: {
    flex: 1,
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.light.primarylightColor,
    marginBottom: 8,
    rowGap: 6,
  },
  boldText: {
    fontFamily: FONTS.h1.fontFamily,
  },
  regularText: {
    fontFamily: FONTS.body3.fontFamily,
    fontSize: 12,
  },
});

import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import api from '../../../../../api';
import {COLORS, FONTS, icons, keyWords} from '../../../../../constants';
import {getAllOrders} from '../../../../../values/querryTags';
import {FlatOrderHistory} from '../../../../../components';

type Props = {};

const HistoryScreen = (props: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const {data, isLoading, refetch} = useQuery(
    getAllOrders,
    () => api.get.common.getAllOrderHistory(),
    {
      enabled: true,
    },
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <View style={styles.screenStyle}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.light.primaryColor} />
        </View>
      ) : data?.result?.docs?.length <= 0 ? (
        <View style={styles.emptyTextView}>
          <Image source={icons.empty} />
          <Text style={styles.emptyText}>{keyWords.emptyArray}</Text>
        </View>
      ) : (
        <FlatOrderHistory
          history={data?.result?.docs}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}
    </View>
  );
};

export default HistoryScreen;

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

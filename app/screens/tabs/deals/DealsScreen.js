import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import i18n from "i18n-js";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { useDispatch, useSelector } from "react-redux";
import { userUpdatePushToken } from "../../../store/actions/user";
import { getDeals, getRefreshedDeals } from "../../../store/actions/deals";

import Deal from "./UI/Deal";

const DealsScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const dealsLoader = useSelector((state) => state.dealsLoader.dealsLoader);
  const dealsRefreshLoader = useSelector(
    (state) => state.dealsLoader.dealsRefreshLoader
  );
  const deals = useSelector((state) => state.deals);

  useEffect(() => {
    const askForNotificationsPermission = async () => {
      try {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        if (status !== "granted")
          return Alert.alert(
            i18n.t("notificationsAlertTitle"),
            i18n.t("notificationsAlertMessage"),
            [{ text: "OK" }]
          );

        let token = await Notifications.getExpoPushTokenAsync();

        if (!user.pushToken || user.pushToken !== token.data) {
          dispatch(userUpdatePushToken(token.data));
        }
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(() => {
      askForNotificationsPermission();
    }, 1000);

    dispatch(getDeals());
  }, [dispatch]);

  if (dealsLoader) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size={24} color="#F2811D" />
      </View>
    );
  }

  const deal = ({ item }) => <Deal deal={item} />;

  const onDealsRefresh = () => {
    dispatch(getRefreshedDeals());
  };

  return (
    <SafeAreaView style={styles.dealsSafeArea}>
      <View style={styles.screen}>
        <FlatList
          style={styles.dealsFlatList}
          contentContainerStyle={styles.dealsFlatListContainer}
          data={deals}
          renderItem={deal}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={dealsRefreshLoader}
              onRefresh={onDealsRefresh}
              tintColor="#F2811D"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default DealsScreen;

const styles = StyleSheet.create({
  dealsSafeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  dealsFlatList: {
    width: "100%",
  },
  dealsFlatListContainer: {
    paddingBottom: 20,
    flexGrow: 1,
    alignItems: "center",
  },
});

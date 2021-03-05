import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocations,
  getRefreshedLocations,
} from "../../../store/actions/locations";

import Location from "./UI/Location";

const LocationsScreen = () => {
  const dispatch = useDispatch();

  const locationsLoader = useSelector(
    (state) => state.locationsLoader.locationsLoader
  );
  const locationsRefreshLoader = useSelector(
    (state) => state.locationsLoader.locationsRefreshLoader
  );
  const locations = useSelector((state) => state.locations);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  if (locationsLoader) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size={24} color="#F2811D" />
      </View>
    );
  }

  const location = ({ item }) => <Location location={item} />;

  const onLocationsRefresh = () => {
    dispatch(getRefreshedLocations());
  };

  return (
    <SafeAreaView style={styles.locationsSafeArea}>
      <View style={styles.screen}>
        <FlatList
          style={styles.locationsFlatList}
          contentContainerStyle={styles.locationsFlatListContainer}
          data={locations}
          renderItem={location}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={locationsRefreshLoader}
              onRefresh={onLocationsRefresh}
              tintColor="#F2811D"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationsScreen;

const styles = StyleSheet.create({
  locationsSafeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  locationsFlatList: {
    width: "100%",
  },
  locationsFlatListContainer: {
    paddingBottom: 20,
    flexGrow: 1,
    alignItems: "center",
  },
});

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import moment from "moment";
import "moment/locale/es";
import "moment/locale/es-us";
import Swiper from "react-native-swiper";
import * as Localization from "expo-localization";
import i18n from "i18n-js";

const Deal = ({ deal }) => {
  moment.locale(Localization.locale);
  const startDate = moment(deal.startDate).format("MMMM D, YYYY");
  const endDate = moment(deal.endDate).format("MMMM DD, YYYY");

  const renderPhotos = () => {
    return deal.photos.map((photo) => (
      <Image
        key={photo._id}
        source={{ uri: photo.url }}
        style={styles.dealPhoto}
      />
    ));
  };

  const onLocationPress = (location) => {
    const address = `${location.addressLineOne} ${location.city} ${location.state} ${location.zipcode} ${location.country}`;
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${address}`
    );
  };

  const renderLocations = () => {
    return deal.locations.map((location, index) => (
      <Text
        key={location._id}
        style={styles.locationText}
        onPress={() => onLocationPress(location)}
      >
        {location.addressLineOne}
        {index + 1 === deal.locations.length ? "" : ","}
      </Text>
    ));
  };

  return (
    <View style={styles.dealContainer}>
      <Text style={styles.dealTitle}>{deal.title}</Text>
      <Text style={styles.validThruText}>
        {i18n.t("dealValidThru")} {startDate} - {endDate}
      </Text>
      <Text style={styles.dealDescription}>{deal.description}</Text>
      {deal.photos.length > 0 ? (
        <Swiper
          style={styles.photoSwiper}
          dot={
            <View
              style={{
                backgroundColor: "rgba(255,255,255,.3)",
                width: 8,
                height: 8,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "#fff",
                width: 8,
                height: 8,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7,
              }}
            />
          }
        >
          {renderPhotos()}
        </Swiper>
      ) : null}
      {deal.locations.length > 0 ? (
        <View style={styles.locationsInfoContainer}>
          <Text style={styles.locationHeaderText}>
            {i18n.t("dealLocation")}:
          </Text>
          <View style={styles.locationsListContainer}>{renderLocations()}</View>
        </View>
      ) : null}
    </View>
  );
};

export default Deal;

const styles = StyleSheet.create({
  dealContainer: {
    width: Dimensions.get("screen").width - 40,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  dealTitle: {
    width: "100%",
    textAlign: "left",
    fontFamily: "poppins-semibold",
    fontSize: 18,
  },
  dealDescription: {
    width: "100%",
    marginTop: 15,
    textAlign: "left",
    fontFamily: "poppins-regular",
    fontSize: 14.5,
  },
  validThruText: {
    width: "100%",
    marginTop: 5,
    textAlign: "left",
    fontFamily: "poppins-regular",
    fontSize: 12,
    color: "gray",
  },
  photoSwiper: {
    height: 180,
    marginTop: 15,
  },
  dealPhoto: {
    width: "100%",
    height: 180,
    borderRadius: 5,
    borderBottomLeftRadius: 5,
  },
  locationsInfoContainer: {
    width: "100%",
    marginTop: 15,
  },
  locationHeaderText: {
    fontFamily: "poppins-semibold",
    fontSize: 15,
  },
  locationsListContainer: {
    width: "100%",
    marginTop: 5,
  },
  locationText: {
    fontFamily: "poppins-regular",
    fontSize: 14.5,
  },
});

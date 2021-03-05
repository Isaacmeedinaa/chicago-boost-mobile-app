import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { Ionicons } from "@expo/vector-icons";

const Location = ({ location }) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    Geocoder.init("AIzaSyAOfnIudHL4iZSom0ewFzKEAVrDa8hqhzM");

    Geocoder.from(location.addressLineOne)
      .then((json) => {
        let location = json.results[0].geometry.location;
        if (location.lat && location.lng) {
          setLat(location.lat);
          setLng(location.lng);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onLocationPress = () => {
    const address = `${location.addressLineOne} ${location.city} ${location.state} ${location.zipcode} ${location.country}`;
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${address}`
    );
  };

  const onCallPress = () => {
    Linking.openURL(`tel:+${location.phoneNumber}`);
  };

  const onFacebookIconPress = () => {
    Linking.openURL(location.facebookLink);
  };

  return (
    <View style={styles.locationContainer}>
      <MapView
        style={styles.map}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        <Marker coordinate={{ latitude: lat, longitude: lng }} />
      </MapView>
      <Text style={styles.address} onPress={onLocationPress}>
        {location.addressLineOne}{" "}
        {location.addressLineTwo === "" ? null : `${location.addressLineTwo} `}
        {location.city}, {location.state} {location.zipcode} {location.country}
      </Text>
      <Text style={styles.phoneNumber} onPress={onCallPress}>
        +{location.phoneNumber}
      </Text>
      {!location.facebookLink || location.facebookLink === "" ? null : (
        <Ionicons
          style={styles.facebookIcon}
          onPress={onFacebookIconPress}
          name="logo-facebook"
          size={24}
          color="#F2811D"
        />
      )}
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  locationContainer: {
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
  map: {
    width: "100%",
    height: 180,
    borderRadius: 5,
  },
  address: {
    marginTop: 10,
    width: "100%",
    textAlign: "left",
    fontFamily: "poppins-semibold",
    fontSize: 15,
  },
  phoneNumber: {
    marginTop: 10,
    fontFamily: "poppins-regular",
    fontSize: 14,
  },
  facebookIcon: {
    marginTop: 15,
  },
});

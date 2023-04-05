import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Item = ({ hotel, flight }) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Hotel</Text>
        <Image style={styles.image} source={{ uri: hotel.image }} />
        <Text style={styles.text}>{hotel.name}</Text>
        <Text style={styles.text}>Price: {hotel.price}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Flight</Text>
        <Text style={styles.text}>{flight.airline}</Text>

        <Text style={styles.text}>Price: {flight.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default Item;

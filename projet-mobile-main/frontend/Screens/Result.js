import axios from "axios";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Item from "../components/Item";

const Result = (props) => {
  const [hotels, setHotels] = useState(null);
  const [flights, setFlights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);

  const getflights = async ({ dpr, arv, datedpr, datearv }) => {
    const response = await axios.post(
      "http://localhost:5000/flights",
      {
        dpr: dpr,
        arv: arv,
        datedpr: datedpr,
        datearv: datearv,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setFlights(response.data);
  };

  const getHotels = async ({ city }) => {
    const response = await axios.post(
      "http://localhost:5000/hotels",
      {
        city: city,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setHotels(response.data);
  };

  function getBestTripsForMaximumBudget(budget, hotels, flights) {
    hotels.sort((a, b) => a.price - b.price);
    flights.sort((a, b) => a.price - b.price);
    const results = [];
    for (let i = 0; i < hotels.length; i++) {
      for (let j = 0; j < flights.length; j++) {
        const total = hotels[i].price + flights[j].price;

        if (total <= budget) {
          results.push({
            hotel: hotels[i],
            flight: flights[j],
            total: total,
          });
        }
      }
    }

    results.sort((a, b) => b.total - a.total);

    return results.slice(0, 5);
  }

  useEffect(async () => {
    const hotels = await getHotels({ city: props.route.params.city });
    const flights = await getflights({
      dpr: props.route.params.location,
      arv: props.route.params.Destination,
      datedpr: props.route.params.startDate,
      datearv: props.route.params.endDate,
    });
    setResults(
      getBestTripsForMaximumBudget(props.route.params.budget, hotels, flights)
    );
    setLoading(false);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {!loading ? (
        <>
          {results?.map((ele, idex) => (
            <Item key={idex} hotel={ele.hotel} flight={ele.flight} />
          ))}
        </>
      ) : (
        <ActivityIndicator
          style={{
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 350,
            alignContent: "center",
            alignItems: "center",
          }}
          size="large"
          color="#0000ff"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Result;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black",
    height: "100%",
  },
  selectedDates: {
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
    color: "white",
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "orange",
    borderRadius: 15,
    padding: 5,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonn: {
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "white",
    padding: 5,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  input: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "white",
    marginBottom: 20,
    padding: 10,
    color: "white",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

const Home = ({ navigation }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendar1, setShowCalendar1] = useState(false);
  const [Destination, setDestination] = useState("");
  const [Budget, setBudget] = useState("");
  const [location, setLocation] = useState(null);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Image
        style={{
          height: 100,
          width: 100,
          marginBottom: 30,
          alignContent: "center",
          alignSelf: "center",
        }}
        source={require("../assets/adaptive-icon.png")}
      />
      <Text style={{ color: "white", marginLeft: 10, marginBottom: 5 }}>
        Distination:
      </Text>
      <TextInput
        style={styles.input}
        value={Destination}
        onChangeText={(text) => setDestination(text)}
        autoCapitalize="none"
      />
      <Text style={{ color: "white", marginLeft: 10, marginBottom: 5 }}>
        Budget:
      </Text>
      <TextInput
        style={styles.input}
        value={Budget}
        onChangeText={(text) => setBudget(text)}
        secureTextEntry={false}
      />
      <Text style={{ color: "white", marginLeft: 10, marginBottom: 5 }}>
        Date From:
      </Text>
      <TouchableOpacity
        style={styles.buttonn}
        onPress={() => setShowCalendar(!showCalendar)}
      >
        <Text style={{ color: "white", marginBottom: 20 }}>
          {startDate?.toString()}
        </Text>
      </TouchableOpacity>
      {showCalendar ? (
        <CalendarPicker
          customDatesStyles={[
            {
              date: new Date(),
              textStyle: {
                color: "white",
              },
            },
          ]}
          startFromMonday={true}
          allowRangeSelection={true}
          weekdays={["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]}
          months={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor="orange"
          selectedDayColor="orange"
          selectedDayTextColor="#FFFFFF"
          scaleFactor={375}
          textStyle={{
            color: "white",
          }}
          todayTextStyle={{
            color: "white",
          }}
          selectedRangeStartStyle={{
            backgroundColor: "orange",
            borderRadius: 15,
          }}
          selectedRangeEndStyle={{
            backgroundColor: "orange",
            borderRadius: 15,
          }}
          selectedRangeStyle={{
            backgroundColor: "orange",
          }}
          selectedDayStyle={{
            backgroundColor: "orange",
            borderRadius: 15,
          }}
          minDate={new Date()}
          onDateChange={(date) => {
            setStartDate(date);

            setShowCalendar(!showCalendar);
          }}
        />
      ) : null}
      <Text style={{ color: "white", marginLeft: 10, marginBottom: 5 }}>
        Date To:
      </Text>
      <TouchableOpacity
        style={styles.buttonn}
        onPress={() => setShowCalendar1(!showCalendar1)}
      >
        <Text style={{ color: "white", marginBottom: 20 }}>
          {endDate?.toString()}
        </Text>
      </TouchableOpacity>
      {showCalendar1 ? (
        <CalendarPicker
          customDatesStyles={[
            {
              date: new Date(),
              textStyle: {
                color: "white",
              },
            },
          ]}
          startFromMonday={true}
          allowRangeSelection={true}
          weekdays={["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]}
          months={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor="orange"
          selectedDayColor="orange"
          selectedDayTextColor="#FFFFFF"
          scaleFactor={375}
          textStyle={{
            color: "white",
          }}
          todayTextStyle={{
            color: "white",
          }}
          selectedRangeStartStyle={{
            backgroundColor: "orange",
            borderRadius: 15,
          }}
          selectedRangeEndStyle={{
            backgroundColor: "orange",
            borderRadius: 15,
          }}
          selectedRangeStyle={{
            backgroundColor: "orange",
          }}
          selectedDayStyle={{
            backgroundColor: "orange",
            borderRadius: 15,
          }}
          minDate={new Date()}
          onDateChange={(date) => {
            setEndDate(date);
            setShowCalendar1(!showCalendar);
          }}
        />
      ) : null}
      <Text style={{ color: "white", marginLeft: 10, marginBottom: 5 }}>
        Location:
      </Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={(text) => setLocation(text)}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("ResultScreen", {
            Destination,
            Budget,
            startDate,
            endDate,
            location,
          })
        }
      >
        <Text style={{ color: "white", marginBottom: 20 }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

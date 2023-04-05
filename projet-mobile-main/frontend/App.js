import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Home from "./Screens/Home";
import Result from "./Screens/Result";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator
            initialRouteName="MainScreen"
            screenOptions={{
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen
              name="MainScreen"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResultScreen"
              component={Result}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    paddingHorizontal: 30,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

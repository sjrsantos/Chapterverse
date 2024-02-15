// Navigation.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import UserLogin from "../screens/UserLogin";
import Registration from "../screens/Registration";
import BooksList from "../screens/BooksList";
import BookDetails from "../screens/BookDetails";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserLogin"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="BooksList" component={BooksList} />
        <Stack.Screen
          name="BookDetails"
          component={BookDetails}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

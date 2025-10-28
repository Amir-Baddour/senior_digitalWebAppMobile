import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthProvider, { AuthContext } from "./src/context/AuthContext.jsx";

import LoginScreen from "./src/screens/Auth/LoginScreen.jsx";
import RegisterScreen from "./src/screens/Auth/RegisterScreen.jsx";
import ForgotPasswordScreen from "./src/screens/Auth/ForgotPasswordScreen.jsx";
import ResetPasswordScreen from "./src/screens/Auth/ResetPasswordScreen.jsx";

import DashboardScreen from "./src/screens/App/DashboardScreen.jsx";
import DepositScreen from "./src/screens/App/DepositScreen.jsx";
import WithdrawScreen from "./src/screens/App/WithdrawScreen.jsx";
import TransferScreen from "./src/screens/App/TransferScreen.jsx";
import TransactionsScreen from "./src/screens/App/TransactionsScreen.jsx";
import ProfileScreen from "./src/screens/App/ProfileScreen.jsx";
import VerificationScreen from "./src/screens/App/VerificationScreen.jsx";
import AssetsScreen from "./src/screens/App/AssetsScreen.jsx";
import ExchangeScreen from "./src/screens/App/ExchangeScreen.jsx";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { token, loading } = useContext(AuthContext);
  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {token ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Deposit" component={DepositScreen} />
          <Stack.Screen name="Withdraw" component={WithdrawScreen} />
          <Stack.Screen name="Transfer" component={TransferScreen} />
          <Stack.Screen name="Transactions" component={TransactionsScreen} />
          <Stack.Screen name="Assets" component={AssetsScreen} />
          <Stack.Screen name="Exchange" component={ExchangeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

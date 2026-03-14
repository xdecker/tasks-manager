import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignupScreen } from "@/features/auth/screens";

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

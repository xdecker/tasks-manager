import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./AuthNavigator";
import { TasksNavigator } from "./TasksNavigator";
import { useAuthStore } from "@/store/auth.store";

export function AppNavigator() {
  const token = useAuthStore((state) => state.token);

  return (
    <NavigationContainer>
      {token ? <TasksNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

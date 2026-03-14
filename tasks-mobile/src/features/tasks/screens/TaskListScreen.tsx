import { View, Text, Button } from "react-native";
import { useAuthStore } from "@/store/auth.store";

export function TaskListScreen() {
  return (
    <View>
      <Text>Tasks Screen</Text>
      <Button onPress={() => {useAuthStore.getState().logout();}} title="cerrar sesion" />
    </View>
  );
}

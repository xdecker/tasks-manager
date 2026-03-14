import { MenuProvider } from "react-native-popup-menu";
import { AppNavigator } from "@/navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MenuProvider>
        <AppNavigator />
        <Toast />
      </MenuProvider>
    </GestureHandlerRootView>
  );
}

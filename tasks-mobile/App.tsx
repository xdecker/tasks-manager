import { MenuProvider } from "react-native-popup-menu";
import { AppNavigator } from "@/navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MenuProvider>
        <AppNavigator />
      </MenuProvider>
    </GestureHandlerRootView>
  );
}

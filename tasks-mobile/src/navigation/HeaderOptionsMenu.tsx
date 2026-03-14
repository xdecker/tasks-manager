import React from "react";
import { Alert, Text, View } from "react-native";
import { LogOut, MoreVertical } from "lucide-react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useAuthStore } from "@/store/auth.store";

export function HeaderOptionsMenu() {
  const onLogout = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "yes",
        style: "default",
        onPress: () => useAuthStore.getState().logout(),
      },
    ]);
  };

  return (
    <Menu>
      <MenuTrigger>
        <MoreVertical size={24} color="#111" />
      </MenuTrigger>

      <MenuOptions>
        <MenuOption onSelect={onLogout}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <LogOut size={20} color={'#111'} />
            <Text style={{ padding: 10, color: "#111" }}>Log out</Text>
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

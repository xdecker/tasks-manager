import { Controller, Control } from "react-hook-form";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { ReactNode, useState } from "react";

type Props = {
  control: Control<any>;
  name: string;
  placeholder: string;
  icon?: ReactNode;
  secure?: boolean;
};

export function FormInput({ control, name, placeholder, icon, secure }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.wrapper}>
          <View style={styles.container}>
            {icon && <View style={styles.icon}>{icon}</View>}

            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              value={value}
              onChangeText={onChange}
              secureTextEntry={secure && !showPassword}
              autoCapitalize="none"
            />

            {secure && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="#666" />
                ) : (
                  <Eye size={20} color="#666" />
                )}
              </TouchableOpacity>
            )}
          </View>

          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    height: 50,
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  error: {
    color: "#DC2626",
    fontSize: 13,
    marginTop: 4,
  },
});

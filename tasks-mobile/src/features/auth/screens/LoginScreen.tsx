import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useLogin } from "../hooks/useLogin";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Mail, Lock } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas/login.schema";

export function LoginScreen() {
  const { handleLogin, loading, error } = useLogin();
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    handleLogin(data.email.trim(), data.password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          <View style={styles.centerItem}>
            <Text style={styles.title}>Task Manager</Text>

            <Text style={styles.subtitle}>Sign in to manage your tasks</Text>
          </View>

          <View style={styles.form}>
            <FormInput
              control={control}
              name="email"
              placeholder="Email"
              icon={<Mail size={20} color="#666" />}
            />

            <FormInput
              control={control}
              name="password"
              placeholder="Password"
              secure
              icon={<Lock size={20} color="#666" />}
            />

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryButtonText}>Sign in</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() =>
                navigation.dispatch(CommonActions.navigate("signup"))
              }
            >
              <Text style={styles.secondaryButtonText}>Create account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  centerItem: {
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },

  form: {
    gap: 16,
  },

  input: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  primaryButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
  },

  error: {
    color: "#DC2626",
    fontSize: 14,
  },
});

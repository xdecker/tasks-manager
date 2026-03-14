import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/FormInput";
import { Mail, Lock, User } from "lucide-react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useSignup } from "../hooks/useSignup";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormData, signupSchema } from "../schemas/signup.schema";

export function SignupScreen() {
  const navigation = useNavigation();
  const { handleSignup, loading, error } = useSignup();

  const { control, handleSubmit } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupFormData) => {
    handleSignup(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.centerItem}>
          <Text style={styles.title}>Create account</Text>

          <Text style={styles.subtitle}>
            Sign up to start managing your tasks
          </Text>
        </View>

        <View style={styles.form}>
          <FormInput
            control={control}
            name="name"
            placeholder="Name"
            icon={<User size={20} color="#666" />}
          />

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

          <FormInput
            control={control}
            name="confirmPassword"
            placeholder="Confirm password"
            secure
            icon={<Lock size={20} color="#666" />}
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={styles.primaryButton}
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryButtonText}>Sign up</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.dispatch(CommonActions.navigate("login"))}
          >
            <Text style={styles.secondaryButtonText}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  centerItem: {
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 6,
  },

  subtitle: {
    color: "#666",
    marginBottom: 32,
  },

  form: {
    gap: 16,
  },

  primaryButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
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

import { CheckCircle2, Clock, ListTodo } from "lucide-react-native";

export const colors = {
  primary: "#111",
  secondary: "E5E7EB",
};

export const statusStyles = {
  TODO: { bg: "#F3F4F6", text: "#374151", Icon: ListTodo },
  IN_PROGRESS: { bg: "#DBEAFE", text: "#1D4ED8", Icon: Clock },
  DONE: { bg: "#DCFCE7", text: "#166534", Icon: CheckCircle2 },
};

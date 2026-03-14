import { View, Text, StyleSheet } from "react-native";
import { ClipboardList } from "lucide-react-native";

interface Props {
  hasFilters: boolean;
}

export function EmptyTasks({ hasFilters }: Props) {
  return (
    <View style={styles.container}>
      <ClipboardList size={48} color="#9CA3AF" />

      <Text style={styles.title}>
        {hasFilters ? "No tasks match your filters" : "No tasks yet"}
      </Text>

      <Text style={styles.subtitle}>
        {hasFilters
          ? "Try changing the filters or sorting."
          : "Create your first task to get started."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    paddingHorizontal: 40,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    color: "#374151",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 6,
    color: "#6B7280",
    textAlign: "center",
  },
});

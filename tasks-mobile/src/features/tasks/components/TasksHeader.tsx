import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Plus } from "lucide-react-native";

interface Props {
  total: number;
  onCreate: () => void;
}

export function TasksHeader({ total, onCreate }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>
          {total ? `Total tasks: ${total}` : "No tasks yet"}
        </Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={onCreate}>
        <Plus size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  subtitle: {
    color: "#6B7280",
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
});

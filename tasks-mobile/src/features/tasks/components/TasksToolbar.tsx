import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowUpDown } from "lucide-react-native";
import { TaskStatus } from "../types/task.type";

interface Props {
  status?: TaskStatus;
  sort: "asc" | "desc";
  onStatusChange: (s?: TaskStatus) => void;
  onSortChange: () => void;
}

const statuses: (TaskStatus | "ALL")[] = ["ALL", "TODO", "IN_PROGRESS", "DONE"];

export function TasksToolbar({
  status,
  sort,
  onStatusChange,
  onSortChange,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {statuses.map((s) => {
          const selected = status === s || (s === "ALL" && !status);

          return (
            <TouchableOpacity
              key={s}
              style={[styles.chip, selected && styles.selected]}
              onPress={() =>
                onStatusChange(s === "ALL" ? undefined : (s as TaskStatus))
              }
            >
              <Text style={selected ? styles.selectedText : styles.text}>
                {s.replace("_", " ")}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.sort} onPress={onSortChange}>
        <ArrowUpDown size={20} />
        <Text>{sort.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  filters: {
    flexDirection: "row",
    gap: 8,
  },

  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },

  selected: {
    backgroundColor: "#3a3a3a",
  },

  text: {
    color: "#555",
    fontSize: 12,
  },

  selectedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  sort: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
});

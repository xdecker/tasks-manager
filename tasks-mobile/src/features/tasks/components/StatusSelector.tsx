import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Controller, Control } from "react-hook-form";
import { TaskStatus } from "../types/task.type";
import { statusStyles } from "@/theme/colors";

interface Props {
  control: Control<any>;
  name: string;
}

const statuses: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

export function StatusSelector({ control, name }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View style={styles.container}>
          {statuses.map((status) => {
            const style = statusStyles[status];
            const selected = value === status;

            return (
              <TouchableOpacity
                key={status}
                style={[
                  styles.item,
                  {
                    backgroundColor: selected ? style.bg : "#d1d1d1",
                  },
                ]}
                onPress={() => onChange(status)}
              >
                <Text
                  style={{
                    color: selected ? style.text : "#555",
                    fontWeight: "600",
                  }}
                >
                  {status.replace("_", " ")}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },

  item: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});

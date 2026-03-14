import React, { useCallback, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MoreVertical, Trash2 } from "lucide-react-native";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import { statusStyles } from "@/theme/colors";
import { TaskStatus } from "../types/task.type";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
}

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onAdvanceStatus: () => void;
}

export const TaskItem = React.memo(function TaskItem({
  task,
  onEdit,
  onDelete,
  onAdvanceStatus,
}: Props) {
  const swipeRef = useRef<Swipeable>(null);

  const status = statusStyles[task.status];
  const StatusIcon = status.Icon;

  const getNextStatus = (): TaskStatus | null => {
    if (task.status === "TODO") return "IN_PROGRESS";
    if (task.status === "IN_PROGRESS") return "DONE";
    return null;
  };

  const nextStatus = getNextStatus();
  const nextStyle = nextStatus ? statusStyles[nextStatus] : null;
  const NextIcon = nextStyle?.Icon;

  const handleAdvance = () => {
    if (!nextStatus) return;
    onAdvanceStatus();
    swipeRef.current?.close();
  };

  const handleDelete = () => {
    onDelete();
    swipeRef.current?.close();
  };

  const renderLeftActions = useCallback(() => {
    if (!nextStyle || !NextIcon || !nextStatus) return null;

    return (
      <View style={[styles.actionContainer, { backgroundColor: nextStyle.bg }]}>
        <NextIcon size={20} color={nextStyle.text} />

        <Text style={styles.actionText}>
          Change to{"\n"}
          <Text style={[styles.actionStatus, { color: nextStyle.text }]}>
            {nextStatus.replace("_", " ")}
          </Text>
        </Text>
      </View>
    );
  }, [task.status]);

  const renderRightActions = useCallback(() => {
    return (
      <View style={[styles.actionContainer, styles.delete]}>
        <Trash2 size={20} color="#DC2626" />

        <Text style={styles.deleteText}>Delete</Text>
      </View>
    );
  }, [task.status]);

  return (
    <Swipeable
      ref={swipeRef}
      friction={2}
      leftThreshold={70}
      rightThreshold={70}
      overshootLeft={false}
      overshootRight={false}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={handleAdvance}
      onSwipeableRightOpen={handleDelete}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.status, { backgroundColor: status.bg }]}>
            <StatusIcon size={14} color={status.text} />
            <Text style={[styles.statusText, { color: status.text }]}>
              {task.status.replace("_", " ")}
            </Text>
          </View>

          <Menu>
            <MenuTrigger>
              <MoreVertical size={20} color="#555" />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption onSelect={onEdit}>
                <Text style={styles.menuItem}>Edit task</Text>
              </MenuOption>

              <MenuOption onSelect={onDelete}>
                <Text style={[styles.menuItem, { color: "#DC2626" }]}>
                  Delete task
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>

        <Text style={styles.title}>{task.title}</Text>

        {task.description && (
          <Text numberOfLines={3} style={styles.description}>
            {task.description}
          </Text>
        )}
      </View>
    </Swipeable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  status: {
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
  },

  description: {
    marginTop: 6,
    color: "#6B7280",
  },

  menuItem: {
    padding: 10,
    fontSize: 16,
  },

  actionContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 16,

    maxWidth: 120,
  },

  actionText: {
    marginTop: 4,
    fontSize: 12,
    color: "#374151",
    textAlign: "center",
  },

  actionStatus: {
    fontWeight: "600",
  },

  delete: {
    alignItems: "center",
    backgroundColor: "#fff2f2",
  },

  deleteText: {
    marginTop: 4,
    fontSize: 12,
    color: "#DC2626",
  },
});

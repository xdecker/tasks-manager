import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/forms/FormInput";
import { FileText } from "lucide-react-native";

import { taskSchema, TaskFormData } from "../schemas/task.schema";
import { Task } from "../types/task.type";
import { StatusSelector } from "./StatusSelector";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => Promise<void>;
  loading?: boolean;
  task?: Task | null;
}

export function TaskFormModal({
  visible,
  onClose,
  onSubmit,
  loading,
  task,
}: Props) {
  const isEdit = !!task;

  const { control, handleSubmit, reset } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "TODO",
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description ?? "",
        status: task.status,
      });
    } else {
      reset({
        title: "",
        description: "",
        status: "TODO",
      });
    }
  }, [task]);

  const submit = async (data: TaskFormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>
              {isEdit ? "Edit task" : "Create task"}
            </Text>

            <View style={styles.form}>
              <FormInput
                control={control}
                name="title"
                placeholder="Task title"
                icon={<FileText size={20} color="#666" />}
              />

              <FormInput
                control={control}
                name="description"
                placeholder="Description (optional)"
              />

              <StatusSelector control={control} name="status" />

              <TouchableOpacity
                style={styles.primaryButton}
                disabled={loading}
                onPress={handleSubmit(submit)}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    {isEdit ? "Update task" : "Create task"}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={onClose}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  container: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
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
});

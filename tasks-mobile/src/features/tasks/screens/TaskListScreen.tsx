import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Alert,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { TaskItem } from "../components/TaskItem";
import { TasksHeader } from "../components/TasksHeader";
import { useTasks } from "../hooks/useTasks";
import { ItemTask, TaskStatus } from "../types/task.type";
import Toast from "react-native-toast-message";
import { TaskFormModal, TasksToolbar } from "../components";
import { TaskFormData } from "../schemas/task.schema";

export function TasksListScreen() {
  const {
    getAllTasks,
    loading,
    error,
    createNewTask,
    updateTaskSelected,
    deleteTaskSelected,
  } = useTasks();
  const [statusFilter, setStatusFilter] = useState<TaskStatus | undefined>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [tasks, setTasks] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ItemTask>();

  const fetchTasks = useCallback(
    async (pageToLoad = page, replace = false) => {
      if (loading) return;

      const res = await getAllTasks({
        page: pageToLoad,
        limit: 10,
        sort: sortOrder,
        status: statusFilter,
      });

      if (res) {
        setTasks((prev) => {
          if (replace) {
            return res.data;
          }

          const existingIds = new Set(prev.map((t) => t.id));

          const newTasks = res.data.filter((t: any) => !existingIds.has(t.id));

          return [...prev, ...newTasks];
        });
        setLastPage(res.meta.lastPage);
        setTotal(res.meta.total);
      }
    },
    [page, loading, sortOrder, statusFilter]
  );

  useEffect(() => {
    fetchTasks();
  }, [page]);

  useEffect(() => {
    setTasks([]);
    setPage(1);
    fetchTasks(1, true);
  }, [statusFilter, sortOrder]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setTasks([]);

    await fetchTasks(1, true);

    setPage(1);
    setRefreshing(false);
  };

  const advanceStatus = async (task: any) => {
    let nextStatus = null;

    if (task.status === "TODO") nextStatus = "IN_PROGRESS";
    if (task.status === "IN_PROGRESS") nextStatus = "DONE";

    if (!nextStatus) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t))
    );
    try {
      await updateTaskSelected(task.id, { status: nextStatus as TaskStatus });
      Toast.show({
        type: "success",
        text1: "Task updated",
        position: "bottom",
      });
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: err.message ?? "Task cant be updated",
        position: "bottom",
      });
    }
  };

  const confirmDelete = (taskId: string) => {
    Alert.alert("Delete task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => removeTask(taskId),
      },
    ]);
  };

  const removeTask = async (taskId: string) => {
    const prevTasks = tasks;

    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setTotal((t) => t - 1);

    try {
      await deleteTaskSelected(taskId);

      Toast.show({
        type: "success",
        text1: "Task deleted",
        position: "bottom",
      });
    } catch (err: any) {
      setTasks(prevTasks);
      Toast.show({
        type: "error",
        text1: err.message ?? "Task cant be deleted",
        position: "bottom",
      });
    }
  };

  const loadMore = () => {
    if (loading) return;

    if (page < lastPage) {
      setPage((p) => p + 1);
    }
  };

  const sortTasks = (list: ItemTask[]) =>
    [...list].sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();

      return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
    });

  const renderItem = useCallback(
    ({ item }: any) => (
      <TaskItem
        task={item}
        onEdit={() => {
          setSelectedTask(item);
          setModalVisible(true);
        }}
        onDelete={() => confirmDelete(item.id)}
        onAdvanceStatus={() => advanceStatus(item)}
      />
    ),
    []
  );

  const handleSubmitTask = async (data: TaskFormData) => {
    if (selectedTask) {
      const updated = await updateTaskSelected(selectedTask.id, data);

      setTasks((prev) =>
        prev.map((t) => (t.id === selectedTask.id ? { ...t, ...updated } : t))
      );
    } else {
      const newTask = await createNewTask(data);
      setTasks((prev) => sortTasks([...prev, newTask]));
      setTotal((t) => t + 1);
    }
    Toast.show({
      type: "success",
      text1: `Task ${selectedTask ? "updated" : "created"} successfully`,
      position: "bottom",
    });
    setModalVisible(false);
    setSelectedTask(undefined);
  };

  return (
    <View style={styles.container}>
      <TasksHeader
        total={total}
        onCreate={() => {
          setSelectedTask(undefined);
          setModalVisible(true);
        }}
      />

      <TasksToolbar
        status={statusFilter}
        sort={sortOrder}
        onStatusChange={(s) => setStatusFilter(s)}
        onSortChange={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.itemsContainer}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          loading ? <ActivityIndicator style={{ marginVertical: 20 }} /> : null
        }
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews
      />

      <TaskFormModal
        visible={modalVisible}
        task={selectedTask}
        loading={loading}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmitTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAFAFA",
  },

  itemsContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
  },
});

import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { TaskItem } from "../components/TaskItem";
import { TasksHeader } from "../components/TasksHeader";
import { useTasks } from "../hooks/useTasks";

export function TasksListScreen() {
  const { getAllTasks, loading, error } = useTasks();

  const [tasks, setTasks] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = useCallback(
    async (pageToLoad = page, replace = false) => {
      if (loading || page > lastPage) return;

      const res = await getAllTasks({
        page: pageToLoad,
        limit: 10,
        sort: "asc",
      });

      if (res) {
        setTasks((prev) => {
          const existingIds = new Set(prev.map((t) => t.id));

          const newTasks = res.data.filter((t: any) => !existingIds.has(t.id));

          return [...prev, ...newTasks];
        });
        setLastPage(res.meta.lastPage);
        setTotal(res.meta.total);
      }
    },
    [page, loading]
  );

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setTasks([]);

    await fetchTasks(1, true);

    setPage(1);
    setRefreshing(false);
  };

  const renderItem = useCallback(
    ({ item }: any) => (
      <TaskItem
        task={item}
        onEdit={() => console.log("edit")}
        onDelete={() => console.log("delete")}
        onAdvanceStatus={() => console.log("advanceStatus")}
      />
    ),
    []
  );

  const loadMore = () => {
    if (loading) return;

    if (page < lastPage) {
      setPage((p) => p + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TasksHeader total={total} onCreate={() => console.log("create task")} />

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

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TasksListScreen } from "@/features/tasks/screens";

export type TasksStackParamList = {
  Tasks: undefined;
  CreateTask: undefined;
};

const Stack = createNativeStackNavigator<TasksStackParamList>();

export function TasksNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tasks"
        component={TasksListScreen}
        options={{
          title: "My Tasks",
        }}
      />
    </Stack.Navigator>
  );
}

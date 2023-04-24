import { Text, SafeAreaView, FlatList } from "react-native";

export default function Directions({
  navigation,
  route,
}: {
  navigation: unknown;
  route: any;
}) {
  return (
    <SafeAreaView>
      <FlatList
        data={route.params.directions}
        renderItem={({ item }) => (
          <Text className="bg-white p-2 text-xl">{item}</Text>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

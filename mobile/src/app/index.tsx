import { FlatList, Text, View } from "react-native";
import { api } from "../utils/api";

const Home = () => {
  const students = api.ucr.studentsDrizzle.useQuery();

  return (
    <View>
      <FlatList
        data={students.data}
        renderItem={({ item }) => <Text>{item.firstName}</Text>}
      />
    </View>
  );
};

export default Home;

import { FlatList, StyleSheet, Text, View } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile'

const subjectList = [
  { id: '1', name: 'React Native' },
  { id: '2', name: 'Flutter' },
  { id: '3', name: 'Python' },
  { id: '4', name: 'Node' },
  { id: '5', name: 'JavaScript' },
];

const Dashboard = ({navigation}) => {
  const renderCategorySubject = itemData => {
    const pressHandler = () => {
      navigation.navigate('QuestionScreen', {
        categoryId: itemData.item.id,
      });
    };
    return (
      <CategoryGridTile title={itemData.item.name} onPress={pressHandler} />
    );
  };
  return (
    <FlatList
      data={subjectList}
      renderItem={renderCategorySubject}
      keyExtractor={item => item.id}
      numColumns={2}
    />
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import useFirestore from '../hooks/useFirestore';
const DetailData = ({ navigation, route }) => {
  const { item } = route.params;

  const { deleteData } = useFirestore();
  const handleEdit = () => {
    navigation.navigate('Edit Data', { item });
  };

  const handleDelete = async (name) => {
    await deleteData(name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DISPLAY SINGLE DATA</Text>
      <View style={styles.dataContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.dataText}>{item.email}</Text>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.dataText}>{item.name}</Text>

        <Text style={styles.label}>Country</Text>
        <Text style={styles.dataText}>{item.country}</Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.dataText}>{item.address}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button mode='contained' onPress={handleEdit}>
          Edit{' '}
        </Button>
        <Button mode='contained' onPress={() => handleDelete(item.name)}>
          Delete{' '}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 20,
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  dataText: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default DetailData;

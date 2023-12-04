import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useFirestore from '../hooks/useFirestore';
import { ActivityIndicator, Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import DetailData from './DetailData';
import { useNavigation } from '@react-navigation/native';
import EditData from './EditData';
import { FlatList, TextInput } from 'react-native';

const ShowData = () => {
  const navigation = useNavigation();
  const { retrieveData } = useFirestore();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const retrievedData = await retrieveData();
    setData(retrievedData);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      fetchData(); // Fetch all data if search is cleared
    } else {
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredData);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.dataRow}>
      <Text style={styles.dataText}>Email: {item.email}</Text>
      <Text style={styles.dataText}>Name: {item.name}</Text>
      <Text style={styles.dataText}>Address: {item.address}</Text>
      <Button
        mode='contained'
        onPress={() => navigation.navigate('Detail Data', { item })}
      >
        Select
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder='Search by name...'
        onChangeText={handleSearch}
        value={searchQuery}
      />
      {data.length === 0 ? (
        <Text style={{ fontSize: 40 }}>No data found</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={renderItem}
        />
      )}
      <Button mode='contained' onPress={fetchData}>
        Refresh
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  dataRow: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  dataText: {
    fontSize: 16,
  },
  noDataText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 'auto',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 10,
  },
});

const Stack = createStackNavigator();
const DataNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Show Data'>
      <Stack.Screen name='Show Data' component={ShowData} />
      <Stack.Screen name='Detail Data' component={DetailData} />
      <Stack.Screen name='Edit Data' component={EditData} />
    </Stack.Navigator>
  );
};
export default DataNavigation;

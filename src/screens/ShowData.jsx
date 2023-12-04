import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useFirestore from '../hooks/useFirestore';
import { ActivityIndicator, Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import DetailData from './DetailData';
import { useNavigation } from '@react-navigation/native';
import EditData from './EditData';

const ShowData = () => {
  const navigation = useNavigation();
  const { retrieveData } = useFirestore();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const retrievedData = await retrieveData();
      setData(retrievedData);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <ActivityIndicator style={styles.noDataText} size='large' />
      ) : (
        data.map((item, index) => (
          <View key={index} style={styles.dataRow}>
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
        ))
      )}
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

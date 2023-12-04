import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import useFirestore from '../hooks/useFirestore';

const EditData = ({ route, navigation }) => {
  const { item } = route.params;

  // Create state for each field
  const [email, setEmail] = useState(item.email);
  const [name, setName] = useState(item.name);
  const [address, setAddress] = useState(item.address);
  const { updateData } = useFirestore();
  const handleSave = async () => {
    // Implement save logic here
    // For example, update the Firestore document with the new state values
    console.log('Data saved', {
      email,
      name,
      address,
    });

    await updateData(name, { email, name, address });
    // Then navigate back or show confirmation message
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder='Email'
      />
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder='Name'
      />

      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder='Address'
      />
      <Button title='Save Changes' onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginVertical: 6,
  },
});

export default EditData;

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import useFirestore from '../hooks/useFirestore';

const Input = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('Male');
  const [skills, setSkills] = useState('');
  const [address, setAddress] = useState('');

  const { addData } = useFirestore();

  const handleSubmit = async () => {
    console.log({ email, name, country, gender, skills, address });
    const formData = {
      email: email,
      name: name,
      country: country,
      gender: gender,
      skills: skills,
      address: address,
    };
    await addData(formData);
  };

  return (
    <View style={styles.container}>
      <TextInput mode='outlined' label='Email' onChangeText={setEmail} />
      <TextInput mode='outlined' label='Name' onChangeText={setName} />
      <TextInput mode='outlined' label='Country' onChangeText={setCountry} />
      <RadioButton.Group onValueChange={setGender} value={gender}>
        <RadioButton.Item label='Male' value='Male' />
        <RadioButton.Item label='Female' value='Female' />
      </RadioButton.Group>
      <TextInput
        mode='outlined'
        label='Skills'
        multiline={true}
        maxLines={5}
        onChangeText={setSkills}
      />
      <TextInput
        mode='outlined'
        label='Address'
        multiline={true}
        maxLines={5}
        onChangeText={setAddress}
      />
      <Button mode='contained' onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default Input;

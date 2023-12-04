import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../services/firebase.config'; // Import your Firebase config

const useFirestore = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Add data to Firestore
  const addData = async (data) => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'persons', data.name); // Use name as the document ID
      await setDoc(docRef, data);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    setIsLoading(false);
  };

  // Retrieve data from Firestore
  const retrieveData = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, 'persons'));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setIsLoading(false);
    return data;
  };

  // Update data in Firestore
  // Update data in Firestore
  const updateData = async (originalName, updatedData) => {
    setIsLoading(true);
    const docRef = doc(db, 'persons', originalName); // Use originalName to reference the document
    try {
      await updateDoc(docRef, updatedData); // Pass all updated data
    } catch (error) {
      console.error('Error updating document: ', error);
    }
    setIsLoading(false);
  };

  const deleteData = async (name) => {
    setIsLoading(true);
    const docRef = doc(db, 'persons', name); // Use name as the document reference
    try {
      await deleteDoc(docRef);
      // Handle any post-deletion logic here, such as a confirmation message
    } catch (error) {
      console.error('Error deleting document: ', error);
      // Handle any errors, e.g., show an error message to the user
    }
    setIsLoading(false);
  };

  return { addData, retrieveData, updateData, isLoading, deleteData };
};

export default useFirestore;

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, Alert, Pressable, SafeAreaView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';

const db = SQLite.openDatabase('contacts.db');

export default function Home({ navigation }) {

  const [contacts, setContacts] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile1, setMobile1] = useState('');
  const [mobile2, setMobile2] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    createTable();
    const unsubscribe = navigation.addListener('focus', () => {
      loadContacts();
    });
    return unsubscribe;
  }, [navigation]);

  const createTable = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, mobile1 TEXT, mobile2 TEXT, email TEXT)',
          [],
          () => console.log('Table created successfully'),
          (error) => console.error('Error creating table: ', error)
        );
      },
      (error) => console.error('Transaction error: ', error)
    );
  };

  const loadContacts = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM contacts',
          [],
          (_, { rows }) => setContacts(rows._array),
          (error) => console.error('Error loading contacts: ', error)
        );
      },
      (error) => console.error('Transaction error: ', error)
    );
  };

  const UpdateContact = (id) => {
    navigation.navigate('UpdateContact', { c_id: id })
  }

  const deleteContact = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM contacts WHERE id = ?',
          [id],
          () => loadContacts(),
          (error) => console.error('Error deleting contact: ', error)
        );
      },
      (error) => console.error('Transaction error: ', error)
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <View style={{ width: '20%', height: 78, justifyContent: 'center', alignContent: 'center' }}>
        <Image source={require('./user.png')} style={{ width: '100%', height: '100%' }} />
      </View>
      <View style={{ width: '60%', paddingStart: 20, }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`${item.firstName} ${item.lastName}`}</Text>
        <Text style={{ fontSize: 16 }}>{`Mobile 1: ${item.mobile1}`}</Text>
        <Text style={{ fontSize: 16 }}>{`Mobile 2: ${item.mobile2}`}</Text>
        <Text style={{ fontSize: 16 }}>{`Email: ${item.email}`}</Text>
      </View>
      <View style={{ width: '20%', gap: 10 }}>
        <Button color={'red'} title="Delete" onPress={() => deleteContact(item.id)} />
        <Button title="Update" onPress={() => UpdateContact(item.id)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.title}>Contact Buddy</Text>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No contacts available</Text>}
      />
      <View style={{ height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1B4242', width: '100%' }}>
        <Pressable onPress={() => {
          setStatus(true);
          navigation.navigate('AddContact');
        }}>
          <Image source={require('./add_new_user.png')} />
        </Pressable>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6ECA9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    backgroundColor: '#1B4242',
    textAlign: 'center',
    padding: 10,
    height: 60,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
});
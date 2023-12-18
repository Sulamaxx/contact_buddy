import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as SQLite  from 'expo-sqlite';

const db = SQLite.openDatabase('contacts.db');

export default function Home() {
  const [contacts, setContacts] = useState([]);
  

  useEffect(() => {
    createTable();
    loadContacts();
  }, []);

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

  const addContact = () => {
    if (firstName && lastName && mobile1) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'INSERT INTO contacts (firstName, lastName, mobile1, mobile2, email) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, mobile1, mobile2, email],
            () => {
              loadContacts();
              setFirstName('');
              setLastName('');
              setMobile1('');
              setMobile2('');
              setEmail('');
            },
            (error) => console.error('Error adding contact: ', error)
          );
        },
        (error) => console.error('Transaction error: ', error)
      );
    }
  };

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
      <View>
        <Text>{`${item.firstName} ${item.lastName}`}</Text>
        <Text>{`Mobile 1: ${item.mobile1}`}</Text>
        <Text>{`Mobile 2: ${item.mobile2}`}</Text>
        <Text>{`Email: ${item.email}`}</Text>
      </View>
      <Button title="Delete" onPress={() => deleteContact(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact App</Text>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No contacts available</Text>}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
});

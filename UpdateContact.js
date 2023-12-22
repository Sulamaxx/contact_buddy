import { Button, TextInput, View, StyleSheet, SafeAreaView, Pressable, Text, Image } from "react-native";
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
const db = SQLite.openDatabase('contacts.db');

const UpdateContact = ({ navigation, route }) => {

    const { c_id } = route.params;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile1, setMobile1] = useState('');
    const [mobile2, setMobile2] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        createTable();
        console.log('Contact ID:', c_id);
        loadContactData();
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


                tx.executeSql(
                    'SELECT name FROM sqlite_master WHERE type="table" AND name="contacts"',
                    [],
                    (_, { rows }) => console.log('Table exists:', rows.length > 0),
                    (error) => console.error('Error checking table existence: ', error)
                );

            },
            (error) => console.error('Transaction error: ', error)
        );
    };


    const loadContactData = () => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'SELECT * FROM contacts WHERE id = ?',
                    [c_id],
                    (_, { rows }) => {
                        const contact = rows.item(0);
                        setFirstName(contact.firstName);
                        setLastName(contact.lastName);
                        setMobile1(contact.mobile1);
                        setMobile2(contact.mobile2);
                        setEmail(contact.email);
                    },
                    (error) => console.error('Error loading contact data: ', error) // Log the error details
                );
            },
            (error) => console.error('Transaction error: ', error)
        );
    };


    const updateContact = () => {
        if (firstName && lastName && mobile1) {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        'UPDATE contacts SET firstName = ?, lastName = ?, mobile1 = ?, mobile2 = ?, email = ? WHERE id = ?',
                        [firstName, lastName, mobile1, mobile2, email, c_id],
                        () => {
                            navigation.navigate('Home');
                        },
                        (error) => console.error('Error updating contact: ', error)
                    );
                },
                (error) => console.error('Transaction error: ', error)
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Pressable style={styles.imgdiv} onPress={() => { navigation.navigate('Home') }}>
                <Image source={require('./arrowblue.png')} style={styles.img1} />
            </Pressable>
            <Image source={require('./add_contact.png')} style={styles.img} />
            <Text style={styles.title}>Update Contact</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mobile 1"
                    value={mobile1}
                    onChangeText={(text) => setMobile1(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mobile 2"
                    value={mobile2}
                    onChangeText={(text) => setMobile2(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Pressable style={styles.btn} onPress={updateContact} >
                    <Text style={styles.txt}>Update Contact</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default UpdateContact;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6ECA9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 30,
        width: '80%',
        marginTop: 40,
    },
    input: {
        height: 50,
        borderColor: '#B31312',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#B31312',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    img: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    img1: {
        width: 50,
        height: 50,
        resizeMode: 'contain',

    },
    imgdiv: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
});

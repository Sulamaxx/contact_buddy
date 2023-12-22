import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

const LogIn = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.title}>Contact Buddy</Text>
                <Image source={require('./contact.png')} style={styles.img} />
            </View>
            <Pressable style={styles.btn} onPress={()=>{navigation.navigate('Home')}}>
                <Text style={styles.txt}>Click Me</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6ECA9',
    },
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 20,
        borderColor: '#B31312',
        borderWidth: 2,

    },
    img: {
        width: 150,
        height: 200,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
    },

    btn: {
        marginTop: 20,
        backgroundColor: '#B31312',
        width: '75%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

    },
    txt: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default LogIn;
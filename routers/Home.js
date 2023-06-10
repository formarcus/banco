import { useState } from "react";
import { Button, TextInput, Text, View, StyleSheet } from "react-native";

const User = [
    {
        user: "admin@gmail.com",
        password: 1234
    }
]

export default  function Home({navigation, route}) {
    
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");

    function NavigationValidPage(){
        return navigation.navigate('Service');
        var valid = User.filter(p => p.password == password && p.user == user).length > 0 ? true : false;

        if(user != ""){
            if(password != ""){
                if(valid){
                    setErro("")
                    setUser("")
                    setPassword("")
                    navigation.navigate('Task');
                }
                else{
                    setErro("User not found")
                }
            }
            else{
                setErro("Inform the password")
            }
        }
        else{                        
            setErro("Inform the user")
        }
    }

    return (
        <View style={style.container}>

            <View style={style.form_danger}>
                <Text style={(erro != "") ? style.active_danger : false}>{erro}</Text>
            </View>


            <View style={style.form}>
                <TextInput style={style.input} 
                           placeholder="Enter your user" 
                           onChangeText={(text) => setUser(text)}
                           onBlur={() => {}}
                           value={user}
                />
            </View>

            <View style={style.form}>
                <TextInput style={style.input} 
                           secureTextEntry
                           placeholder="Enter your password"
                           onChangeText={(text) => setPassword(text)}
                           value={password}
                />
            </View>

            <View style={style.form}>                
                <Button title="Sing in" onPress={() => NavigationValidPage() }/>
            </View>



        </View>
    )
}

const style = StyleSheet.create({
    container : {
        flex: 1,     
        alignItems: 'center',
        justifyContent: "center"
    },
    form : {
        width: 300,
        borderWidth: 1,
        borderColor: "blue",
        margin: 2,
        borderRadius: 5,
    },
    input : {
        fontSize: "1.2em",
        padding: 4, 
        
    },
    active_danger: {
        fontSize: "1.4em",
        backgroundColor: "red",
        padding: 6,
        borderRadius: 5,
    },
    form_danger: {
        width: 300, 
        borderRadius: 5, 
        textAlign: "center"
    },
    active_danger: {
        fontSize: "1.4em",
        backgroundColor: "red",
        padding: 6,
        borderRadius: 5,
    },

})
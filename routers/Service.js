import { useState, useEffect } from "react";
import { Button, FlatList, SafeAreaView, TextInput, Text, View, StyleSheet } from "react-native";
import axios from "axios"

const DATA = [];
  
export default  function Service() {
        
    const [task, setTask] = useState("");
    const [dados, setDados] = useState([]);

  const fetchBuscar = async () => {
    axios.get("http://localhost:4003/Buscar")
    .then((response) => {
      debugger
      setDados(response.data)
    })
    .catch((error) => {
      console.log(error);  
    })
  };

  useEffect(() => {    
    fetchBuscar();
  }, [])
  

  const fetchAdd = async (data) => {
    axios.post("http://localhost:4003/Adicionar", {
      nome: data.nome
    })
    .then((response) => {
      debugger
      fetchBuscar();
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const fetchExcluir = async (data) => {
    debugger
    axios.delete("http://localhost:4003/Excluir", {
      data: data
    })
    .then((response) => {
      debugger
      fetchBuscar();
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const fetchAlterar = async (data) => {
    debugger
    axios.post("http://localhost:4003/Alterar", {
      id: data.id,
      nome: data.nome
    })
    .then((response) => {
      debugger
      fetchBuscar();
    })
    .catch((error) => {
      console.log(error);
    })
  };

    const Item = ({item}) => (
        <View style={style.item}>
            <Text style={style.title}>{item.nome}</Text>
            <Button title="Remove"  color={"red"} onPress={() => {   
              fetchExcluir({id:item.id})
             } }/>
             <Button title="Alterar"  color={"blue"} onPress={() => {   
              fetchAlterar({id:item.id, nome: task})
             } }/>
        </View>
    )

    return (
        <View style={style.container}>

            <View style={style.form}>
                <TextInput style={style.input} 
                           placeholder="enter task name" 
                           onChangeText={(text) => setTask(text)}
                           value={task}
                />
            </View>

            <View style={style.form}>                
                <Button title="Add" onPress={() => {                    
                    fetchAdd({nome: task})
                    
                 } }/>
            </View>

            <View style={style.divider}>

            </View>


            <SafeAreaView style={style.container}>
                <FlatList
                    data={dados}
                    renderItem={({item}) => <Item item={item} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        flex: 1,     
        alignItems: 'center',
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
        width: "100%"
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
    divider: {
        width: "100%", 
        borderWidth: 1,
        borderColor: "black",    
    },
    item: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "black",
        width: 400, 
        margin: 2,
    },
    title: {
        margin: 4,
        flex: 1
    }
})
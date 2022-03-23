import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native-gesture-handler";

type FormData = {
  nome: string;
  tempoPreparo: Number;
  ingredientes: string[];
  modoPreparo: string[];
};

const NewRecipe = ({ navigation }) => {
  const [toggleIngredientes, setToggleIngredientes] = useState(false);
  const [toggleModoPreparo, setToggleModoPreparo] = useState(false);
  const [ingredientes, setIngredientes] = useState([""]);
  const [modoPreparo, setModoPreparo] = useState([""]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      ingredientes: ingredientes,
      modoPreparo: modoPreparo,
      tempoPreparo: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    data = {
      ...data,
      ingredientes: ingredientes,
      modoPreparo: modoPreparo,
    };

    AsyncStorage.setItem(`@Receitas:${data.nome}`, JSON.stringify(data));
    toggleIngredientesHandler();
    toggleModoPreparoHandler();
    Alert.alert("Receita salva com sucesso!");
    navigation.navigate("MainScreen");
  };

  function clearLocalStorage() {
    AsyncStorage.clear();
  }

  const toggleIngredientesHandler = () => {
    setToggleIngredientes(!toggleIngredientes);
  };

  const toggleModoPreparoHandler = () => {
    setToggleModoPreparo(!toggleModoPreparo);
  };

  const addIngredienteHandler = (value: string) => {
    setIngredientes([...ingredientes, value]);
  };

  const addModoPreparoHandler = (value: string) => {
    setModoPreparo([...modoPreparo, value]);
  };

  const removeIngredienteHandler = (index: number) => {
    const newIngredientes = [...ingredientes];
    newIngredientes.splice(index, 1);
    setIngredientes(newIngredientes);
  };

  const removeModoPreparoHandler = (index: number) => {
    const newModoPreparo = [...modoPreparo];
    newModoPreparo.splice(index, 1);
    setModoPreparo(newModoPreparo);
  };

  function logCurrentStorage() {
    AsyncStorage.getAllKeys().then((keyArray) => {
      AsyncStorage.multiGet(keyArray).then((keyValArray) => {
        let myStorage: any = {};
        for (let keyVal of keyValArray) {
          myStorage[keyVal[0]] = keyVal[1];
        }
      });
    });
  }

  return (
    <>
      {/* <TouchableOpacity onPress={clearLocalStorage}>
        <Text>clear storage</Text>
      </TouchableOpacity> */}
      <ImageBackground
        source={require("../../assets/newrecipebackground.jpg")}
        style={styles.backgroundImage}
      >
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MainScreen");
              }}
              style={styles.buttonVoltar}
            >
              <Icon name="arrow-left" size={28} color="#543685" />
              <Text style={styles.texto}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Nova Receita</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  placeholder="Nome da Receita"
                  value={value}
                />
              )}
              name="nome"
            />
            {errors.nome && (
              <Text style={styles.errorWarning}>Campo obrigatório</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  placeholder="Tempo de preparo (em minutos)"
                  value={value}
                />
              )}
              name="tempoPreparo"
            />
            {errors.tempoPreparo && (
              <Text style={styles.errorWarning}>Campo obrigatório</Text>
            )}

            {/* INGREDIENTES */}
            <TouchableOpacity
              style={styles.listButtonStyle}
              onPress={toggleIngredientesHandler}
            >
              <Text style={styles.texto}> Ingredientes </Text>
            </TouchableOpacity>
            <SafeAreaView>
              {toggleIngredientes ? (
                <SafeAreaView style={styles.listContainer}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      removeIngredienteHandler(ingredientes.length - 1)
                    }
                  >
                    <Text style={styles.texto}>-</Text>
                  </TouchableOpacity>
                  <FlatList
                    data={ingredientes}
                    renderItem={({ item, index }) => (
                      <TextInput
                        style={styles.inputLista}
                        placeholder={"Ingrediente " + (index + 1)}
                        onChangeText={(value) =>
                          setIngredientes([
                            ...ingredientes.slice(0, index),
                            value,
                            ...ingredientes.slice(index + 1),
                          ])
                        }
                      >
                        {item ? item : null}
                      </TextInput>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addIngredienteHandler("")}
                  >
                    <Text style={styles.texto}>+</Text>
                  </TouchableOpacity>
                </SafeAreaView>
              ) : null}
            </SafeAreaView>

            {/* MODO DE PREPARO */}

            <TouchableOpacity
              style={styles.listButtonStyle}
              onPress={toggleModoPreparoHandler}
            >
              <Text style={styles.texto}> Modo de preparo </Text>
            </TouchableOpacity>
            <SafeAreaView>
              {toggleModoPreparo ? (
                <SafeAreaView style={styles.listContainer}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      removeModoPreparoHandler(modoPreparo.length - 1)
                    }
                  >
                    <Text style={styles.texto}>-</Text>
                  </TouchableOpacity>
                  <FlatList
                    data={modoPreparo}
                    renderItem={({ item, index }) => (
                      <TextInput
                        style={styles.inputLista}
                        placeholder={"Passo " + (index + 1)}
                        onChangeText={(value) =>
                          setModoPreparo([
                            ...modoPreparo.slice(0, index),
                            value,
                            ...modoPreparo.slice(index + 1),
                          ])
                        }
                      >
                        {item ? item : null}
                      </TextInput>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addModoPreparoHandler("")}
                  >
                    <Text style={styles.texto}>+</Text>
                  </TouchableOpacity>
                </SafeAreaView>
              ) : null}
            </SafeAreaView>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.texto}>Salvar</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "#402ea8",
    fontWeight: "bold",
    marginBottom: 20,
    backgroundColor: "#c6a1ff",
    padding: 5,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    padding: 10,
    width: "80%",
    backgroundColor: "#c6a1ff",
  },
  button: {
    backgroundColor: "#c6a1ff",
    padding: 20,
    margin: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  errorWarning: {
    color: "red",
    fontSize: 20,
    marginBottom: 10,
  },
  texto: {
    fontSize: 20,
    color: "#402ea8",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  listButtonStyle: {
    backgroundColor: "#c6a1ff",
    padding: 10,
    marginTop: 0.7,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "80%",
  },
  inputLista: {
    height: 40,
    borderColor: "#ddd",
    marginLeft: 60,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    padding: 10,
    minWidth: "60%",
    backgroundColor: "#fff",
  },
  listContainer: {
    borderColor: "#ddd",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  addButton: {
    backgroundColor: "#fff",
    marginLeft: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "10%",
    height: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonVoltar: {
    backgroundColor: "#c6a1ff",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    alignSelf: "flex-start",
    marginLeft: 39,
    display: "flex",
    flexDirection: "row",
    marginTop: -100,
    marginBottom: 80,
  },
});

export default NewRecipe;

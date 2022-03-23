import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native-gesture-handler";

type FormData = {
  nome: string;
  tempoPreparo: string;
};

const MainScreen = ({ navigation }: any) => {
  const [receitas, setReceitas] = useState([]);
  const [receitasTemp, setReceitasTemp] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getReceitas = async () => {
    await AsyncStorage.getAllKeys().then((keys) =>
      keys.map((key) =>
        AsyncStorage.getItem(key).then((value) => {
          setReceitas((prev) => [...prev, JSON.parse(value)]);
          setReceitasTemp((prev) => [...prev, JSON.parse(value)]);
          return value || "{}";
        })
      )
    );
  };

  const wait = (timeout: any) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setReceitas([]);
      setReceitasTemp([]);
      getReceitas();
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    setReceitas([]);
    setReceitasTemp([]);
    getReceitas();
    // if (receitas.length !== 0) {
    //   const willFocusSubscription = navigation.addListener("focus", () => {
    //     setReceitas([]);
    //     setReceitasTemp([]);
    //     getReceitas();
    //     return willFocusSubscription;
    //   });
    // }
  }, []);

  const findSimilarInArray = (array: any, value: string) => {
    let temp: any = [];
    if (value === "") {
      setReceitas(receitasTemp);
    } else {
      array.forEach((element) => {
        if (element.nome.toLowerCase().includes(value.toLowerCase())) {
          temp.push(element);
        }
      });
      setReceitas(temp);
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/mainbackground.jpg")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Busque sua receita</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do da receita"
            onChange={(e) => {
              const similarReceitas = findSimilarInArray(
                receitas,
                e.nativeEvent.text
              );
            }}
          />
          {receitas !== [] ? (
            <FlatList
              data={receitas}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Details", { receita: item })
                  }
                  style={styles.receita}
                >
                  <SafeAreaView style={styles.insideList}>
                    <Icon name="clock" size={30} />
                    <Text style={styles.tempoPreparoStyle}>
                      {item.tempoPreparo} minutos
                    </Text>
                  </SafeAreaView>
                  <Text style={styles.nomeItemStyle}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
          ) : null}

          <TouchableOpacity
            style={styles.addRecipe}
            onPress={() => navigation.navigate("NewRecipe")}
          >
            <Text style={styles.addRecipeText}>Adicionar receita</Text>
          </TouchableOpacity>
        </SafeAreaView>
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
  receita: {
    backgroundColor: "#ccbee0",
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    minWidth: "100%",
  },
  title: {
    fontSize: 30,
    color: "#37166b",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    padding: 10,
    width: "80%",
    backgroundColor: "#fff",
  },
  insideList: {
    flexDirection: "row",
    alignItems: "center",
  },
  tempoPreparoStyle: {
    fontSize: 20,
    color: "#402ea8",
    marginLeft: 10,
  },
  nomeItemStyle: {
    fontSize: 15,
    color: "#000",
  },
  addRecipe: {
    backgroundColor: "#ccbee0",
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 20,
  },
  addRecipeText: {
    fontSize: 20,
    color: "#402ea8",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default MainScreen;

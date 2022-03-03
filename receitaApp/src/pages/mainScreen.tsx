import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

const receitas = [
  {
    id: 1,
    nome: "Bolo de cenoura",
    ingredientes: [
      "1 cenoura",
      "1 copo de leite",
      "1 copo de açúcar",
      "1 copo de manteiga",
      "1 copo de farinha de trigo",
    ],
    modoPreparo: [
      "1. Cozinhe a cenoura em água e sal",
      "2. Em uma panela, coloque o leite, o açúcar, a manteiga e a farinha de trigo",
      "3. Mexa bem até ficar uma mistura homogênea",
      "4. Junte o leite, o açúcar, a manteiga e a farinha de trigo",
      "5. Mexa bem até ficar uma mistura homogênea",
      "6. Coloque em uma forma de bolo e leve ao forno pré-aquecido a 180°C por aproximadamente 30 minutos",
    ],
    imagem:
      "https://s2.glbimg.com/vGqO-xbCN2RQQO13DP1Z9-pV0N4=/0x0:1280x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2021/9/N/bmnJNgR5G0K2QmEYFkPQ/bolo-de-cenoura-receita.jpg",
  },
  {
    id: 2,
    nome: "Bolo de chocolate",
    ingredientes: [
      "1 copo de leite",
      "1 copo de açúcar",
      "1 copo de manteiga",
      "1 copo de farinha de trigo",
      "1 copo de chocolate em pó",
    ],
    modoPreparo: [
      "1. chocolatewww",
      "2. Em uma panela, coloque o leite, o açúcar, a manteiga e a farinha de trigo",
      "3. Mexa bem até ficar uma mistura homogênea",
      "4. Junte o leite, o açúcar, a manteiga e a farinha de trigo",
      "5. Mexa bem até ficar uma mistura homogênea",
      "6. Coloque em uma forma de bolo e leve ao forno pré-aquecido a 180°C por aproximadamente 30 minutos",
    ],
    imagem:
      "https://img.itdg.com.br/tdg/images/recipes/000/000/818/818/818/818/818.jpg?mode=crop&width=710&height=400",
  },
];

const MainScreen = ({ navigation }) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Busque sua receita</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do da receita"
        />
        <FlatList
          data={receitas}
          keyExtractor={(receita) => receita.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", { receita: item })}
              style={styles.receita}
            >
              <Text>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b85e5e",
    alignItems: "center",
    justifyContent: "center",
  },
  receita: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 30,
    color: "#fff",
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
});

export default MainScreen;

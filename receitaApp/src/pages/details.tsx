import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

const Details = (receita: any) => {
  const { nome, ingredientes, modoPreparo, imagem } =
    receita.route.params.receita;
  return (
    <>
      <ImageBackground
        source={require("../../assets/detailsbackground.jpg")}
        style={styles.backgroundImage}
      >
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <Image style={styles.imagem} source={{ uri: imagem }} />
            <SafeAreaView style={styles.card}>
              <Text style={styles.title}>{nome}</Text>
              <Text style={styles.ingredientes}>
                {ingredientes.map((ingrediente: any, index: number) => {
                  return index + 1 + ". " + ingrediente + "\n";
                })}
              </Text>
              <Text style={styles.title}>Modo de Preparo</Text>
              <Text style={styles.ingredientes}>
                {modoPreparo.map((modo: any, index: number) => {
                  return index + 1 + ". " + modo + "\n";
                })}
              </Text>
            </SafeAreaView>
            <TouchableOpacity
              style={styles.back}
              onPress={() => {
                receita.navigation.goBack();
              }}
            >
              <Icon name="arrow-left" size={30} color="#543685" />
              <Text style={styles.title}>Voltar</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#c6a1ff",
    padding: 5,
    borderRadius: 10,
  },
  ingredientes: {
    fontSize: 15,
    color: "#b85e5e",
    padding: 5,
    borderRadius: 10,
  },
  imagem: {
    width: "100%",
    height: 200,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#eed8d8",
    padding: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 20,
    opacity: 0.9,
  },
  back: {
    backgroundColor: "#c6a1ff",
    display: "flex",
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    marginTop: 60,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
});

export default Details;

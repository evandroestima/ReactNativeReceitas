import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, Image } from "react-native";

const Details = (receita: any) => {
  const { nome, ingredientes, modoPreparo, imagem } =
    receita.route.params.receita;
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image style={styles.imagem} source={{ uri: imagem }} />
        <Text style={styles.title}>{nome}</Text>
        <Text style={styles.ingredientes}>
          {ingredientes.map((ingrediente: any) => {
            return ingrediente + "\n";
          })}
        </Text>
        <Text style={styles.title}>Modo de Preparo</Text>
        <Text style={styles.ingredientes}>
          {modoPreparo.map((modo: any) => {
            return modo + "\n";
          })}
        </Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ingredientes: {
    fontSize: 15,
    color: "#b85e5e",
  },
  imagem: {
    width: "100%",
    height: 200,
  },
});

export default Details;

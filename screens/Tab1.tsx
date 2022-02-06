import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootStore";

const Tab1 = () => {
   const {
      newJoke: { setup, delivery, joke },
   } = useSelector((state: RootState) => state.jokeReducer);
   console.log(setup, delivery, joke);
   const [jokeSetup, setJokeSetup] = useState<string | undefined>("");
   useEffect(() => {
      setJokeSetup(setup ? setup : joke);
   }, [setup, joke, delivery]);
   return (
      <View style={styles.container}>
         <Text>{jokeSetup}</Text>
         <Text>Tab 1</Text>
      </View>
   );
};

export default Tab1;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});

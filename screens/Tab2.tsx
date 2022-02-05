import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Tab2 = () => {
   return (
      <View style={styles.container}>
         <Text>Tab 2</Text>
      </View>
   );
};

export default Tab2;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Tabs from "./navigation/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItem,
   DrawerItemList,
} from "@react-navigation/drawer";

export default function App() {
   const Drawer = createDrawerNavigator();

   return (
      <NavigationContainer>
         <StatusBar hidden={false} />
         <Drawer.Navigator
            initialRouteName="Tabs"
            drawerContent={(props) => {
               return (
                  <DrawerContentScrollView {...props}>
                     <DrawerItemList {...props} />
                     <DrawerItem
                        label="show me a joke"
                        onPress={() => console.log("button clicked")}
                     />
                  </DrawerContentScrollView>
               );
            }}
         >
            <Drawer.Screen
               options={{ headerShown: false }}
               name="Home"
               component={Tabs}
            />
         </Drawer.Navigator>
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});

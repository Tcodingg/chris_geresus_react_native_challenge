import { StatusBar } from "expo-status-bar";
import Tabs from "./navigation/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItem,
   DrawerItemList,
} from "@react-navigation/drawer";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { getJoke } from "./redux/actions/actions";
import { useEffect } from "react";
import { RootState } from "./redux/rootStore";
import { schedulePushNotification } from "./screens/Tab1";

const AppWrapper = () => {
   return (
      <Provider store={store}>
         <App />
      </Provider>
   );
};

const App = () => {
   const Drawer = createDrawerNavigator();
   const dispatch = useDispatch();

   const {
      newJoke: { setup, joke, delivery },
   } = useSelector((state: RootState) => state.jokeReducer);

   // send push notification
   useEffect(() => {
      if (setup || joke) {
         schedulePushNotification(setup ? setup : joke);
      }
   }, [setup, joke, delivery]);

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
                        onPress={() => dispatch(getJoke())}
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
};

export default AppWrapper;

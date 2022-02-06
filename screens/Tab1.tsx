import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootStore";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { AntDesign } from "@expo/vector-icons";
import { closePunchline, openPunchline } from "../redux/actions/actions";

Notifications.setNotificationHandler({
   handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
   }),
});

interface navigationInterface {
   navigation: any;
}
const Tab1: React.FC<navigationInterface> = ({ navigation }) => {
   const {
      jokeReducer: {
         newJoke: { setup, delivery, joke },
      },
      punchlineReducer,
   } = useSelector((state: RootState) => state);
   console.log(setup, delivery, joke);
   const [jokePunchline, setJokePunchline] = useState<string | undefined>("");

   useEffect(() => {
      setJokePunchline(delivery ? delivery : joke);
   }, [setup, joke, delivery]);

   const dispatch = useDispatch();

   // ====notification setup starts ====//
   const [expoPushToken, setExpoPushToken] = useState<any>("");
   const [notification, setNotification] = useState<any>(false);
   const notificationListener = useRef<any>();
   const responseListener = useRef<any>();
   useEffect(() => {
      registerForPushNotificationsAsync().then((token) =>
         setExpoPushToken(token)
      );

      notificationListener.current =
         Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
         });

      responseListener.current =
         Notifications.addNotificationResponseReceivedListener((response) => {
            navigation.closeDrawer();
            navigation.navigate("Tab1");
            dispatch(openPunchline());
         });

      return () => {
         Notifications.removeNotificationSubscription(
            notificationListener.current
         );
         Notifications.removeNotificationSubscription(responseListener.current);
      };
   }, []);

   // ====notification setup ends ====//

   return (
      <View style={styles.container}>
         <View>
            <Text>Tab 1</Text>
         </View>
         {punchlineReducer && (
            <View style={[styles.punchlineContainer, { display: "flex" }]}>
               <View style={styles.punchlineWrapper}>
                  <Text style={styles.punchlineText}>{jokePunchline}</Text>
                  <TouchableOpacity
                     style={styles.closeIcon}
                     onPress={() => dispatch(closePunchline())}
                  >
                     <AntDesign name="closecircle" size={24} color="black" />
                  </TouchableOpacity>
               </View>
            </View>
         )}
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
      position: "relative",
   },
   punchlineContainer: {
      position: "absolute",
      backgroundColor: "white",
      height: 300,
      width: 300,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      paddingHorizontal: 10,
      shadowColor: "#000",

      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
   },
   punchlineWrapper: {
      height: "100%",
      width: "100%",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   punchlineText: {
      textAlign: "center",
   },
   closeIcon: {
      position: "absolute",
      right: 0,
      top: 10,
   },
});

export async function schedulePushNotification(jokeSetup: string | undefined) {
   await Notifications.scheduleNotificationAsync({
      content: {
         title: "Setup",
         body: jokeSetup,
      },
      trigger: { seconds: 2 },
   });
}

async function registerForPushNotificationsAsync() {
   let token;
   if (Device) {
      const { status: existingStatus } =
         await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
         const { status } = await Notifications.requestPermissionsAsync();
         finalStatus = status;
      }
      if (finalStatus !== "granted") {
         alert("Failed to get push token for push notification!");
         return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
   } else {
      alert("Must use physical device for Push Notifications");
   }

   return token;
}

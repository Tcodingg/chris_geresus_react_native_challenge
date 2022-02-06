import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootStore";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

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
      newJoke: { setup, delivery, joke },
   } = useSelector((state: RootState) => state.jokeReducer);
   console.log(setup, delivery, joke);
   const [jokeSetup, setJokeSetup] = useState<string | undefined>("");

   useEffect(() => {
      setJokeSetup(setup ? setup : joke);
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

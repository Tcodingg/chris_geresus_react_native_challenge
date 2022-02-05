import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import Tab1 from "../screens/Tab1";
import Tab2 from "../screens/Tab2";

const Tabs = () => {
   const Tab = createBottomTabNavigator();

   return (
      <Tab.Navigator>
         <Tab.Screen
            options={{ headerShown: false }}
            name="Tab1"
            component={Tab1}
         />
         <Tab.Screen
            options={{ headerShown: false }}
            name="Tab2"
            component={Tab2}
         />
      </Tab.Navigator>
   );
};

export default Tabs;

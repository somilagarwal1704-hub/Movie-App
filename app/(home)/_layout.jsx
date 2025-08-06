import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Tabs } from "expo-router";
import { SignOutIcon, UserIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, TouchableOpacity } from "react-native";
export default function Layout() {
  const [user, setUser] = useState("");
  useEffect(function () {
    AsyncStorage.getItem("user").then(function (user) {
      if (user) {
        setUser(user);
      } else {
        router.replace("/login");
      }
    });
  }, []);

  function handleOut() {
    AsyncStorage.removeItem("user").then(function () {
      router.replace("/login");
    });
  }
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,

        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          margin: 0,
        },
        tabBarStyle: {
          backgroundColor: "#030014",
          borderRadius: 50,
          marginHorizontal: 10,
          marginVertical: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0D23",
          paddingVertical: 0,
        },
        
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown:false,
          tabBarIcon: function ({ focused }) {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <MaterialCommunityIcons
                  name="home"
                  size={24}
                  color={focused ? "white" : "grey"}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Fav"
        options={{
          title: "Fav",
          headerShown:false,
          tabBarIcon: function ({ focused }) {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <MaterialCommunityIcons
                  name="heart"
                  size={24}
                  color={focused ? "white" : "grey"}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown:false,
          tabBarIcon: function ({ focused }) {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <MaterialCommunityIcons
                  name="magnify"
                  size={24}
                  color={focused ? "white" : "grey"}
                />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
}

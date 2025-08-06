import { Image, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import HomeMovieSection from "../../component/HomeMovieSection";
import WatchCard from "../../component/WatchCard";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bgImage from "./bg.png";
import logoIcon from "./logo.png";
import { ImageBackground } from "react-native";
import { SignOutIcon, UserIcon } from "phosphor-react-native";
import { router } from "expo-router";

export default function show() {
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
  const [favMovies, setFavMovies] = useState([]);

  useEffect(function () {
    AsyncStorage.getItem("fav-movies").then(function (data) {
      const storedFav = data ? JSON.parse(data) : [];
      setFavMovies(storedFav);
    });
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: "#030014",
      }}
    >
      <ImageBackground
        source={bgImage}
        style={{
          flex: 1,
          width: "100%",
          height: 200,
        }}
      >
        <View
          style={{ 
               alignItems: "center",
               position: "absolute",
               top:50,
          }}
        >
          <UserIcon size={28} color="white" />
          <Text style={{ marginLeft: 8 ,color:"white"}}>{user}</Text>
        </View>
        <TouchableOpacity
          onPress={handleOut}
          style={{
            position: "absolute",
            right: 10,
            top: 50,
          }}
        >
          <SignOutIcon
            size={28}
            style={{
              marginLeft: 10,
              padding: 0,
              color: "white",
            }}
          />
          <Text style={{ marginHorizontal: 5, color: "white" }}>Log out</Text>
        </TouchableOpacity>
        <Image
          source={logoIcon}
          style={{
            marginLeft: "42%",
            marginTop: "15%",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#AB8BFF",
              marginTop: 32.7,
              fontSize: 60,
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
          >
            M
          </Text>
          <Text
            style={{
              color: "#AB8BFF",
              marginTop: 42,
              fontSize: 50,
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
          >
            ooviHuB
          </Text>
        </View>
      </ImageBackground>

      <WatchCard term="avengers" />
      <HomeMovieSection
        favMovies={favMovies}
        setFavMovies={setFavMovies}
        type="Avengers"
        term="avengers"
      />
      <HomeMovieSection
        favMovies={favMovies}
        setFavMovies={setFavMovies}
        type="SuperMan"
        term="superman"
      />
      <HomeMovieSection
        favMovies={favMovies}
        setFavMovies={setFavMovies}
        type="Funny"
        term="golmaal"
      />
      <HomeMovieSection
        favMovies={favMovies}
        setFavMovies={setFavMovies}
        type="Thriller Movies"
        term="terminator"
      />
      <HomeMovieSection
        favMovies={favMovies}
        setFavMovies={setFavMovies}
        type="IronMan"
        term="iron"
      />
    </ScrollView>
  );
}

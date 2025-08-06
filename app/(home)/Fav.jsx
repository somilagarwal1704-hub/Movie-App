import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { FlatList, ImageBackground, ScrollView, Text, View } from "react-native";
import MoviesCard from "../../component/MoviesCard";
import { useFocusEffect } from "expo-router";
import bgImage from './bg.png';
export default function Favv(){
     const [favMovies,setFavMovies]=useState([]);

     useFocusEffect(function(){
     AsyncStorage.getItem("fav-movies")
     .then(function(data){
          const storedFav= data? JSON.parse(data) :[];
          setFavMovies(storedFav)
  });
});
     return(
          <View style={{
            backgroundColor:"#030014",
           paddingBottom:180,
           flex:1
          }}>
               <ImageBackground source={bgImage} style={{ 
                              flex:1,
                              width: '100%', 
                              height: 200 
                              }}>

               <View style={{
                    marginLeft:90,
                    gap:10,
                    marginTop:10,
               }}>
               <View><Text style={{
                    marginLeft:"14%",
                    marginVertical:"20",
                    fontSize:26,
                    fontWeight:"bold",
                    color:"#AB8BFF",
                    textDecorationLine:"underline",
                    fontStyle:"italic",
               }}>Favourites</Text></View>
       <FlatList
                      data={favMovies}
                      renderItem={function({item}){
                           return <MoviesCard item={item} favMovies={favMovies} setFavMovies={setFavMovies} />
                      }}
                      keyExtractor={favMovies.imdbID}
                      />
        </View>
        </ImageBackground>
        </View>
     )
}
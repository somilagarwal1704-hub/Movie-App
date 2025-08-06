import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import MoviesCard from "./MoviesCard"
import { useEffect, useState } from "react";

export default function WatchCard({term}){
     const [movies,setMovies]=useState([]);
     
          useEffect(function(){
               try{
               fetch(`https://www.omdbapi.com/?apikey=66ca4f5a&s=${term}`)
               .then(function(response){
                    response.json().then(function(data){
                         const result=data?.Search;
                         if(result){
                              setMovies(result)
                         }
                    })
               })
          }catch(err){
               setMovies([])
          }
          },[])
     return(
          <View style={{
               margin:10,
          }}>
          <ScrollView horizontal={true}>
          <View style={{
               flexDirection:"row",
               marginVertical:20,
               boxShadow:"0px 0px 20px 0px lightgrey "
          }}>
                {
                    movies.map(function(item){
                         return(
                               <View key={item.imdbID} style={{
                              width:400,
                              borderRadius:10,
                              gap:10,
                              margin:2,
                              flex:1,
                              
                               }}>
                            
                                   <Image src={item.Poster} style={{
                                    width:400,
                                    height:250,
                                    borderRadius:5, 
                                    }}/>
                                    </View>

                         )
                    })
               }
          </View>
          </ScrollView>

          <View style={{
               alignItems:"center",
               marginVertical:10,
          }}>
               <TouchableOpacity  style={{
                   backgroundColor: "blue",
                    paddingVertical: 12,
                    paddingHorizontal: 30,
                    borderRadius: 30,
               }}>
                    <Text style={{
                         color:"white",
                         fontSize:20,
                    }}
                    >Watch Now</Text>
                    </TouchableOpacity>
          </View>
          </View>
     )
}
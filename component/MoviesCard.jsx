import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { HeartIcon } from "phosphor-react-native";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";

export default function MoviesCard({item , favMovies  , setFavMovies}){
    const isFav=favMovies.find(function(movie){
     if(movie.imdbID==item.imdbID) return true;
    })
     function toggleLike(){
     if (isFav){
          const updatedArr=favMovies.filter(function(movie){
               if(movie.imdbID!=item.imdbID) return true;   
          })
           setFavMovies(updatedArr)
           AsyncStorage.setItem('fav-movies', JSON.stringify(updatedArr))
     }else{
          const arr =[...favMovies];
          arr.push(item);
          setFavMovies(arr)
          AsyncStorage.setItem('fav-movies', JSON.stringify(arr))
     }
    }
     return(
          <View style={{
                              width:200,
                              backgroundColor:"lightgrey",
                              padding:10,
                              borderRadius:10,
                              gap:10,
                              margin:2,
          
                         }}>
                              <Link href={`/movie/${item.imdbID}`}>
                              < View style={{
                                   width:"100%",
                              }}>
                                   <Image src={item.Poster} style={{
                                        width:"100%",
                                        height:250,
                                        borderRadius:5,
          
                                   }}/>
                                   </View>
                              </Link>
                                   <View style={{
                                        flexDirection:"row",
                                        width:"80%",
                                   }}>
                                        <View>
                                             <Text numberOfLines={1} style={{
                                                  fontWeight:"bold",
                                                  fontSize:18,
                                             }}>{item.Type}</Text>
                                             <Text numberOfLines={1} style={{
                                                  fontWeight:"bold",
                                                  fontSize:20
                                             }}>{item.Title}</Text>
                                        </View>
                                        
                                   </View>
          
                                   <View style={{
                                             position:"absolute",
                                             bottom:4,
                                             right:1,
                                        }}>
                                        <TouchableOpacity onPress={toggleLike}>
                                             <HeartIcon size={28} weight={isFav?"fill":"thin"} color="black" /></TouchableOpacity>
                                             </View>
                              
                         </View>
     )
}
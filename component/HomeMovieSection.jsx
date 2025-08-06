import { FlatList} from "react-native";
import { Text, View } from "react-native";
import MoviesCard from "./MoviesCard";
import { useEffect, useState } from "react";

export default function HomeMovieSection({type ,favMovies,setFavMovies,term}){
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
               marginVertical:10,
          }}>
               <Text style={{
                    marginHorizontal:20,
                    marginTop:10,
                    marginBottom:5,
                    fontSize:25,
                    color:"lightgrey",
                    fontWeight:"bold",
               }}>{type}</Text>
               {/* <ScrollView horizontal={true} style={{
                    marginHorizontal:10,
               }}>
                     {
                    movies.map(function(elem){
                         return <MoviesCard key={elem.imdbID} item={elem} favMovies={favMovies} setFavMovies={setFavMovies}/>
                    })
               }
               </ScrollView> */}
               <View style={{
                    marginLeft:10,
               }}>
               <FlatList
               horizontal
               data={movies}
               renderItem={function({item}){
                    return <MoviesCard item={item} favMovies={favMovies} setFavMovies={setFavMovies} />
               }}
               keyExtractor={(item)=> item.imdbID}
               />
               </View>
          </View>
     )
}
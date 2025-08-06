import { MagnifyingGlassIcon } from "phosphor-react-native";
import { useState } from "react";
import { ActivityIndicator, ImageBackground } from "react-native";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import bgImage from './bg.png';
import { Link } from "expo-router";
export default function Search(){
     const [input,setInput]=useState("");
     const [results,setResults]=useState([]);
      const [loading, setLoading] = useState(false)

     function handleSearch(){
          if(!input.trim()) return;

       try{
           setLoading(true)
             fetch(`https://www.omdbapi.com/?apikey=66ca4f5a&s=${input}`).then(function(res){
               res.json().then(function(data){
                    const searchResults=data?.Search;
                    if(searchResults){
                         setResults(searchResults)
                         setLoading(false)
                    }
               })
          })
       }catch(err){
          setResults([]);
       }
     }

     if(loading){
          return(
               <View style={{
                    flex:1,
                    alignItems:"center",
                    justifyContent:"center"
               }}>
                    <ActivityIndicator size={"large"}/>
               </View>
          )
     }

     function handleTextChange(value){
          setInput(value)
     }
     return(
          <View style={{
               backgroundColor:"#030014",
               flex:1,
               paddingBottom:150,

          }}>
               <ImageBackground source={bgImage} style={{ 
                              flex:1,
                              width: '100%', 
                              height: 200 
                              }}>
               <View style={{
                    height:90,
                    alignItems:"center",
                    justifyContent:"flex-end"
               }}><Text style={{
                    fontSize:25,
                    color:"#AB8BFF",
                    fontStyle:"italic",
                    textDecorationLine:"underline",
                    fontWeight:"bold",
               }}>Search</Text></View>
          <View style={styles.page}>
               <View style={{
                    borderWidth:1,
                    borderColor:"white",
                    borderRadius:30,
                    height:50,
                    justifyContent:"center"
               }}>
                    <View style={styles.inputContainer}>
            <TextInput placeholder="Search for movies..." style={styles.input} value={input}onChangeText={handleTextChange} ></TextInput>
            <TouchableOpacity onPress={handleSearch}><MagnifyingGlassIcon size={32} color="white" /></TouchableOpacity>
               </View>
               </View>
               {!loading && input?.trim() && results?.length >0 &&(
                    <Text style={{
                         color:"white"
                    }}>
                         Search Results for{''}
                         <Text style={{
                              color:"#AB8BFF",
                              fontWeight:"bold",
                              fontSize:20,
                         }}> {input}</Text>
                    </Text>
               )}
               
               <FlatList 
               numColumns={2}
               contentContainerStyle={{
                    gap:10
               }}
               columnWrapperStyle={{
                    gap:10
               }}
               data={results}
               renderItem={function({item}){
                    return (
                          <View style={{
                              flex:1,
                              backgroundColor:"lightgrey",
                              padding:10,
                              borderRadius:10,
                              gap:10,
                              margin:2,
          
                         }}>
                              <View>
                                   <Link href={`/movie/${item.imdbID}`}>
                                   <View style={{
                                        width:"100%"
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
          
                              </View>
                         </View>

     )    }}
     keyExtractor={function(item){
          return item.imdbID;
     }}
               />
          </View>
          </ImageBackground>
          </View>
          
     )
}

const styles=StyleSheet.create({
     page:{
          marginTop:10,
          gap:20,
          paddingHorizontal:10,
     },
     input:{
          
          backgroundColor:"white",
          height:40,
          flex:1,
          borderRadius:20,
          paddingHorizontal:10,


     },
     inputContainer:{
          flexDirection:"row",
          gap:5,
          alignItems:"center",
          paddingHorizontal:5,
     }
})
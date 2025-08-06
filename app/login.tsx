import { router } from "expo-router";
import { useState } from "react";
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const users=[
     {
     username : "somil1704",
     password : "95698"
     },
      {
     username : "karan6789",
     password : "95698"
     },
      {
     username : "saurabh8789",
     password : "95698"
     },
]
export default function Login(){
     const [userId,setUserId] =useState("");
     const [pass,setPass]=useState("");
     const [error,setError] =useState("");

     function handlePress(){
          if(!userId.trim() || !pass.trim()) return;

          const user= users.find(function(item){
               if((item.username== userId) && (item.password == pass)){
                    return true;
               }
          })
          if(user){
          AsyncStorage.setItem("user",user.username).then(function(){
          router.replace("/") 
          })
          
          } else{
               setError("Invalid Credentials")
          }
     }
     return(
          <ImageBackground src="https://www.mamamag.com.au/wp-content/uploads/2021/09/disney-1.jpg" style={{
               flex:1,
          }}>
               <Text style={{
                    fontSize:60,
                    color:"#00DFD8",
                    fontWeight:"bold",
                    textAlign:"center",
                    marginTop:50,
               }}>LOGIN</Text>
          <View style={{
               marginVertical:"25%",
               alignItems:"center",
          }}>
               <View style={{
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                    alignItems:"center",
                    borderRadius:20,
                    width:280,
                    height:380,
                    padding:20,
                    gap:20,
               }}>
          <View style={{
               alignItems:"center",
               padding:10,
               gap:15,
          }}>
               <Text style={{
                    fontSize:25,
                    fontWeight:"bold"
               }}>Username</Text>
               <TextInput placeholder="Enter Your Username" value={userId} onChangeText={setUserId} style={{
                    height:40,
                    backgroundColor:"white",
                    borderRadius:20,
                    width:220,
                    textAlign:"center"
               }}/>
                <Text style={{
                    fontSize:25,
                    fontWeight:"bold"
               }}>Password</Text>
               <TextInput placeholder="Enter Your Password" value={pass} onChangeText={setPass} style={{
                    height:40,
                    backgroundColor:"white",
                    borderRadius:20,
                    width:220,
                    textAlign:"center"
               }}/>
          </View>

          <TouchableOpacity onPress={handlePress} style={{
                 backgroundColor: "#AFA6E5",
                 borderRadius:30,
                 width:100,
                 height:50,
                 alignItems:"center",
                 justifyContent:"center"
          }}>
               <Text style={{
                    fontSize:20,
                    fontWeight:"bold",
               }}>Login</Text>
          </TouchableOpacity>

          {error && <Text style={{
               color:"red",
               textAlign:"center"
          }}>{error}</Text>}
          </View>
          </View>
          </ImageBackground>
     )
} 
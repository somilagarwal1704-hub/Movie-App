import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, View } from "react-native";
import bgImage from "./../(home)/bg.png";


export default function page() {
  const [details,setDetails]=useState({});
  const [loading, setLoading] = useState(false);

  const params = useLocalSearchParams();
  const id = params.movieId;

  useEffect(function(){
       setLoading(true)
       fetch(`https://www.omdbapi.com/?apikey=66ca4f5a&i=${id}`).then(function(response){
            response.json().then(function(data){
                 setDetails(data);
                 setLoading(false);
            })
       })
  },[])

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <ScrollView
      style={{
        backgroundColor: "#030014",
        marginBottom:20,
      }}
    >
       <ImageBackground
              source={bgImage}
              style={{
                flex: 1,
                width: "100%",
                height: 100,
              }}
            ></ImageBackground>
      
      <View
        style={{
          height: 400,
          boxShadow: "0px 0px 20px 0px lightgrey ",
          marginTop:20,
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
              <Image
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
          }}
          src={details?.Poster}
        />
            </ImageBackground>
        <Text style={{
          position:"absolute",
          color:"white",
          right:5,
          top:8,
          fontWeight:"600",
          }}>{details.imdbRating} ⭐</Text>
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          gap: 15,
        }}
      >
          <View>
        <Text
          style={{
            color: "red",
            fontSize: 28,
            fontWeight: "bold",
            
          }}
        >
          {details?.Title}
        </Text>
        <Text style={{color:"grey"}}>{details.Year} | {details.Runtime}</Text>
          </View>

     <Text style={{
          fontSize:23,
          fontWeight:"bold",
          color:"white",
     }}>Overview</Text>
        <Text
          style={{
            color: "white",
          }}
        >
          {details.Plot}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 18,
          }}
        >
          <Text style={{ fontWeight: "600" ,color:"grey"}}>Available in Languages:  </Text>
            {details.Language}
        </Text>
        <Text style={{
          fontSize:18,
          color:"grey",
          fontWeight:"bold",
        }}>Directed by : <Text style={{
          fontWeight:"400",
          color:"white",
        }}> {details.Director}</Text></Text>
        <Text style={{
          fontSize:18,
          color:"grey",
          fontWeight:"bold",
        }}>Actors : <Text style={{
          fontWeight:"400",
          color:"white",
        }}> {details.Actors}</Text></Text>
         <Text style={{
          fontSize:18,
          color:"grey",
          fontWeight:"bold",
        }}>Genre : <Text style={{
          fontWeight:"400",
          color:"white",
        }}> {details.Genre}</Text></Text>
      </View>
    </ScrollView>
  );
}

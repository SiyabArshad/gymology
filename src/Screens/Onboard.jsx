import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';

export default function Onboard({navigation}) {
  return (
    <View style={styles.mnonb}>
      <Image resizeMode='contain' style={{height:rp(35) ,width:"90%"}} source={require("../../assets/gymology.png")}/>
        <Text style={styles.desc}>
        Gymology a Platform for Gym Enthusiats.
        </Text>
        <Pressable onPress={()=>navigation.navigate("signup",{istrainer:true})} style={{width:200,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:colors.primary,borderRadius:10,marginVertical:5,paddingHorizontal:20,paddingVertical:10}}>
           <Text style={[styles.centertext,{fontFamily:fonts.Nregular,color:colors.white,fontSize:rp(2.2)}]}>Signup as a Trainer</Text>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate("login")} style={{width:200,display:"flex",alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:colors.black,borderRadius:10,marginVertical:5,paddingHorizontal:20,paddingVertical:10}}>
           <Text style={[styles.centertext,{fontFamily:fonts.Nregular,color:colors.white,fontSize:rp(2.2)}]}>Login as a Trainer</Text>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate("signup",{istrainer:false})} style={{width:200,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:colors.primary,borderRadius:10,marginVertical:5,paddingHorizontal:20,paddingVertical:10}}>
           <Text style={[styles.centertext,{fontFamily:fonts.Nregular,color:colors.white,fontSize:rp(2.2)}]}>Signup as a Trainee</Text>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate("login")} style={{width:200,display:"flex",alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:colors.black,borderRadius:10,marginVertical:5,paddingHorizontal:20,paddingVertical:10}}>
           <Text style={[styles.centertext,{fontFamily:fonts.Nregular,color:colors.white,fontSize:rp(2.2)}]}>Login as a Trainee</Text>
        </Pressable>
        
        
        
    </View>
  )
}

const styles=StyleSheet.create({
mnonb:{
    flex:1,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:colors.red
},
centertext:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
},
headtext:{
    fontSize:rp(6),
    fontFamily:fonts.Nextrabold
    ,color:colors.white
},
desc:{
    width:"70%",
    marginVertical:rp(3),

    textAlign:"center",
    color:colors.white,
    fontFamily:fonts.Nlight,
    fontSize:rp(3)
},
btn:{
    backgroundColor:colors.white,
    marginTop:rp(3),
    height:60,
    width:60,
    borderRadius:30
}
})
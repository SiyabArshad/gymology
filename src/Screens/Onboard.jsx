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
        <Pressable 
        onPress={
          ()=>navigation.navigate("signup",{istrainer:false})
        } 
        style={[styles.centertext,styles.btn]}>
        <IonicIcon name="arrow-forward" size={30} color={colors.primary} />
        </Pressable>
        <Pressable 
        onPress={
          ()=>navigation.navigate("signup",{istrainer:true})
        }
        style={{marginTop:rp(4)}}>
          <Text style={[styles.centertext,{fontFamily:fonts.Nregular,color:colors.white,fontSize:rp(2.6)}]}>Continue as a Trainer</Text>
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
    marginTop:rp(3),
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
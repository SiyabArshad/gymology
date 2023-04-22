import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList,SafeAreaView } from 'react-native'
import React from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessageCard from '../Components/MessageCard';
const hi=Dimensions.get("window").height
import ProfileView from '../Components/ProfileView';
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,getDoc, updateDoc,serverTimestamp} from "firebase/firestore"
import app from '../configs/firebase';
import { useAuth } from '../context/Authemtication';
import TrainerHome from '../Components/TrainerHome';
import StudentHome from '../Components/StudentHome';
export default function Home() {
  const db=getFirestore(app)
  const auth=getAuth(app)
  const {logout,user}=useAuth()
 
  return (
    <SafeAreaView style={styles.mnonb}>
      {
        user.trainer?<TrainerHome/>:<StudentHome/>
      }
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  mnonb:{
      flex:1,
      paddingTop:20,
      marginBottom:10
  },
  centertext:{
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
  },
  btn:{
      backgroundColor:colors.primary,
      paddingHorizontal:5,
      paddingVertical:4,
      borderRadius:5
  },
  text1:{
    color:colors.primary,
    fontFamily:fonts.Nextrabold,
    fontSize:rp(5),
    marginTop:rp(2)
  },
  text2:{
      color:colors.textgrey,
      fontFamily:fonts.Nmedium,
      fontSize:rp(2.5)
  },
  lable:{
      fontFamily:fonts.Nregular,
      fontSize:rp(3.5),
      color:colors.textgrey
  }
})
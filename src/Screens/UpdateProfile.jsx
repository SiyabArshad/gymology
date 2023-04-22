import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React,{useState} from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessageCard from '../Components/MessageCard';
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,getDoc, updateDoc,serverTimestamp} from "firebase/firestore"
import app from '../configs/firebase';
import { useAuth } from '../context/Authemtication';
import moment from 'moment';

export default function UpdateProfile({navigation}) {
  const db=getFirestore(app)
  const auth=getAuth(app)
  const {logout,user}=useAuth()
  const updateDocument = async (collectionName, documentId, updatedFields) => {
    const documentRef = doc(db, collectionName, documentId);
    try {
      await updateDoc(documentRef, updatedFields);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  
    const[desc,setdesc]=React.useState("")
    const[from,setfrom]=React.useState("")
    const [isload,setisload]=React.useState(false)
    const [issubmit,setissubmit]=React.useState(false)
    const [Error,setError]=React.useState('')
    const [type,settype]=React.useState(false)
    const handleform=async()=>{
        setisload(true)
        try{
                await updateDocument("users",user.userid,{availabletime:from,description:desc})
                setError("Updated Successfully")
                settype(true)
                 }
        catch(e){
            setError("Try again later")
            settype(false)
           
        }
        setissubmit(true)
        setisload(false)
    }
    const callbacksubmit=()=>{
        setissubmit(false)
    }

  return (
    <View style={styles.mnonb}>
         <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit}/>
     <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:rp(5)}}>
        <Pressable onPress={()=>navigation.pop()} style={styles.btn}>
        <IonicIcon name="arrow-back" size={24} color={colors.white} />
        </Pressable>
        <Text style={{fontSize:rp(2.8),fontFamily:fonts.Nbold}}>Edit Description</Text>
        <Text></Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>    

    <View style={{marginVertical:rp(3)}}>
        <Text style={{fontSize:rp(3),color:colors.black,fontFamily:fonts.Nextrabold}}>Profile info</Text>
        <View style={{marginTop:rp(8),marginHorizontal:rp(2)}}>
    
     <View style={{marginBottom:rp(7)}}>
        <Text style={styles.lable}>Description</Text>
        <TextInput value={desc} onChangeText={(e)=>setdesc(e)} style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1.2),paddingVertical:rp(.6),color:colors.black,fontFamily:fonts.Rregular}}/>
     </View>

  {
    user.trainer&&   <View style={{marginBottom:rp(7)}}>
    <Pressable><Text style={styles.lable}>Set Availability</Text></Pressable>
    <TextInput  value={from} onChangeText={(e)=>setfrom(e)} style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1.2),paddingVertical:rp(.6),color:colors.black,fontFamily:fonts.Rregular}}/>
   
    </View>
  }
     </View>
    </View>
    <Pressable disabled={issubmit} onPress={handleform} style={[{backgroundColor:colors.black,marginBottom:rp(8),paddingHorizontal:rp(2),paddingVertical:rp(2),borderRadius:rp(3)},styles.centertext]}>
        {
            isload?
            <ActivityIndicator size={30} color={colors.white}/>
            :
            <Text style={{color:colors.white,fontFamily:fonts.Nbold,fontSize:rp(2),textTransform:"uppercase"}}>Update</Text>
        
        }
    </Pressable>
    </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
    mnonb:{
        flex:1,
        backgroundColor:colors.white,
        paddingHorizontal:rp(3)
    },
    centertext:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },
    btn:{
        backgroundColor:colors.black,
        paddingHorizontal:5,
        paddingVertical:4,
        borderRadius:5
    },
})
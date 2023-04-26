import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList,SafeAreaView } from 'react-native'
import React from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessageCard from './MessageCard';
const hi=Dimensions.get("window").height
import Review from './Review';
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,getDoc, getDocs,collection,query,where,orderBy,updateDoc,serverTimestamp,GeoPoint} from "firebase/firestore"
import app from '../configs/firebase';
import { useAuth } from '../context/Authemtication';
import Loading from "./Loading"
import { useIsFocused } from '@react-navigation/native';

export default function TrainerSessions() {
  const focused=useIsFocused()  
  const db=getFirestore(app)
  const auth=getAuth(app)
  const {logout,user}=useAuth()
  const[id,setid]=React.useState(null)
  const updateDocument = async (collectionName, documentId, updatedFields) => {
    const documentRef = doc(db, collectionName, documentId);
    try {
      await updateDoc(documentRef, updatedFields);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  const [isbtnload,setisbtnload]=React.useState(false)
  const [Availablesessions,setAvailablesessions]=React.useState([])
    const [isload,setisload]=React.useState(false)
    const [issubmit,setissubmit]=React.useState(false)
    const [Error,setError]=React.useState('')
    const [type,settype]=React.useState(false)
    const [visible,setisvisible]=React.useState(false)
  
const callbacksubmit=()=>{
    setissubmit(false)
}
const closefunc=()=>{
  setisvisible(false)
}
const openmodalprofile=(id)=>{
  setisvisible(true)
  setid(id)
}
const getAvailablesessions = async (user) => {
  setisload(true);
  try {
    const sessionsRef = collection(db, "sessions");
    const querySnapshot = await getDocs(query(sessionsRef, where("trainerId", "==", doc(db, "users", user.userid)), where("state", "==", "active")));
    const availableTrainers = [];
    for (const doc of querySnapshot.docs) {
      const trainer = doc.data();
      const trainerDoc = await getDoc(trainer.studentId);
      const userData = trainerDoc.data();
      const sessioninfo = {
        sessionid:doc.id,
        trainer,
        userData
      };
      availableTrainers.push(sessioninfo);
    }
    setAvailablesessions(availableTrainers);
  } catch (error) {
    console.error(error);
  } finally {
    setisload(false);
  }
};

//decline request
const endclass=async(id)=>{
  setisbtnload(true)
  try{
    await updateDocument("sessions",id,{isEnd:true})
    setError("Class Ended")
    settype(true)
  }
  catch(e){
    setError("Failed")
    settype(false)
  }
  setisbtnload(false) 
  setissubmit(true)
}


//end

//leave a review
const leaveareview=async(id,rev)=>{
  setisbtnload(true)
  try{
    await updateDocument("sessions",id,{trainerreview:rev})
    setError("Review Added")
    settype(true)
  }
  catch(e){
    console.log(e)
    setError("Failed")
    settype(false)
  }
  setisbtnload(false) 
  setissubmit(true)
}


//end
React.useEffect(()=>{
  getAvailablesessions(user)
},[focused,isbtnload])
if(isload)
{
  return <Loading/>
}
  return (
    <SafeAreaView style={{flex:1}}>
        <Review visible={visible} close={closefunc} id={id} updaterev={leaveareview}/>
           <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit}/>
           <View style={{paddingHorizontal:rp(3)}}>
           <Text style={styles.text1}>
       {" "}GYMOLOGY
     </Text>
           </View>
     <View style={{paddingHorizontal:rp(3),paddingVertical:rp(2)}}>
      <View style={{marginBottom:rp(2),display:"flex",flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity style={{display:"flex",flexDirection:'row',justifyContent:"center",alignItems:"center",marginRight:10,paddingHorizontal:10,paddingVertical:5,borderBottomWidth:2,borderBottomColor:colors.primary}}>
          <Text style={{fontFamily:fonts.Nregular,fontSize:18}}>Classes With Trainers</Text>
        </TouchableOpacity>
     
      </View>
      <ScrollView style={{height:hi/1.4,paddingBottom:100}} showsVerticalScrollIndicator={false}>
       { 
       Availablesessions.length===0||Availablesessions===undefined?<Text>No Request Found</Text>:
         Availablesessions&&Availablesessions.map((item,i)=>(
          <View key={i} style={{borderWidth:1,borderColor:colors.primary,borderRadius:5,paddingHorizontal:15,paddingVertical:10,marginBottom:10}}>
           
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
              <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Name</Text>
              <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>{item?.userData?.name}</Text>
            </View>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
              <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Address</Text>
              <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>{item?.userData?.address}</Text>
            </View>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
              <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Phone</Text>
              <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>{item?.userData?.phone}</Text>
            </View>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
              <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Status</Text>
              <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>{item?.trainer?.isEnd?"Ended":"Running"}</Text>
            </View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:rp(2)}}>
                {
                  item?.trainer?.isEnd&&item?.trainer?.trainerreview===''&&<TouchableOpacity onPress={()=>{
                    openmodalprofile(item.sessionid)
                    
                  }
                  }  style={{width:"49%",backgroundColor:colors.primary,paddingVertical:rp(1),borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                  {
                    isbtnload?<ActivityIndicator size={24} color={colors.white}/>: <Text style={{color:colors.white,fontFamily:fonts.Nblack}}>Review Class</Text>
                  }
                </TouchableOpacity>
}
{
           item?.trainer?.isEnd===false&&
                <TouchableOpacity onPress={()=>endclass(item.sessionid)} style={{width:"49%",backgroundColor:colors.primary,paddingVertical:rp(1),borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                   {
                    isbtnload?<ActivityIndicator size={24} color={colors.white}/>: <Text style={{color:colors.white,fontFamily:fonts.Nblack}}>End Class</Text>
                  }
                </TouchableOpacity>
                }
                {
           item?.trainer?.isEnd===true&&
                <TouchableOpacity  style={{width:"49%",backgroundColor:colors.primary,paddingVertical:rp(1),borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                   {
                    isbtnload?<ActivityIndicator size={24} color={colors.white}/>: <Text style={{color:colors.white,fontFamily:fonts.Nblack}}>Payment</Text>
                  }
                </TouchableOpacity>
                }
            </View>
      </View>
        ))

       }
        </ScrollView>    
     </View>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  mnonb:{
      flex:1,
      backgroundColor:colors.white
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
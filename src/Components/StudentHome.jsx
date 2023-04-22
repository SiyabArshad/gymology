import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList,SafeAreaView } from 'react-native'
import React from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessageCard from './MessageCard';
const hi=Dimensions.get("window").height
import ProfileView from './ProfileView';
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,getDoc, getDocs,collection,query,where,orderBy,updateDoc,serverTimestamp,GeoPoint} from "firebase/firestore"
import app from '../configs/firebase';
import { useAuth } from '../context/Authemtication';
import Loading from "./Loading"
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function StudentHome() {
  const focused=useIsFocused()  
  const db=getFirestore(app)
    const auth=getAuth(app)
    const {logout,user}=useAuth()
      const [isload,setisload]=React.useState(false)
      const [isbtnload,setisbtnload]=React.useState(false)
      const [btnid,setbtnid]=React.useState(-1)
      const [issubmit,setissubmit]=React.useState(false)
      const [Error,setError]=React.useState('')
      const [type,settype]=React.useState(false)
      const [visible,setisvisible]=React.useState(false)
      const [AvailableTrainer,setAvailableTrainer]=React.useState([])
      const [profiledata,setprofiledata]=React.useState(null)
      const [tab,settab]=React.useState("home")
      const [exercises,setexercises]=React.useState([])
  const callbacksubmit=()=>{
      setissubmit(false)
  }
  const closefunc=()=>{
    setisvisible(false)
  }
  const openmodalprofile=(item)=>{
    setisvisible(true)
    setprofiledata(item)
  }
  const getAvailableTrainers = async (user) => {
    setisload(true)
    try {
      const q = query(collection(db, "users"), where("trainer", "==", true), where("address", "==", user.address));
      const querySnapshot = await getDocs(q);
      const availableTrainers = [];
      querySnapshot.forEach((doc) => {
        const trainer = doc.data();
        trainer.id = doc.id;
        availableTrainers.push(trainer);
      });
      setAvailableTrainer(availableTrainers);
      await getExerciseList()
     } catch (error) {
      console.log(error);
    }
    setisload(false)
  };
  //post a request to trainer
  const createSession = async (trainerId, userId,id) => {
    setbtnid(id)
    setisbtnload(true);
    try {
      // const sessionsRef = collection(db, "sessions");
      // const querySnapshot = await getDocs(query(sessionsRef, where("trainerId", "==", doc(db, "users", trainerId)), where("studentId", "==", doc(db, "users", userId)), where("state", "in", ["pending", "active"])));
      // if (querySnapshot.size > 0) {
      //   setError("Session already exists with this trainer");
      //   settype(false);
      // } else {

        const trainerDocRef = doc(db, "users", trainerId);
        const userDocRef = doc(db, "users", userId);
        const sessionData = {
          trainerId: trainerDocRef,
          studentId: userDocRef,
          state: "pending",
          date: serverTimestamp(),
          isEnd: false,
          trainerreview:"",
          studentreview:""
        };
        await addDoc(collection(db, "sessions"), sessionData);
        setError("Request Sent");
        settype(true);
      // }
    } catch (error) {
      setError("Failed to Request");
      settype(false);
    }
    setisbtnload(false);
    setissubmit(true);
  };
  
  

  //end
  const getExerciseList = async () => {
    const options = {
      method: 'GET',
      url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
      params: {muscle: 'biceps'},
      headers: {
        'X-RapidAPI-Key': '89d9015bd8msh1a942f0cc8a330bp1f90fcjsn2d4ba612063c',
        'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      setexercises(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }
  React.useEffect(()=>{
    getAvailableTrainers(user)
  },[focused])
  if(isload)
  {
    return <Loading/>
  }
  if(visible)
  {
    return <ProfileView visible={visible} close={closefunc} data={profiledata}/>;
  }
  return (
    <SafeAreaView style={{flex:1}}>
        
           <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit}/>
           <View style={{paddingHorizontal:rp(3)}}>
           <Text style={styles.text1}>
       {" "}GYMOLOGY
     </Text>
           </View>
     <View style={{paddingHorizontal:rp(3),paddingVertical:rp(2)}}>
      <View style={{marginBottom:rp(2),display:"flex",flexDirection:"row",alignItems:"center"}}>
      <TouchableOpacity onPress={()=>settab("home")} style={{display:"flex",flexDirection:'row',justifyContent:"center",alignItems:"center",marginRight:10,paddingHorizontal:10,paddingVertical:5,borderBottomWidth:tab==='home'?2:0,borderBottomColor:tab==='home'?colors.primary:""}}>
          <Text style={{fontFamily:fonts.Nregular,fontSize:18}}>{"Home"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>settab("request")} style={{display:"flex",flexDirection:'row',justifyContent:"center",alignItems:"center",marginRight:10,paddingHorizontal:10,paddingVertical:5,borderBottomWidth:tab==='request'?2:0,borderBottomColor:tab==='request'?colors.primary:""}}>
          <Text style={{fontFamily:fonts.Nregular,fontSize:18}}>{"Available Trainer"}</Text>
        </TouchableOpacity>
      </View>
      {
         tab==="home"?
         <ScrollView style={{height:hi/1.4,paddingBottom:100}} showsVerticalScrollIndicator={false}>
           {
             exercises&&exercises.map((item,i)=>(
               <View style={{backgroundColor:i%2===0?colors.green:colors.red,marginBottom:5,paddingHorizontal:15,paddingVertical:10,borderRadius:10}}>
                 <Text style={{fontFamily:fonts.Nregular,marginBottom:5,fontSize:20,color:colors.white}}>{item?.name}</Text>
                 <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
                   <Text style={{fontFamily:fonts.Nblack,marginBottom:5,fontSize:16,color:colors.white}}>Difficulty</Text>
                   <Text style={{fontFamily:fonts.Nregular,marginBottom:5,fontSize:16,color:colors.white}}>{item?.difficulty}</Text>
                 </View>
                 <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
                   <Text style={{fontFamily:fonts.Nblack,marginBottom:5,fontSize:16,color:colors.white}}>Muscle</Text>
                   <Text style={{fontFamily:fonts.Nregular,marginBottom:5,fontSize:16,color:colors.white}}>{item?.muscle}</Text>
                 </View>
                 <View>
                 <Text style={{fontFamily:fonts.Nblack,marginBottom:5,fontSize:16,color:colors.white}}>Instructions</Text>
                 <Text style={{color:colors.white,fontFamily:fonts.Nregular}}>{item?.instructions}</Text>
                 </View>
               </View>
             ))
           }
          </ScrollView> :
      <ScrollView style={{height:hi/1.4,paddingBottom:100}} showsVerticalScrollIndicator={false}>
       {
        AvailableTrainer.length===0||AvailableTrainer===undefined?<Text>No Record Found</Text>:
        AvailableTrainer?.map((item,i)=>(
          <View key={i} style={{borderWidth:1,borderColor:colors.primary,borderRadius:5,paddingHorizontal:15,paddingVertical:10,marginBottom:10}}>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
              <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}></Text>
            <TouchableOpacity onPress={()=>{
              openmodalprofile(item)
 
              }}>
              <IonicIcon name='eye' size={30} color={colors.primary}/>
            </TouchableOpacity>
            </View>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
              <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Name</Text>
              <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>{item?.name}</Text>
            </View>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
              <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Address</Text>
              <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>{item?.address}</Text>
            </View>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
              <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Phone</Text>
              <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>{item?.phone}</Text>
            </View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",marginVertical:rp(2)}}>
                <TouchableOpacity onPress={()=>createSession(item.userid,user.userid,i)} style={{width:"49%",backgroundColor:colors.primary,paddingVertical:rp(1),borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                  {
                    isbtnload&&btnid===i?<ActivityIndicator size={24} color={colors.white}/>: <Text style={{color:colors.white,fontFamily:fonts.Nblack}}>Request</Text>
                  }
                 
                </TouchableOpacity>
            </View>
      </View>
        ))

       }
        </ScrollView>   
} 
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
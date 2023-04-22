import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,getDoc, getDocs,collection,query,where,updateDoc,serverTimestamp} from "firebase/firestore"
import app from '../configs/firebase';
import { useAuth } from '../context/Authemtication';
import Loading from '../Components/Loading';
import { useIsFocused } from '@react-navigation/native';

export default function Inbox({navigation}) {
    const focused=useIsFocused()
    const [isload,setisload]=React.useState(false)
    const db=getFirestore(app)
    const auth=getAuth(app)
    const {logout,user}=useAuth()
    const [contacts,setcontacts]=React.useState(null)
    const getcontactlist=async()=>{
        setisload(true)
        if(user?.trainer)
        {
          try{
            const q = query(collection(db, 'sessions'), 
            where('isEnd', '==', false),
            where("trainerId", "==", doc(db, "users", user?.userid)),
            where('state', '==', "active"),
          );
          const querySnapshot = await getDocs(q);
          const pendingSessions = [];
          const allPromises = querySnapshot.docs.map(async (doc) => {
            const sessionData = doc.data();
            const studentIdRef = sessionData.studentId;
            // Get the student document data
            const studentDoc = await getDoc(studentIdRef);
            const studentData = studentDoc.data();
            let sessioninfo={
              id:doc?.id,
              datainfo:studentData
            }
            // Push the session data object to the pendingSessions array
            pendingSessions.push(sessioninfo);
          });
          await Promise.all(allPromises);
          setcontacts(pendingSessions);
          }
          catch{
      
          }
        }
        else
        {
          try{
            const q = query(collection(db, 'sessions'), 
            where('isEnd', '==', false),
            where("studentId", "==", doc(db, "users", user?.userid)),
            where('state', '==', "active"),
          );
          const querySnapshot = await getDocs(q);
          const pendingSessions = [];
          const allPromises = querySnapshot.docs.map(async (doc) => {
            const sessionData = doc.data();
            const studentIdRef = sessionData.trainerId;
            // Get the student document data
            const studentDoc = await getDoc(studentIdRef);
            const studentData = studentDoc.data();
            let sessioninfo={
              id:doc?.id,
              datainfo:studentData
            }
            // Push the session data object to the pendingSessions array
            pendingSessions.push(sessioninfo);
          });
          await Promise.all(allPromises);
          setcontacts(pendingSessions);
          }
          catch{
      
          }
        }
        setisload(false)
    }
    React.useEffect(()=>{
        getcontactlist()
    },[focused])
    if(isload)
    {
        return <Loading/>
    }
  return (
    <View style={styles.mnonb}>
    <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:rp(5)}}>
       <Text style={{fontSize:rp(5),fontFamily:fonts.Nextrabold}}>Inbox</Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
        {
            contacts&&contacts.map((item,i)=>(
                <TouchableOpacity onPress={()=>navigation.navigate("chat",{chatdata:item})} key={i} style={{display:"flex",flexDirection:"row",justifyContent:"space-between",borderWidth:1,borderColor:colors.black,paddingHorizontal:5,paddingVertical:10,borderRadius:10,marginBottom:rp(1)}}>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <View style={{height:50,width:50,borderRadius:25,backgroundColor:colors.primary,display:"flex",alignItems:"center",justifyContent:"center"}}><Text style={{color:colors.white,textTransform:"uppercase"}}>{item?.datainfo?.name[0]?.toUpperCase()}</Text></View>
            <View style={{marginLeft:rp(2)}}>
                <Text style={{color:colors.textgrey2,fontSize:rp(2.3),fontFamily:fonts.Nbold}}>{item?.datainfo?.name}</Text>
                <Text style={{fontFamily:fonts.Nmedium,color:colors.black}}>Message</Text>
            </View>
            </View>
        </TouchableOpacity>
            ))
        }
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
import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as Re from "react-native-elements"
import MessageCard from '../Components/MessageCard';
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,getDoc, collection,query,getDocs,serverTimestamp,updateDoc} from "firebase/firestore"
import { ref,getDownloadURL,getStorage, uploadBytes  } from "firebase/storage"
import app from '../configs/firebase';
import { useAuth } from '../context/Authemtication';
import userimaeg from "../../assets/user.png"
import * as ImagePicker from 'expo-image-picker';
import Loading from "../Components/Loading"
import { useIsFocused } from '@react-navigation/native';

export default function Profile({navigation}) {
  const focused=useIsFocused()  
  const db=getFirestore(app)
  const auth=getAuth(app)
  const storage = getStorage(app);
  const {logout,user}=useAuth()
  const [image, setImage] = React.useState(null);
  const [isload,setisload]=React.useState(false)
  const [profiledata,setprofiledata]=React.useState(null)
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const imageUri = result.uri;
      const userId = user.userid;
      const storageRef = ref(storage,'gymology/' + userId + "profile +image1"+new Date().toLocaleString());
            const img = await fetch(result.uri);
            const bytes = await img.blob();
            uploadBytes(storageRef, bytes)
            .then(snapshot => {
                return getDownloadURL(snapshot.ref)
            })
            .then(async(downloadURL) => {
                await updateDoc(doc(db, "users",userId), {
                    profilepic: downloadURL,
                  });
            }).catch((e)=>{
              console.log(e)
                alert("upload failed")
            })
      setImage(imageUri);
    }
  };

  React.useEffect(() => {
    setisload(true);

    // Retrieve data from Firestore using user ID as filter
    const firestore = getFirestore();
    const userRef = doc(firestore, 'users', user.userid);
    getDoc(userRef)
      .then(doc => {
        if (doc.exists()) {
          setprofiledata(doc.data());
        } else {
        }
      })
      .catch(error => {
        console.error('Error retrieving user data:', error);
      })
      .finally(() => {
        setisload(false);
      });
  }, [focused]);
  
if(isload)
{
  return <Loading/>
}
  return (
    <View style={styles.mnonb}>
      <View style={[styles.centertext,{marginTop:rp(4)}]}>
          <TouchableOpacity onPress={pickImage}>
          <Image style={{height:80,width:80,borderRadius:40}} source={profiledata?.profilepic!==''&&profiledata?.profilepic!==undefined?{uri:profiledata?.profilepic}:userimaeg}/>
          </TouchableOpacity>
          <Text style={{color:colors.black,fontFamily:fonts.Nextrabold,fontSize:rp(3),marginTop:rp(1)}}>{user.name}{user.trainer&&"(Trainer)"}</Text>
          <Text style={{color:colors.black,fontFamily:fonts.Nregular}}>{user.email}</Text>
          <Text style={{color:colors.black,fontFamily:fonts.Nregular,width:"60%",textAlign:"center"}}>{profiledata?.description===''?'Set your Description':profiledata?.description}</Text>
          {
            user.trainer&&<Text style={{color:colors.black,fontFamily:fonts.Nextrabold,width:"80%",textAlign:"center"}}>{profiledata?.availabletime===''?"Set Availability":`Available from ${profiledata?.availabletime}`}</Text>
          }
      </View>
      <View style={{marginTop:rp(2)}}>
            <Pressable onPress={()=>navigation.navigate("edit")} style={{backgroundColor:colors.black,paddingHorizontal:rp(2),paddingVertical:rp(1.3),borderRadius:rp(1),marginBottom:rp(1),display:"flex",flexDirection:"row",alignItems:"center"}}>
            <FIcon name="edit" size={20} color={colors.white} />
              <Text style={{color:colors.white,fontSize:rp(2.3),fontFamily:fonts.Nmedium,marginLeft:rp(2)}}>Edit Description</Text>
            </Pressable>
            <Pressable onPress={()=>navigation.navigate("gym")} style={{backgroundColor:colors.black,paddingHorizontal:rp(2),paddingVertical:rp(1.3),borderRadius:rp(1),marginBottom:rp(1),display:"flex",flexDirection:"row",alignItems:"center"}}>
            <MIcon name="dumbbell" size={20} color={colors.white} />
              <Text style={{color:colors.white,fontSize:rp(2.3),fontFamily:fonts.Nmedium,marginLeft:rp(2)}}>Near By Gyms</Text>
            </Pressable>
            <Pressable onPress={()=>logout()} style={{backgroundColor:colors.black,paddingHorizontal:rp(2),paddingVertical:rp(1.3),borderRadius:rp(1),marginBottom:rp(1),display:"flex",flexDirection:"row",alignItems:"center"}}>
            <MaterialIcon name="logout" size={20} color={colors.white} />
              <Text style={{color:colors.white,fontSize:rp(2.3),fontFamily:fonts.Nmedium,marginLeft:rp(2)}}>Logout</Text>
            </Pressable>
         </View>
    </View>
  )
}

const styles=StyleSheet.create({
    mnonb:{
        flex:1,
        backgroundColor:colors.white,
        paddingHorizontal:rp(3),
        paddingVertical:rp(5)
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
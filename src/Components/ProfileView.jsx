import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,StatusBar,ScrollView,FlatList } from 'react-native'
import React from 'react'
import colors from '../configs/colors';
import fonts from '../configs/fonts';
import Icon1 from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/Foundation"
import { Avatar } from 'react-native-elements';
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,getDoc, getDocs,collection,query,where,orderBy,updateDoc,serverTimestamp,GeoPoint} from "firebase/firestore"
import app from '../configs/firebase';
import { useAuth } from '../context/Authemtication';
import Loading from "./Loading"
export default function ProfileView({visible,close,data}) {
  const db = getFirestore(app);
  const [isLoading, setIsLoading] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const getReviews = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, 'sessions'),
        where('isEnd', '==', true),
        data.trainer
          ? where('trainerId', '==', doc(db, 'users', data.userid))
          : where('studentId', '==', doc(db, 'users', data.userid)),
      );
      const querySnapshot = await getDocs(q);
      const pendingSessions = [];
      const allPromises = querySnapshot.docs.map(async (doc) => {
        const sessionData = doc.data();
        const studentIdRef = data.trainer ? sessionData.studentId : sessionData.trainerId;
        const studentDoc = await getDoc(studentIdRef);
        const studentData = studentDoc.data();
        let sessioninfo = {
          review: data.trainer ? sessionData?.studentreview : sessionData?.trainerreview,
          name: studentData?.name,
        };
        pendingSessions.push(sessioninfo);
      });
      await Promise.all(allPromises);
      setReviews(pendingSessions);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    getReviews();
  }, []);
  if (isLoading) {
    return <Loading />;
  }

return (

    <Modal transparent visible={visible} >
        <StatusBar/>
           <View style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.5)"}}>
            <View style={{height:500,width:"90%",borderRadius:10,backgroundColor:colors.white,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {
                data?.profilepic===''||data?.profilepic===undefined?<View style={{height:60,width:60,borderRadius:30,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:colors.primary}}><Text style={{color:colors.white,fontSize:21}}>{data&&data?.name[0].toUpperCase()}</Text></View>:<Avatar rounded size='xlarge' source={{uri:data?.profilepic}}/>
              }
                <Text style={{fontSize:22,marginVertical:5,fontFamily:fonts.Nextrabold}}>{data&&data.name}</Text>
                <Text style={{width:"70%",textAlign:"center",fontFamily:fonts.Nregular,marginBottom:5}}>
                   {data&&data.description!==''?data.description:"No description"}
                </Text>
                {
                  data&&data.trainer && <Text  style={{width:"70%",textAlign:"center",fontFamily:fonts.Nbold,marginBottom:5}}>{data&&data.availabletime}</Text>
                }
              <View style={{height:150,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:10}}>
              <FlatList
    style={{marginTop:10}}
    showsHorizontalScrollIndicator={false}
    horizontal
    data={reviews&&reviews}
    // keyExtractor={(item) => item.toString()}
    renderItem={({item,i}) => (
        <View key={i} style={{height:130, width:250, paddingHorizontal:15, paddingVertical:15,display:"flex",alignItems:"center",justifyContent:"center" ,overflow:"hidden", backgroundColor:colors.primary, marginHorizontal:10, borderRadius:10}}>
             <Text style={{color:colors.white, fontFamily:fonts.Nblack, marginBottom:5}}>{item?.name}</Text>
            <Text style={{color:colors.white, fontFamily:fonts.Nregular}}>{item?.review}</Text>
        </View>
    )}
/>
              </View>
              <TouchableOpacity onPress={close} style={{position:"absolute",top:10,right:10}}><Icon1 name='ios-eye-off' size={30} color={colors.primary}/></TouchableOpacity>
            </View>
          
            </View>
    </Modal>
  )
}
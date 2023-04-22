import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { BottomSheet, Button, ListItem } from "react-native-elements"
import { GiftedChat,Bubble,BubbleProps,InputToolbar,Send,Composer } from 'react-native-gifted-chat';
import {doc,setDoc,getFirestore, addDoc,getDoc, collection,query,orderBy,where,onSnapshot,updateDoc,serverTimestamp} from "firebase/firestore"
import app from '../configs/firebase';
import { useAuth } from '../context/Authemtication';
export default function Chat({route,navigation}) {
  const db=getFirestore(app)
  const {logout,user}=useAuth()
  const {chatdata}=route.params
  const userid=chatdata?.datainfo?.userid
  const [indicator,showindicator]=React.useState(false)
  const [messages, setMessages] = React.useState([]);
  // const onSend = (newMessages = []) => {
  //   setMessages(GiftedChat.append(messages, newMessages));
  // };
  React.useEffect(() => {
    const docid  =userid > user?.userid ? user?.userid+ "-" + userid : userid+"-"+user?.userid
const messageref=collection(db,"chatrooms",docid,"messages")
const messagesQuery = query(messageref, orderBy('createdAt',"desc"));  
const unsubscribe=onSnapshot(messagesQuery, (snapshot) => {
  const allmsg=snapshot.docs.map((doc) =>{
      const data=doc.data()
      if(data.createdAt){
          return {
             ...doc.data(),
             createdAt:doc.data().createdAt.toDate()
         }
      }else {
         return {
             ...doc.data(),
             createdAt:new Date()
         }
      }
  }
)
setMessages(allmsg)
})

      return ()=>{
        unsubscribe()
      }

      
    }, [])
    const onSend =(messageArray) => {
      const msg = messageArray[0]
      const mymsg = {
          ...msg,
          sentBy:user?.userid,
          sentTo:userid,
          createdAt:new Date()
      }
     setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
     const docid  = userid > user?.userid ? user?.userid+ "-" + userid : userid+"-"+user?.userid 
     const messageref=collection(db,"chatrooms",docid,"messages") 
     addDoc(messageref,{...mymsg,createdAt:serverTimestamp()}).then(()=>{
      let stringnotify=chatuser?.username+" "+"message you"
     
      
      }).catch(()=>{

      })
    }

  return (
    <View style={styles.mnonb}>
<View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:rp(5),marginHorizontal:rp(3)}}>
<View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
  <View style={{marginLeft:rp(2)}}>
   <Text style={{fontFamily:fonts.Nbold,color:colors.black,fontSize:rp(2.4)}}>{chatdata&&chatdata?.datainfo?.name}</Text>
   </View>
</View>
<Pressable onPress={()=>navigation.pop()}>
<IonicIcon name="exit-outline" size={30} color={colors.black} />
</Pressable>
</View>
<GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
                    user={{
                        _id: user?.userid,
                    }}
      renderInputToolbar={renderInputToolbar}
      renderSend={renderSend}
      
      messagesContainerStyle={{backgroundColor:colors.white,paddingBottom:rp(5)}}
      renderBubble={renderBubble}

    
    />
    </View>
  )
}
const renderInputToolbar = (props) => (
  <InputToolbar {...props} containerStyle={{ borderTopWidth: 0,paddingHorizontal:rp(1),marginBottom:rp(1) }}
  textInputStyle={{
    color:colors.black,
    fontFamily:fonts.Nregular
  }}
  >
    <Composer {...props} />
    <Send {...props} />
  </InputToolbar>
);

const renderSend = (props) => (
  <Send {...props}>
    <View style={{ marginRight: 10,paddingHorizontal:rp(1),paddingVertical:rp(1),borderRadius:rp(1), marginBottom: 5,backgroundColor:colors.primary }}>
      <Text style={{ color:colors.white, fontFamily:fonts.Nregular }}>SEND</Text>
    </View>
  </Send>
);

function renderBubble (props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: colors.primary,
        },
        left:{
          backgroundColor:colors.primary,
         
        }
      }}
      textStyle={{
        left: {
          color: colors.white,
          fontFamily:fonts.Nregular
        },
        right: {
          color: colors.white,
          fontFamily:fonts.Nregular
        },
      }}
    />
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
      backgroundColor:colors.black,
      paddingHorizontal:5,
      paddingVertical:4,
      borderRadius:5
  },
  containerStyle:{
      
  },
  title:{
      color:colors.black,
      fontSize:rp(2.4)
      ,fontFamily:fonts.Nregular
  },
  sendButton:{
    backgroundColor:"red"
  }

})


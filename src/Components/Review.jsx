import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,StatusBar,ScrollView,FlatList,TextInput } from 'react-native'
import React from 'react'
import colors from '../configs/colors';
import fonts from '../configs/fonts';
import Icon1 from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/Foundation"
import { Avatar } from 'react-native-elements';
export default function Review({visible,close}) {
  return (
    <Modal transparent visible={visible} >
        <StatusBar/>
           <View style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.2)"}}>
            <View style={{height:300,width:"90%",borderRadius:10,backgroundColor:colors.white,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Text style={{fontSize:22,marginVertical:5,fontFamily:fonts.Nextrabold}}>Leave a Review</Text>
                <TextInput style={{width:"90%",paddingHorizontal:10,marginVertical:15,paddingVertical:10,borderWidth:1,borderRadius:10,borderColor:colors.black}} placeholder='Review'/>
                    <TouchableOpacity style={{backgroundColor:colors.primary,paddingHorizontal:15,paddingVertical:12,borderRadius:4,display:"flex",justifyContent:"center",alignItems:"center"}} onPress={close}>
                        <Text style={{color:colors.white,fontFamily:fonts.Nblack}}>Leave Review</Text></TouchableOpacity>
              </View>
          
            </View>
    </Modal>
  )
}
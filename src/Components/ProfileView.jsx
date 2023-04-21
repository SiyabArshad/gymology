import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,StatusBar,ScrollView,FlatList } from 'react-native'
import React from 'react'
import colors from '../configs/colors';
import fonts from '../configs/fonts';
import Icon1 from "react-native-vector-icons/Ionicons"
import Icon2 from "react-native-vector-icons/Foundation"
import { Avatar } from 'react-native-elements';
export default function ProfileView({visible,close}) {
  return (
    <Modal transparent visible={visible} >
        <StatusBar/>
           <View style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.2)"}}>
            <View style={{height:500,width:"90%",borderRadius:10,backgroundColor:colors.white,display:"flex",alignItems:"center",justifyContent:"center"}}>
               <View style={{height:60,width:60,borderRadius:30,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:colors.primary}}><Text style={{color:colors.white,fontSize:21}}>I</Text></View>
                <Text style={{fontSize:22,marginVertical:5,fontFamily:fonts.Nextrabold}}>Ahmed Khan</Text>
                <Text style={{width:"70%",textAlign:"center",fontFamily:fonts.Nregular,marginBottom:5}}>
                    Hi i am Khan Instructor at bionance Apartment Gyms.
                </Text>
                <Text  style={{width:"70%",textAlign:"center",fontFamily:fonts.Nbold,marginBottom:5}}> Available 10 am to 12pm</Text>
              <View style={{height:150,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:10}}>
              <FlatList
    style={{marginTop:10}}
    showsHorizontalScrollIndicator={false}
    horizontal
    data={[1,2,3,4,5,6]}
    keyExtractor={(item) => item.toString()}
    renderItem={({item}) => (
        <View style={{height:130, width:250, paddingHorizontal:15, paddingVertical:15, overflow:"hidden", backgroundColor:colors.primary, marginHorizontal:10, borderRadius:10}}>
            <Text style={{color:colors.white, fontFamily:fonts.Nblack, marginBottom:5}}>Zohaib Ahmed</Text>
            <Text style={{color:colors.white, fontFamily:fonts.Nregular}}>It was my first experience with Ahmed sir and its totally worth.</Text>
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
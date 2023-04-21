import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';

export default function Inbox({navigation}) {
    const [isload,setisload]=React.useState(false)
  return (
    <View style={styles.mnonb}>
    <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:rp(5)}}>
       <Text style={{fontSize:rp(5),fontFamily:fonts.Nextrabold}}>Inbox</Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
        {
            [1,2,3,4,5,6].map((item,i)=>(
                <TouchableOpacity onPress={()=>navigation.navigate("chat")} key={i} style={{display:"flex",flexDirection:"row",justifyContent:"space-between",borderWidth:1,borderColor:colors.black,paddingHorizontal:5,paddingVertical:10,borderRadius:10,marginBottom:rp(1)}}>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <View style={{height:50,width:50,borderRadius:25,backgroundColor:colors.primary,display:"flex",alignItems:"center",justifyContent:"center"}}><Text style={{color:colors.white,textTransform:"uppercase"}}>I</Text></View>
            <View style={{marginLeft:rp(2)}}>
                <Text style={{color:colors.textgrey2,fontSize:rp(2.3),fontFamily:fonts.Nbold}}>Sunny</Text>
                <Text style={{fontFamily:fonts.Nmedium,color:colors.black}}>Hey man whats up</Text>
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
import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessageCard from '../Components/MessageCard';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
export default function Signup({route,navigation}) {
    const {istrainer}=route.params
    console.log(istrainer)
    const[email,setemail]=React.useState("")
    const[password,setpassword]=React.useState("")
    const[name,setname]=React.useState("")
    const[age,setage]=React.useState("")  
    const[phone,setphone]=React.useState("")
    const [isload,setisload]=React.useState(false)
    const [issubmit,setissubmit]=React.useState(false)
    const [Error,setError]=React.useState('')
    const [type,settype]=React.useState(false)
    const [location, setLocation] = React.useState(null);
    const [address, setaddress] = React.useState(null);
    const handleSelect = (data, details) => {
      console.log("pressede")
        setLocation({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
      setaddress(data.description);
    };
    const handleform=async()=>{
        setisload(true)
        setissubmit(true)
        try{
            if(email.length>6&&password.length>3){

                setError("Registered Successfully")
                setisload(false)
                settype(true)
            }
            else
            {
                setError("Incomplete Credentials")
                setisload(false)
                settype(false)
           
            }
        }
        catch{
            setError("Try again later")
            setisload(false)
            settype(false)
           
        }
    }
    const callbacksubmit=()=>{
        setissubmit(false)
    }
     return (
    <ScrollView style={styles.mnonb} showsVerticalScrollIndicator={false}  keyboardShouldPersistTaps="always">
     <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit}/>
     <View style={{display:"flex",flexDirection:"row",marginTop:rp(5),marginHorizontal:rp(2)}}>
        
     <Pressable onPress={()=>navigation.pop()} style={styles.btn}>
     <IonicIcon name="arrow-back" size={24} color={colors.white} />
     </Pressable>
     </View>
     <View style={{marginVertical:rp(5),marginHorizontal:rp(2)}}>
     <Text style={styles.text1}>
       {" "}Create {"\n"} Account :)
     </Text>
     </View>
     <View style={{marginTop:rp(1),marginHorizontal:rp(2)}}>
     <View style={{marginBottom:rp(1)}}>
        <TextInput
        maxLength={40} 
        placeholder='Full Name'
        value={name} onChangeText={(e)=>setname(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
     </View>
     <View style={{marginBottom:rp(1)}}>
        <TextInput
        placeholder='Email'
        value={email} onChangeText={(e)=>setemail(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
     </View>
     <View style={{marginBottom:rp(1)}}>
        <TextInput
        maxLength={15}
        keyboardType='number-pad'
        placeholder='Phone'
        value={phone} onChangeText={(e)=>setphone(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
     </View>
     <View style={{marginBottom:rp(1)}}>
        <TextInput
        placeholder='Age'
        keyboardType='number-pad'
        maxLength={2}
        value={age} onChangeText={(e)=>setage(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
     </View>
        <GooglePlacesAutocomplete
          placeholder="Search Location"
          onPress={handleSelect}
          fetchDetails={true}
          query={{
            key: "AIzaSyDnhoegBuugKFlvj2Vq7wnLtPlEI73fGnk",
            language: "en",
          }}
          styles={{
            container: styles.googlesearchcon,
            textInputContainer: styles.googlesearchInputContainer,
            textInput: styles.googlesearchInput,
            predefinedPlacesDescription: styles.googlesearchResult,
          }}
          
        />
     <View style={{marginBottom:rp(1)}}>
        <TextInput
        secureTextEntry
        placeholder='Password'
        value={password} onChangeText={(e)=>setpassword(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
     </View>

     </View>
     <View style={[{marginVertical:rp(5),zIndex:999},styles.centertext]}>
                <Pressable 
                disabled={issubmit} 
                onPress={handleform} style={{backgroundColor:colors.primary,paddingHorizontal:rp(8),paddingVertical:rp(1),borderRadius:rp(3)}}>
                   {
                        isload?
                        <ActivityIndicator size={30} color={colors.white}/>
                        :
                        <Text style={{color:colors.white,fontFamily:fonts.Nbold,fontSize:rp(3),textTransform:"uppercase"}}>Register</Text>
                    }
                </Pressable>
                <Pressable onPress={()=>navigation.navigate("login")} style={{marginTop:rp(3)}}>
                    <Text style={{fontFamily:fonts.Nregular,fontSize:rp(2.5),color:colors.textgrey}}>
                    Already Have an Account?
                    </Text>
                </Pressable>
     </View>
    </ScrollView>
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
        fontSize:rp(5)
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
    },
    googlesearchcon: {
    },
    googlesearchInputContainer: {
        marginVertical:rp(1),
        borderBottomWidth:1,
        borderBottomColor:colors.black
    },
    googlesearchInput: {
      fontFamily: fonts.Nregular,
    },
    googlesearchResult: {},
})
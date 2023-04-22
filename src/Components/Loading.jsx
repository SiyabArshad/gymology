import { View, Text,ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '../configs/colors'
export default function Loading() {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <ActivityIndicator size={24} color={colors.primary}/>
</View>
  )
}
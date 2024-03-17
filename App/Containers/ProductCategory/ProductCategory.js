import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView,Linking } from "react-native";
import { Spinner } from "native-base";
import NavigationService from "App/Services/NavigationService";

import SelectionButton from "App/Components/SelectionButton";
import { ApplicationStyles, Colors } from "App/Theme";
import GenericIcon from "App/Components/GenericIcon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Styles from "./ProductCategoryStyle";

import MenuIcon from 'react-native-vector-icons/AntDesign'




class ProductCategory extends React.Component {


  render() {


    return (
      <ScrollView style={{alignSelf:'center',width:'90%'}}
      showsVerticalScrollIndicator={false}
      >

       

        {/* <View style={Styles.mainContainer}> */}
          <View style={{justifyContent:'center',marginLeft:22,marginBottom:"5%",marginTop:10}} >
            
              <TouchableOpacity  onPress={() =>
                Linking.openURL('https://www.jkpaper.com/products/office-documentation-.html')
            }>
                 {/* //icon="event-note"
                // img={require("../../Assets/Images/purchase_order.png")}
                title="Office Documentation"
                textStyle={{ marginTop: hp('7%'), marginBottom: 10, textTransform: 'none',color:Colors.primary }}
                style={Styles.Card} */}
               <View style={Styles.Card}>
                 <Text style={{alignSelf:'center',color:Colors.primary,fontWeight:'bold'}}>Office Documentation</Text>
               </View>
              </TouchableOpacity>
            
 
           
          
              <TouchableOpacity onPress={() =>
                Linking.openURL('https://www.jkpaper.com/products/uncoated-paper-a-board.html')}>
                  <View style={Styles.Card}>
                 <Text style={{alignSelf:'center',color:Colors.primary,fontWeight:'bold'}}>Uncoated Paper & Board</Text>
               </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>
                       Linking.openURL('https://www.jkpaper.com/products/coated-paper-a-board-.html')}>
                  <View style={Styles.Card}>
                 <Text style={{alignSelf:'center',color:Colors.primary,fontWeight:'bold'}}>Coated Paper & Board</Text>
               </View>
              </TouchableOpacity>
        
              <TouchableOpacity onPress={() =>
                             Linking.openURL('https://www.jkpaper.com/products/packaging-board-.html')
                       }>
                  <View style={Styles.Card}>
                 <Text style={{alignSelf:'center',color:Colors.primary,fontWeight:'bold'}}>Packaging Board</Text>
               </View>
              </TouchableOpacity>
        
        
              <TouchableOpacity onPress={() =>
                             Linking.openURL('https://www.jkpaper.com/products/select-your-paper.html')
                       }>
                  <View style={Styles.Card}>
                 <Text style={{alignSelf:'center',color:Colors.primary,fontWeight:'bold'}}>Select your paper</Text>
               </View>
              </TouchableOpacity>
        
              <TouchableOpacity onPress={() =>
                             Linking.openURL('https://www.jkpaper.com/products/speciality-paper.html')
                       }>
                  <View style={Styles.Card}>
                 <Text style={{alignSelf:'center',color:Colors.primary,fontWeight:'bold'}}>Speciality Paper</Text>
               </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>
                             Linking.openURL('https://www.jkpaper.com/products/glossary-of-terms.html')
                       }>
                  <View style={Styles.Card}>
                 <Text style={{alignSelf:'center',color:Colors.primary,fontWeight:'bold'}}>Glossary of Terms</Text>
               </View>
              </TouchableOpacity>
        
              <TouchableOpacity onPress={() =>
                  Linking.openURL('https://www.jkpaper.com/products/imported-coated-art-paperc2sgloss.html?view=pages&layout=enquiry')
                       }>
                  <View style={Styles.Card}>
                 <Text style={{alignSelf:'center',color:Colors.primary,fontWeight:'bold'}}>Imported Coated Art Paper(C2S),Gloss.</Text>
               </View>
              </TouchableOpacity>
        
        
              <TouchableOpacity onPress={() =>
                  Linking.openURL('https://www.jkpaper.com/Guidleines-for-paper-usage.pdf')
                       }>
                  <View style={Styles.Card}>
                 <Text style={{alignSelf:'center',color:Colors.primary,fontWeight:'bold'}}>Guidelines of Paper usage</Text>
               </View>
              </TouchableOpacity>
        
        
              <TouchableOpacity onPress={() =>
                  Linking.openURL('https://www.jkpaper.com/products/frequently-asked-questions-.html')
                       }>
                  <View style={Styles.Card}>
                 <Text style={{alignSelf:'center',color:Colors.primary,fontWeight:'bold'}}>Frequently Asked Questions</Text>
               </View>
              </TouchableOpacity>
      
          </View>
        {/* </View> */}

      </ScrollView>
    );
  }
}

export default ProductCategory


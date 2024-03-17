import BlueButton from 'App/Components/BlueButton'
import GenericIcon from 'App/Components/GenericIcon'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService'
import { Colors } from 'App/Theme'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import {launchCamera} from 'react-native-image-picker'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Style from './Styles'

const MenuInfoTuple= ({ onPress, areas, data, id, Show , onPressLogoout, loading}) => {
  let [image,setImage] = useState("")
  return (
 
    <View style={[Style.box,{backgroundColor:Colors.white}]} onPress={onPress}>
      <View style={{marginLeft:'0%', marginTop:'2%',}}>
        {
          image ?
          <Image 
            style={{width:120,height:80,}}
            source={{uri: 'data:image/jpeg;base64,' + image }}
          /> :
          <View style={Style.userCircle} >
            <GenericIcon
              name={'person'}
              ios={'person'}
              android={'person'}
              style={{ color: Colors.primary ,paddingRight:5,  fontSize: wp('8.8%'),}}
            />
          </View>
        }
        <TouchableOpacity
          onPress={async() => {
            var options = {
              title: 'Select Image',
              quality: .9,
              maxWidth: 1080,
              maxHeight: 1080,
              mediaType: 'photo',
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            };
            let permission = await HelperService.requestMultipleStoragePermission();
            let cameraPermission = await HelperService.requestCameraPermission();
        
            if (cameraPermission || permission) {
              
              launchCamera(options, response => {
                if (response.didCancel) {
                } else if (response.error) {
                } else if (response.customButton) {
                Alert(response.customButton);
                } else {
                new Promise((resolve, reject) => {
                  const url = response.assets[0].uri;
                  const filename = response.assets[0].fileName;
                //   console.log('chal gyaaaaaaaa');
                  RNFS.readFile(response.assets[0].uri, 'base64')
                  .then(response => {
                    resolve(response);
                    const source = {uri: response.assets[0].uri};
                    let sources = [].concat(setImage);
                    sources.push(
                    'data:image/jpeg;base64,' + response.assets[0].uri,
                    );
                  })
                  .catch(err => {
                    reject(err);
                  });
                });
                const source = {uri: response.assets[0].uri};
               
                }
              });
              } else {
              Alert.alert(
                'Storage permission Denied.',
                'If you have denied permanently then Go "App Permissions" and Turn on "Storage" Permission for Jaideep.',
              );
              }
          }}
          style={Style.icon}
        >
          <GenericIcon
            name={'camera'}
            ios={'camera'}
            android={'camera'}
            style={{ color: Colors.button, marginTop:'2%',fontSize: wp('6.3%') }}
          />
        </TouchableOpacity>
        {  Show? []:    <BlueButton  title={'LOG OUT'}style={{ ...Style.button
 }} textStyle={{fontSize: wp('3.3%'),marginRight: wp('0%'),color: Colors.primary}}  
           onPress={onPressLogoout}
           disabled={loading}
           loading={loading}
           >
              </BlueButton> }

      </View>
      <View style={Style.userDtl}>
        <Text style={Style.title}> {data&&data.team_member_name__c?data.team_member_name__c:'NA'}</Text>
        <Text style={Style.desc}>{data&&data.phone_number__c?data.phone_number__c:'NA'}</Text>
        <Text style={Style.desc}>{data&&data.email__c?data.email__c:'NA'}</Text> 
       
        {  Show? []:   <Text style={Style.desc1} onPress={()=>NavigationService.navigate('MenuDetailScreen')}>View More Info</Text> }
      </View>
     

    </View>
 
);
}
export default MenuInfoTuple

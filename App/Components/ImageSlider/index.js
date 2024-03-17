import GenericIcon from 'App/Components/GenericIcon'
import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Swiper from 'react-native-swiper'
import { Colors } from '../../Theme'

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
  	width: '100%', 
  	height: '100%', 
  	resizeMode: 'contain',
    borderRadius: 2
  },
  dot: {
    backgroundColor:'rgba(0,0,0,.3)', 
    width: 10, 
    height: 10,
    borderRadius: 5, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 10, 
    marginBottom: 1
  },
  activeDot: {
    backgroundColor: '#007aff', 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 10, 
    marginBottom: 1
  },
  actionbuttons: {
     color: Colors.grey, 
     fontSize: wp('6.5%'), 
     padding: wp('.3%')
  }
})

export default class SwiperComponent extends Component {
  render() {
  	const {
  		images
  	} =  this.props

    let visible_node  = images && images.length ? images.map((url) => <View key={url} style={styles.slide1}><Image source={{uri: url.attachment_url__c}} style={styles.image}/></View>) : <View style={styles.slide1}><Image source={require('App/Assets/Images/no_image_available.png')} style={styles.image}/></View>;

    return (
      <Swiper style={styles.wrapper} 
      	showsButtons={!!(images && images.length)} 
      	loop={true}
      	showsPagination={true}
      	dot={<View style={styles.dot} />}
      	activeDot={<View style={styles.activeDot} />}
      	nextButton={<GenericIcon name={'arrow-right-circle'} style={styles.actionbuttons} show={true}/>}
      	prevButton={<GenericIcon name={'arrow-left-circle'} style={styles.actionbuttons} show={true}/>}
      >
       {visible_node}
      </Swiper>
    )
  }
}
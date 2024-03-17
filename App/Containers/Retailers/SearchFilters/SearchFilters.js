import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'

const RetailerTuple = ({ onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={Style.box} onPress={onPress}>
        <View style={Style.tuple}>
          <View style={Style.userCircle}>
            <Image style={Style.userIcon} source={require('App/Assets/Images/user.png')} />
          </View>
          <View style={Style.userDtl}>
            <Text style={Style.title}>Aman Electricals</Text>
            <Text style={Style.desc}>Category A</Text>
          </View>
        </View>

        <View style={Style.btmBox}>
          <View style={Style.strip}>
            <Text style={Style.ttl}>{AREA}</Text>
            <Text style={Style.detail}>{'karol bagh'}</Text>
          </View>
          <View style={Style.strip}>
            <Text style={Style.ttl}>{VISIT_THIS_WEEK}</Text>
            <Text style={Style.detail}>{'50'}</Text>
          </View>
          <View style={Style.strip}>
            <Text style={Style.ttl}>{PREV_ORDER_VAL}</Text>
            <Text style={Style.detail}>{'5,00,000'}</Text>
          </View>
          <View style={Style.strip}>
            <Text style={Style.ttl}>{MAIN_COMPETETOR}</Text>
            <Text style={Style.detail}>{'Havells'}</Text>
          </View>
        </View>
    </View>
  </TouchableWithoutFeedback>
)

export default RetailerTuple

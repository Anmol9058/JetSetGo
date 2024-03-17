import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import Style from './InfuencersTupleStyle'
import { Icon, Input, Button } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService';
import WhiteButton from 'App/Components/WhiteButton'
import GenericIcon from 'App/Components/GenericIcon'


const InfluencersTuple = ({ onPress, id, data, agentList }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={Style.box}>
        <View style={Style.tuple}>
          <View style={Style.userCircle}>
            <GenericIcon
              name={'person'}
              style={{ color: Colors.button }}
            />
          </View>
          <View style={Style.userDtl}>
            <Text style={Style.title}>{data.firstname + ' ' + data.lastname}</Text>
            {data.email ? <Text style={Style.desc}>{data.email}</Text> : []}
            {data.area__c ? <Text style={Style.desc}>{HelperService.getNameFromSFID(agentList, data.area__c)}</Text> : []}
          </View>
        </View>
        <View style={Style.btmBox}>
          <View style={Style.strip}>
            <Text style={Style.ttl}>{'Business so far'}</Text>
            <Text style={Style.detail}>{HelperService.currencyValue(data.business_so_far__c)}</Text>
          </View>
          <View style={Style.strip}>
            <Text style={Style.ttl}>{'Last Visit Date'}</Text>
            <Text style={Style.detail}>{HelperService.dateReadableFormat(data.last_visit_date__c || '')}</Text>
          </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
)


        
      

export default InfluencersTuple

import React from 'react'
import { Text, View, Image, TouchableWithoutFeedback, Touchable, TouchableOpacity } from 'react-native'
import Style from './HistoryTupleStyle'
import { Icon, Input, Button } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import BlueButton from 'App/Components/BlueButton'
import GenericIcon from 'App/Components/GenericIcon'
import HistoryRemark from './HistoryRemark'




const HistoryTuple = ({ onPress, id, data, areas, competitors, showdata  }) => (
    // <HistoryRemark>
    // <TouchableWithoutFeedback onPress={onPress}>
    <TouchableWithoutFeedback  onPress={()=>{NavigationService.navigate('VisitInfoScreen', { id: data.pg_id__c, data: data})}}>
    <View style={ Style.box} >
            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Visit Id'}</Text>
                    <Text style={Style.detail}>{data.name}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Visit Date'}</Text>
                    <Text style={Style.detail}>{HelperService.removeTimestringFromDate(data.visit_date__c)}</Text>
                </View>

                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Status'}</Text>
                    <Text style={Style.detail}>{data.status__c|| 'None'}</Text>
                </View>
                

         </View>
         </View>
         </TouchableWithoutFeedback>
        //  </HistoryRemark>
)

export default HistoryTuple
import { HelperService } from 'App/Services/Utils/HelperService';
import React from 'react';
import { Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import StatusLabelScreen from '../../../Components/StatusLabel';
import Style from './TeamExpenseTupleStyle';
import { Icon } from 'native-base';
import Colors from '../../../Theme/Colors';

const TeamExpenseTuple = ({ onPress, data }) => (
    // <TouchableWithoutFeedback onPress={onPress}>
    <View style={Style.box}>
        <View style={Style.tuple}>
            <View style={Style.userDtl}>
                <Text style={Style.title}>{HelperService.dateReadableFormat(data.createddate)}</Text>
            </View>
        </View>
        {data.expense_status__c && data.expense_status__c !== 'Draft' && <StatusLabelScreen status={data.expense_status__c} />}
        <View style={Style.btmBox}>
            <View style={Style.strip}>
                <Text style={Style.ttl}>{'From'}</Text>
                <Text style={Style.detail}>{HelperService.dateReadableFormat(data.from_date__c)}</Text>
            </View>
            <View style={Style.strip}>
                <Text style={Style.ttl}>{'To'}</Text>
                <Text style={Style.detail}>{HelperService.dateReadableFormat(data.to_date__c)}</Text>
            </View>
            {data.mode__c && <View style={Style.strip}>
                <Text style={Style.ttl}>{'Mode of Travel'}</Text>
                <Text style={Style.detail}>{data.mode__c}</Text>
            </View>}
            <View style={Style.strip}>
                <Text style={Style.ttl}>{'Meeting'}</Text>
                <Text style={Style.detail}>{data.customer__c}</Text>
            </View>
            <View style={Style.strip}>
                <Text style={Style.ttl}>{'Amount'}</Text>
                <Text style={Style.detail}>{HelperService.currencyValue(data.amount__c)}</Text>
            </View>
            <View style={[Style.strip, { justifyContent: 'flex-end' }]}>
                <TouchableOpacity onPress={onPress} style={{ padding: 2 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Icon name="md-create" style={{ fontSize: 14, color: Colors.button }} />
                        <Text style={{ marginLeft: 8, color: Colors.button }}>Remarks</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    // </TouchableWithoutFeedback>
)

export default TeamExpenseTuple

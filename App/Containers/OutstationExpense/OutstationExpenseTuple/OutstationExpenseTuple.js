import { HelperService } from 'App/Services/Utils/HelperService';
import { Colors } from 'App/Theme';
import { CheckBox, Icon } from 'native-base';
import React from 'react';
import { Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import Style from './OutstationExpenseTupleStyle';
import StatusLabelScreen from '../../../Components/StatusLabel';

const OutstationExpenseTuple = ({ onPress, handleChecked, checkboxVisibility, data, remarks }) => (
    <TouchableWithoutFeedback onPress={onPress}>
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
                    <Text style={Style.detail}>{data.from__c}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'To'}</Text>
                    <Text style={Style.detail}>{data.to__c}</Text>
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
            </View>
        </View>
    </TouchableWithoutFeedback>
)

export default OutstationExpenseTuple

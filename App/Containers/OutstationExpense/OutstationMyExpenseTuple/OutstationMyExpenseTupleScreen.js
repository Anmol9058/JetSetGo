import WhiteButton from 'App/Components/WhiteButton';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import StatusLabelScreen from '../../../Components/StatusLabel';
import { HelperService } from '../../../Services/Utils/HelperService';
import Style from './OutstationMyExpenseTupleStyle';

const OutstationMyExpenseTupleScreen = ({ onPress, data, onEmailClick, onSubmit }) => {
    console.log(data, "TUPLE DATA");
    let conditionalView = <View style={data.expense_status__c === 'Draft' ? { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } : { alignSelf: 'flex-end' }}>
        <WhiteButton
            style={data.expense_status__c === 'Draft' ? { width: '45%' } : { width: '52%' }}
            textStyle={{ fontSize: 14 }}
            rounded
            large
            title={'Send Email'}
            onPress={onEmailClick}
        />

        {data.expense_status__c === 'Draft' ? <WhiteButton
            style={{ width: '52%' }}
            textStyle={{ fontSize: 14, }}
            rounded
            large
            title={'Submit For Approval'}
            onPress={onSubmit}
        /> : <></>}
    </View>;
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={data.exception_case__c ? Style.customBox : Style.box}>
                <View style={Style.btmBox}>
                    <View style={Style.strip}>
                        <Text style={Style.ttl}>{'Expense Id'}</Text>
                        <Text style={Style.detail}>{data.name}</Text>
                    </View>
                    <View style={Style.strip}>
                        <Text style={Style.ttl}>{'Branch'}</Text>
                        <Text style={Style.detail}>{data.member_branch_name || 'None'}</Text>
                    </View>
                    {/* <View style={Style.strip}>
                        <Text style={Style.ttl}>{'Month'}</Text>
                        <Text style={Style.detail}>{data.month__c}</Text>
                    </View> */}
                    <View style={Style.strip}>
                        <Text style={Style.ttl}>{'Amount'}</Text>
                        <Text style={Style.detail}>{HelperService.currencyValue(data.total_amount__c || '0')}</Text>
                    </View>
                    <View style={Style.strip}>
                        <Text style={Style.ttl}>{'Status'}</Text>
                        <StatusLabelScreen status={data.expense_status__c} />
                    </View>

                    {conditionalView}
                </View>
            </View>
        </TouchableWithoutFeedback >
    )
}


export default OutstationMyExpenseTupleScreen

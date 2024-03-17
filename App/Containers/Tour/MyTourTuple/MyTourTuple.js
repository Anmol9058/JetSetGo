import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Style from './MyTourTupleStyle';
import { HelperService } from 'App/Services/Utils/HelperService'
import StatusLabelScreen from 'App/Components/StatusLabel';
import BlueButton from 'App/Components/BlueButton';
import WhiteButton from 'App/Components/WhiteButton';

const MyTourTuple = ({ onPress, data, onSubmit }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={Style.box}>
            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'From'}</Text>
                    <Text style={Style.detail}>{HelperService.dateReadableFormat(data.tour_from__c)}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'To'}</Text>
                    <Text style={Style.detail}>{HelperService.dateReadableFormat(data.tour_to__c)}</Text>
                </View>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Purpose'}</Text>
                    <Text style={Style.detail}>{data.tour_purpose__c}</Text>
                </View>
                {data.tour_status__c !== 'Draft' ? <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Status'}</Text>
                    <StatusLabelScreen status={data.tour_status__c} />
                </View> :
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 8, width: '100%' }}>
                        <WhiteButton
                            onPress={onSubmit}
                            title={'Submit For Approval'}
                            style={{ height: 40 }}
                        />
                    </View>
                }
            </View>
        </View>
    </TouchableWithoutFeedback>)
}

export default MyTourTuple

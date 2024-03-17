import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import WhiteButton from '../../../Components/WhiteButton';
import { HelperService } from '../../../Services/Utils/HelperService';
import Style from './OtherTourTupleStyle';

const OtherTourTuple = ({ onPress, data, handleApprove, handleReject }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={Style.box}>
            <View style={Style.btmBox}>
                <View style={Style.strip}>
                    <Text style={Style.ttl}>{'Name'}</Text>
                    <Text style={Style.detail}>{data.member_team_member_name__c}</Text>
                </View>
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
            </View>
            {data.tour_status__c === 'Pending For Approval' && <View style={Style.actionContainer}>
                <WhiteButton
                    onPress={handleApprove}
                    title={'Approve'}
                    style={Style.actionButton}
                />
                <WhiteButton
                    onPress={handleReject}
                    title={'Reject'}
                    style={Style.actionButton}
                />
            </View>}
        </View>
    </TouchableWithoutFeedback >
)

export default OtherTourTuple

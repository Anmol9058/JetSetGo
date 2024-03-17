import { HelperService } from 'App/Services/Utils/HelperService';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import CheckBoxContainer from '../../../../Components/Checkox/Checkbox';
import Style from './TourApprovalTupleStyle';


const TourApprovalTuple = ({ handleChecked, data }) => {

    return (<TouchableWithoutFeedback>
        <View style={Style.box}>
            <View>
                <CheckBoxContainer style={{ alignSelf: 'flex-start' }}
                    status={data.checked}
                    handleClick={handleChecked}
                />
            </View>
            <View>
                {/* <View style={Style.tuple}>
                    <View style={Style.userDtl}>
                        <Text style={Style.title}>{HelperService.dateReadableFormat(data.createddate)}</Text>
                    </View>
                </View> */}
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
                        <Text style={Style.detail}>{data.tour_purpose__c || 'None'}</Text>
                    </View>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>);
}

export default TourApprovalTuple

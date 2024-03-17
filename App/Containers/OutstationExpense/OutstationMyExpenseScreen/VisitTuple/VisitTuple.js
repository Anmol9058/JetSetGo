import { HelperService } from 'App/Services/Utils/HelperService';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import CheckBoxContainer from '../../../../Components/Checkox/Checkbox';
import Style from './VisitTupleStyle';
import { Colors } from '../../../../Theme';


const VisitTuple = ({ handleChecked, data }) => {
    console.log(data, "VISIt DATA");
    return (<TouchableWithoutFeedback>
        <View style={Style.box}>
            <View>
                <CheckBoxContainer style={{ alignSelf: 'flex-start' }}
                    status={data.checked}
                    handleClick={handleChecked}
                />
            </View>
            <View>
                <View style={Style.btmBox}>
                    <View style={Style.strip}>
                        <Text style={Style.ttl}>{data.name}</Text>
                        {/* <Text style={Style.ttl}>{'Name'}</Text> */}

                    </View>
                    <View style={Style.strip}>
                        <Text style={[Style.ttl, { color: Colors.button, fontSize: 16 }]}>{data.retailer_dealer_name}</Text>
                        <Text style={[Style.detail, { color: Colors.button, fontSize: 16 }]}>{''}</Text>
                    </View>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>);
}

export default VisitTuple

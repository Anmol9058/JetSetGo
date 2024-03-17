import GenericIcon from 'App/Components/GenericIcon';
import NavigationService from 'App/Services/NavigationService';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { HelperService } from '../../../Services/Utils/HelperService';
import Style from './LocalExpenseInfoTupleStyle';

const LocalExpenseInfoTuple = ({ onPress, data, id, name, visible }) => {
    return (<TouchableWithoutFeedback
        onPress={visible.expense_status__c === 'Draft' ? () => NavigationService.navigate('UpdateLocalExpenseScreen', { id: id }) : () => { }}>
        <View style={Style.box} onPress={onPress}>
            <View style={Style.userCircle}>
                <Icon
                    name={'ios-calendar'}
                    ios={'ios-calendar'}
                    android={'md-calendar'}
                    style={{ color: Colors.button }}
                />
            </View>
            <View style={Style.userDtl}>
                <Text style={Style.title}>{name}</Text>
                <Text style={Style.desc}>{HelperService.dateReadableFormat(data.createddate)}</Text>
            </View>
            {visible.expense_status__c === 'Draft' ? <GenericIcon
                name={'create'}
                onPress={() => NavigationService.navigate('UpdateLocalExpenseScreen', { id: id })}
                style={{ color: Colors.button, fontSize: 32, alignSelf: 'center', position: 'absolute', right: 10, zIndex: 2, top: 15 }}
            /> : <></>}
        </View>
    </TouchableWithoutFeedback>
    );
}

export default LocalExpenseInfoTuple

import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { CheckBox } from 'native-base';
import Styles from './CheckboxStyle';

const CheckBoxContainer = ({ label = '', status = false, handleClick = () => { } }, style) => (
    <TouchableWithoutFeedback onPress={handleClick}>
        <View style={Styles.container}>
            <CheckBox checked={status} onPress={handleClick} style={{ borderRadius: 5 }} />
            <Text style={Styles.labelText}>{label}</Text>
        </View>
    </TouchableWithoutFeedback>

);

export default CheckBoxContainer

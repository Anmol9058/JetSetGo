import moment from 'moment';
import { DatePicker, Label } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperService } from '../../Services/Utils/HelperService';
import { ApplicationStyles, Colors } from '../../Theme';
import Style from './InputStyles';


const InputDate = ({ placeholder = '', onChange = () => { }, style = {}, value = '', error = false, label = '', editable = false }) => (
    <>
        {label ? <Label style={{ ...Style.label }}>{label}</Label> : []}
        <View style={error ? { ...Style.input, ...Style.inputError, ...Styles.container } : { ...Styles.input, ...Styles.container }}>
            <DatePicker
                locale={"en"}
                animationType={"slide"}
                androidMode={"default"}
                placeHolderText={value ? HelperService.dateReadableFormat(value) : placeholder}
                textStyle={{ color: Colors.button }}
                placeHolderTextStyle={value ? { color: Colors.button } : { color: "#d3d3d3" }}
                onDateChange={onChange}
                minimumDate={moment.now()}
                disabled={editable}
            />
        </View>
    </>
)

const Styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginBottom: 15
    },
    input: {
        // borderColor: Colors.border,
        borderRadius: 10,
        elevation:5,
        backgroundColor:Colors.white,
        // borderWidth: 1,
        color: Colors.inputText,
        fontFamily: ApplicationStyles.textMediumFont,
        paddingLeft: 5,
        justifyContent: 'center',
    },
});

export default InputDate

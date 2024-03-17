import React from 'react';
import { Text, View } from 'react-native';
import Style from './StatusLabelScreenStyle';

const StatusLabelScreen = ({ status }) => {
    let customStyles = {};
    switch (status) {
        case 'Draft':
            customStyles = Style.draft
            break;
        case 'Pending for Approval':
            customStyles = Style.pending
            break;
        case 'Pending For Approval':
            customStyles = Style.pending
            break;
        case 'Approved':
            customStyles = Style.approved
            break;
        case 'Rejected':
            customStyles = Style.rejected
            break;
        default:
            customStyles = Style.pending;
    }
    return (
        <View style={{ ...Style.statusBar, ...customStyles }}>
            <Text style={Style.statusText}>{status}</Text>
        </View>
    );
}

export default StatusLabelScreen

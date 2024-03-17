import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { connect } from 'react-redux';
import { HelperService } from '../../Services/Utils/HelperService';
import Style from './FilePickerStyle';


class FilePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: ''
        };
    }

    onFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles]
            });
            const fileContents = await RNFS.readFile(res.uri, 'base64');
            if (fileContents) {
                this.props.onSuccess({ fileName: res.name, fileUri: fileContents });
                this.setState({ fileName: res.name })
            } else {
                HelperService.showToast({ message: 'Something went wrong!Please Try Again' });
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                HelperService.showToast({ message: 'File is not selected' });
            } else {
                throw err;
            }
        }
    }

    render() {
        const { fileName } = this.state;
        const { onPress } = this.props;
        return (
            <View style={Style.container}>
                <View>
                    <Text style={Style.labelStyle}>Attachment</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => this.onFilePicker()}>
                    <View style={Style.leftViewContainer}>
                        <Text style={{ paddingHorizontal: 5 }} numberOfLines={1}>{fileName || 'Select File'}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    visitDataLoader: state.visits.visitDataLoader
});

export default connect(mapStateToProps, null)(FilePicker)
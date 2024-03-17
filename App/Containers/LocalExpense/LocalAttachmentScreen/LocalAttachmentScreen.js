import BlueButton from 'App/Components/BlueButton';
import WhiteButton from 'App/Components/WhiteButton';
import { ApplicationStyles } from 'App/Theme';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { connect } from 'react-redux';
import Select from '../../../Components/Select/Select';
import LocalActions from '../../../Stores/LocalExpense/Actions';
import Style from './LocalAttachmentScreenStyle';
import FilePicker from '../../../Components/FIlePicker';
import { HelperService } from '../../../Services/Utils/HelperService';
import { Icon } from 'native-base';


let extractData = {};
class LocalAttachmentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            fileUri: '',
        }
    }

    submit() {
        const { selectLocalExpenseItem, token, agentid } = this.props;
        if (this.state.fileName === '') {
            HelperService.showToast({ message: 'No file selected' });
        } else {
            this.props.uploadLocalImage({
                token: token,
                agentid: agentid,
                sfid: selectLocalExpenseItem.sfid,
                payload: {
                    attachment__c: this.state.fileUri,
                    file_name: this.state.fileName
                }
            });
        }
    }


    // onFilePicker = async () => {
    //     try {
    //         const res = await DocumentPicker.pick({
    //             type: [DocumentPicker.types.allFiles],
    //         });
    //         console.log(
    //             res.uri,
    //             res.type, // mime type
    //             res.name,
    //             res.size
    //         );
    //     } catch (err) {
    //         if (DocumentPicker.isCancel(err)) {
    //             // User cancelled the picker, exit any dialogs or menus and move on
    //         } else {
    //             throw err;
    //         }
    //     }
    // }

    // populateAttachments = (value) => {
    //     let componentArr = [];
    //     for (let i = 0; i < value; i++) {
    //         let customComponent = <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    //             <WhiteButton
    //                 title={'Select File'}
    //                 onPress={() => this.onFilePicker()}
    //                 style={Styles.searchFilterTypeBox}
    //                 textStyle={Styles.searchFilterTypeText}
    //             />
    //             <BlueButton
    //                 style={Style.button}
    //                 rounded
    //                 large
    //                 title={'Upload'}
    //                 onPress={() => { }}
    //             />
    //         </View>
    //         componentArr.push(customComponent);
    //     }
    //     this.setState({ attachmentList: componentArr });
    // }


    render() {
        const { selectLocalExpense } = this.props;
        let visibleNode = selectLocalExpense.expense_status__c === 'Draft' ? <ScrollView style={Style.action}>
            <FilePicker onSuccess={({ fileName, fileUri }) => {
                this.setState({ fileName: fileName, fileUri: fileUri })
            }} />

            <View style={Style.buttonContainer}>
                <BlueButton
                    style={Style.button}
                    rounded
                    large
                    title={'Upload'}
                    disabled={this.props.uploadLocalImageLoader}
                    loading={this.props.uploadLocalImageLoader}
                    onPress={() => this.submit()}
                />
            </View></ScrollView> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon type='FontAwesome5'
                    name='file'
                    style={Style.iconStyle} />
                <Text style={Style.text}>You cannot Upload File Now!</Text>
            </View>

        return (
            <View style={Style.container}>
                {/* <InputNumber
                        style={Style.mb10}
                        placeholder={`No. of Attachement`}
                        value={this.state.attachmentValue}
                        onChange={(value) => {
                            this.setState({ attachmentValue: value });
                            this.populateAttachments(value);
                        }}
                        error={validation.invalid && validation.invalid_field == 'expected_participation__c'}
                        label={'No. of Attachment'}
                        editable={selectedEvent.status__c !== 'Approved' ? true : false}
                    />

                    {this.state.attachmentList} */}
                {visibleNode}
            </View >
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    uploadLocalImageLoader: state.local.uploadLocalImageLoader,
    selectLocalExpense: state.local.selectLocalExpense,
    selectLocalExpenseItem: state.local.selectLocalExpenseItem

})

const mapDispatchToProps = (dispatch) => ({
    clearSelectLocalItemExpense: (params) => dispatch(LocalActions.clearSelectLocalItemExpense(params)),
    uploadLocalImage: (params) => dispatch(LocalActions.uploadLocalImage(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocalAttachmentScreen)

const Styles = StyleSheet.create({
    searchFilterContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchFilterTypeBox: {
        marginHorizontal: 5,
        width: 200,
        borderWidth: 1.5
    },
    searchFilterTypeText: {
        fontSize: 15,
        fontFamily: ApplicationStyles.textMediumFont
    },
});

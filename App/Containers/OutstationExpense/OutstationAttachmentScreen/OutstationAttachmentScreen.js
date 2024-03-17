import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import WhiteButton from 'App/Components/WhiteButton';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { connect } from 'react-redux';
import OutstationAction from '../../../Stores/OutstationExpense/Actions';
import { ApplicationStyles } from '../../../Theme';
import Style from './OutstationAttachmentScreenStyle';

let extractData = {};
class OutstationAttachmentScreen extends Component {
    constructor(props) {
        super(props);
        extractData = {}
        this.state = {
            attachmentValue: 0,
            attachmentList: []
        }
    }


    componentDidMount() {
        extractData = this.props.navigation.getParam('params');
    }

    componentWillUnmount() {
        this.props.clearOutstationForm();
    }

    submit() {
        this.props.updateOutstationExpense({
            ...this.props.outstationForm, ...{
                token: this.props.token,
                agentid: this.props.agentid
            }
        });
    }


    onFilePicker = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    populateAttachments = (value) => {
        let componentArr = [];
        for (let i = 0; i < value; i++) {
            let customComponent = <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <WhiteButton
                    title={'Select File'}
                    onPress={() => this.onFilePicker()}
                    style={Styles.searchFilterTypeBox}
                    textStyle={Styles.searchFilterTypeText}
                />
                <BlueButton
                    style={Style.button}
                    rounded
                    large
                    title={'Upload'}
                    onPress={() => { }}
                />
            </View>
            componentArr.push(customComponent);
        }
        this.setState({ attachmentList: componentArr });
    }


    render() {
        const { validation, selectMyOutstationExpense } = this.props;

        return (
            <View style={Style.container}>
                <ScrollView style={Style.action}>

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`No. of Attachement`}
                        value={this.state.attachmentValue}
                        onChange={(value) => {
                            this.setState({ attachmentValue: value });
                            this.populateAttachments(value);
                        }}
                        error={validation.invalid && validation.invalid_field == 'expected_participation__c'}
                        label={'No. of Attachment'}
                        editable={selectMyOutstationExpense.status__c !== 'Approved' ? true : false}
                    />

                    {this.state.attachmentList}


                    <View style={Style.buttonContainer}>
                        <BlueButton
                            style={Style.button}
                            rounded
                            large
                            title={'SAVE'}
                            disabled={this.props.updateOutstationExpenseLoader}
                            loading={this.props.updateOutstationExpenseLoader}
                            onPress={() => this.submit()}
                        />
                    </View>

                </ScrollView>
            </View >
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    outstationForm: state.outstations.outstationForm,
    validation: state.outstations.outstationFormValidation,
    selectMyOutstationExpense: state.outstations.selectMyOutstationExpense,
    updateOutstationExpenseLoader: state.outstations.updateOutstationExpenseLoader
})

const mapDispatchToProps = (dispatch) => ({
    changeOutstationForm: (params) => dispatch(OutstationAction.changeOutstationForm(params)),
    updateOutstationExpense: (params) => dispatch(OutstationAction.updateOutstationExpense(params)),
    clearOutstationForm: () => dispatch(OutstationAction.clearOutstationForm()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutstationAttachmentScreen)

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

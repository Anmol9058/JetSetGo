import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import WhiteButton from 'App/Components/WhiteButton';
import { ApplicationStyles } from 'App/Theme';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { connect } from 'react-redux';
import EventActions from '../../../Stores/Events/Actions';
import Style from './TourAttachmentStyle';


let extractData = {};
class TourAttachmentScreen extends Component {
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
        this.props.clearEventForm();
    }

    submit() {
        this.props.updateEvent({
            ...this.props.eventForm, ...{
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
        const { eventForm, validation, meetingListType, targetAudienceType, selectedEvent } = this.props;

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
                        editable={selectedEvent.status__c !== 'Approved' ? true : false}
                    />

                    {this.state.attachmentList}


                    <View style={Style.buttonContainer}>
                        <BlueButton
                            style={Style.button}
                            rounded
                            large
                            title={'SAVE'}
                            disabled={this.props.createEventLoader}
                            loading={this.props.createEventLoader}
                            onPress={() => this.submit()}
                        />
                    </View>

                </ScrollView>
            </View >
        )
    }
}

const mapStateToProps = (state) => ({
    meetingListType: state.events.meetingListType,
    token: state.user.token,
    agentid: state.user.id,
    eventOffset: state.events.eventOffset,
    eventLimit: state.events.eventLimit,
    eventForm: state.events.eventForm,
    validation: state.events.eventFormValidation,
    createEventLoader: state.events.createEventLoader,
    agentAreas: state.user.agentAreas,
    checkedStatus: state.events.checkedStatus,
    retailerSearchableList: state.events.retailerSearchableList,
    selectedEvent: state.events.selectedEvent,
    targetAudienceType: state.events.targetAudienceType

})

const mapDispatchToProps = (dispatch) => ({
    changeEventForm: (params) => dispatch(EventActions.changeEventForm(params)),
    updateEvent: (params) => dispatch(EventActions.updateEvent(params)),
    extractFormData: (params) => dispatch(EventActions.extractFormData(params)),
    clearEventForm: () => dispatch(EventActions.clearEventForm()),
    changeCheckedStatus: () => dispatch(EventActions.changeCheckedStatus())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourAttachmentScreen)

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

import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import InputText from 'App/Components/FormInput/InputText';
import SearchableDropdown from 'App/Components/SearchableDropdown';
import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import BackArrowButton from '../../../Components/BackArrowButton/BackArrowButton';
import CheckBoxContainer from '../../../Components/Checkox/Checkbox';
import InputDate from '../../../Components/FormInput/InputDate';
import TextArea from '../../../Components/FormInput/TextArea';
import Select from '../../../Components/Select/Select';
import { BUDGET, EVENT_DATE, EVENT_NAME, EXPECTED_PARTICIPATION, NEW_EVENT, VENUE_DETAILS } from '../../../Constants/index';
import { HelperService } from '../../../Services/Utils/HelperService';
import EventActions from '../../../Stores/Events/Actions';
import Style from './NewEventStyle';

class NewEventScreen extends Component {
    componentDidMount() {
        this.props.changeEventForm({ edited_field: 'status__c', edited_value: this.props.checkedStatus ? 'Pending for Approval' : 'Draft' })
        this.props.changeEventForm({ edited_field: 'type__c', edited_value: 'nukkad meet' });
        this.props.changeEventForm({ edited_field: 'asm__c', edited_value: this.props.agentid })
        this.props.changeEventForm({ edited_field: 'target_audience__c', edited_value: 'Electricians' })
    }

    componentWillUnmount() {
        this.props.clearEventForm();
    }

    submit() {
        this.props.createEvent({
            ...this.props.eventForm, ...{
                token: this.props.token,
                agentid: this.props.agentid
            }
        });
    }

    render() {
        const { eventForm, validation, meetingListType, targetAudienceType } = this.props;

        return (
            <View style={Style.container}>
                
                <Text style={Style.heading}>{NEW_EVENT}</Text>
                <ScrollView style={Style.action}>
                    <InputText
                        style={Style.mb10}
                        placeholder={EVENT_NAME + '*'}
                        value={eventForm.name}
                        onChange={(value) => this.props.changeEventForm({ edited_field: 'name', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'name'}
                        label={'Event Name*'}
                    />

                    <InputDate
                        style={Style.mb10}
                        placeholder={'Select Date'}
                        value={eventForm.event_date__c}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            this.props.changeEventForm({ edited_field: 'event_date__c', edited_value: formattedDate });
                        }}
                        error={validation.invalid && validation.invalid_field == 'event_date__c'}
                        label={'Event Date*'}
                    />

                    <SearchableDropdown
                        dataSource={this.props.agentAreas}
                        placeHolderText={'Select Area*'}
                        selectedValue={eventForm.area__c}
                        onChange={(value) => this.props.changeEventForm({ edited_field: 'area__c', edited_value: value })}
                        placeholder={'Type or Select Area'}
                        invalid={false}
                        customPickerStyles={{ ...Style.picker }}
                        labelStyles={{ ...Style.pickerLabel }}
                        invalid={validation.invalid && validation.invalid_field == 'area__c'}
                        label={'Area*'}
                    />

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`${BUDGET}*`}
                        value={eventForm.budget__c}
                        onChange={(value) => this.props.changeEventForm({ edited_field: 'budget__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'budget__c'}
                        label={'Budget*'}
                    />

                    <Select style={Style.picker}
                        label={'Select meet type*'}
                        selected={eventForm.type__c}
                        list={meetingListType}
                        onChange={(value) => {
                            this.props.changeEventForm({ edited_field: 'type__c', edited_value: value })
                        }}
                    />


                    <InputNumber
                        style={Style.mb10}
                        placeholder={`${EXPECTED_PARTICIPATION}*`}
                        value={eventForm.expected_participation__c}
                        onChange={(value) => this.props.changeEventForm({ edited_field: 'expected_participation__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'expected_participation__c'}
                        label={'Expected Participation'}
                    />

                    <Select style={Style.picker}
                        label={'Target Audience*'}
                        selected={eventForm.target_audience__c}
                        list={targetAudienceType}
                        onChange={(value) => {
                            this.props.changeEventForm({ edited_field: 'target_audience__c', edited_value: value })
                        }}
                    />

                    {/* <TextArea
                        placeholder={VENUE_DETAILS}
                        numberOfLines={5}
                        value={eventForm.venue_details__c}
                        error={validation.invalid && validation.invalid_field == 'venue_details__c'}
                        onChange={(value) => this.props.changeEventForm({ edited_field: 'venue_details__c', edited_value: value })}
                    /> */}

                    <CheckBoxContainer
                        label={'Submit For Approval'}
                        handleClick={() => {
                            this.props.changeCheckedStatus();
                            this.props.changeEventForm({ edited_field: 'status__c', edited_value: !this.props.checkedStatus ? 'Submit for approval' : 'draft' })
                        }
                        }
                        status={this.props.checkedStatus}
                    />

                    <View style={Style.buttonContainer}>
                        <BlueButton
                            style={Style.button}
                            rounded
                            large
                            title={'SAVE'}
                            disabled={this.props.createEventLoader}
                            loading={this.props.createEventLoader}
                            onPress={() => {
                                this.submit()
                            }}
                        />
                    </View>

                </ScrollView>
            </View>
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
    targetAudienceType: state.events.targetAudienceType
})

const mapDispatchToProps = (dispatch) => ({
    changeEventForm: (params) => dispatch(EventActions.changeEventForm(params)),
    createEvent: (params) => dispatch(EventActions.createEvent(params)),
    clearEventForm: () => dispatch(EventActions.clearEventForm()),
    changeCheckedStatus: () => dispatch(EventActions.changeCheckedStatus())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewEventScreen)

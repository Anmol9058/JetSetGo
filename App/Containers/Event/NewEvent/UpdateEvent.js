import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import InputText from 'App/Components/FormInput/InputText';
import SearchableDropdown from 'App/Components/SearchableDropdown';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import CheckBoxContainer from '../../../Components/Checkox/Checkbox';
import InputDate from '../../../Components/FormInput/InputDate';
import TextArea from '../../../Components/FormInput/TextArea';
import Select from '../../../Components/Select/Select';
import { ACTUAL_EXPENSE, SAVE, BUDGET, EVENT_DATE, EVENT_NAME, EXPECTED_PARTICIPATION, UPDATE_EVENT, VENUE_DETAILS } from '../../../Constants/index';
import EventActions from '../../../Stores/Events/Actions';
import Style from './NewEventStyle';
import ImagePicker from 'App/Components/ImagePicker';
import GenericIcon from 'App/Components/GenericIcon';
import { HelperService } from '../../../Services/Utils/HelperService';



class UpdateEvent extends Component {
    componentDidMount() {
        this.props.extractFormData(this.props.selectedEvent)
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

    render() {
        const { eventForm, validation, meetingListType, targetAudienceType, selectedEvent } = this.props;

        return (
            <View style={Style.container}>
                <Text style={Style.heading}>{UPDATE_EVENT}</Text>
                <ScrollView style={Style.action}>
                    <InputText
                        style={Style.mb10}
                        placeholder={EVENT_NAME + '*'}
                        value={eventForm.name}
                        onChange={(value) => this.props.changeEventForm({ edited_field: 'name', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'name'}
                        label={'Event Name*'}
                        editable={selectedEvent.status__c !== 'Approved' ? true : false}
                    />

                    <InputDate
                        style={Style.mb10}
                        placeholder={EVENT_DATE + '*'}
                        value={eventForm.event_date__c}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            this.props.changeEventForm({ edited_field: 'event_date__c', edited_value: formattedDate });
                        }}
                        error={validation.invalid && validation.invalid_field == 'event_date__c'}
                        label={'Event Date*'}
                        editable={selectedEvent.status__c !== 'Approved' ? false : true}
                    />

                    <SearchableDropdown
                        key={eventForm.area__c}
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
                        disabled={selectedEvent.status__c !== 'Approved' ? false : true}
                    />

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`${BUDGET}*`}
                        value={eventForm.budget__c}
                        onChange={(value) => this.props.changeEventForm({ edited_field: 'budget__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'budget__c'}
                        label={'Budget*'}
                        editable={selectedEvent.status__c !== 'Approved' ? true : false}
                    />

                    <Select style={Style.picker}
                        label={'Select meet type*'}
                        selected={eventForm.type__c}
                        list={meetingListType}
                        onChange={(value) => {
                            this.props.changeEventForm({ edited_field: 'type__c', edited_value: value })
                        }}
                        editable={selectedEvent.status__c !== 'Approved' ? true : false}
                    />


                    <InputNumber
                        style={Style.mb10}
                        placeholder={`${EXPECTED_PARTICIPATION}*`}
                        value={eventForm.expected_participation__c}
                        onChange={(value) => this.props.changeEventForm({ edited_field: 'expected_participation__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'expected_participation__c'}
                        label={'Expected Participation'}
                        editable={selectedEvent.status__c !== 'Approved' ? true : false}
                    />

                    <Select style={Style.picker}
                        label={'Target Audience*'}
                        selected={eventForm.target_audience__c}
                        list={targetAudienceType}
                        onChange={(value) => {
                            this.props.changeEventForm({ edited_field: 'target_audience__c', edited_value: value })
                        }}
                        editable={selectedEvent.status__c !== 'Approved' ? true : false}
                    />

                    <TextArea
                        placeholder={VENUE_DETAILS}
                        numberOfLines={5}
                        value={eventForm.venue_details__c}
                        error={validation.invalid && validation.invalid_field == 'venue_details__c'}
                        onChange={(value) => this.props.changeEventForm({ edited_field: 'venue_details__c', edited_value: value })}
                        disable={selectedEvent.status__c !== 'Approved' ? false : true}
                    />

                    <View style={{ marginTop: 10 }}></View>
                    {selectedEvent.status__c === 'Approved' && <InputText
                        style={Style.mb10}
                        placeholder={ACTUAL_EXPENSE}
                        value={eventForm.actual_expense__c}
                        onChange={(value) => this.props.changeEventForm({ edited_field: 'actual_expense__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'actual_expense__c'}
                        label={'Actual Expense'}
                    />}

                    {selectedEvent.status__c !== 'Approved' && <CheckBoxContainer
                        label={'Submit For Approval'}
                        handleClick={() => {
                            this.props.changeCheckedStatus();
                            this.props.changeEventForm({ edited_field: 'status__c', edited_value: !this.props.checkedStatus ? 'Submit for approval' : 'draft' })
                        }
                        }
                        status={this.props.checkedStatus}
                    />}

                    {selectedEvent.status__c === 'Approved' && <View style={{ ...Style.bottomMargin }}>
                        <ImagePicker
                            image={eventForm.picture__c}
                            onImageSuccess={({ image }) => this.props.changeEventForm({ edited_field: 'picture__c', edited_value: image })}>
                            <View style={Style.recurringActionButton}>
                                <Text style={Style.recurringActionButtonText}>
                                    <GenericIcon
                                        name="camera"
                                        style={Style.recurringActionButtonIcon}
                                    />
                                    {'  Take pictur'}
                                </Text>

                            </View>
                        </ImagePicker>
                    </View>}

                    {selectedEvent.status__c === 'Approved' && <TextArea
                        placeholder={'Remarks'}
                        numberOfLines={5}
                        value={eventForm.remarks__c}
                        error={validation.invalid && validation.invalid_field == 'remarks__c'}
                        onChange={(value) => this.props.changeEventForm({ edited_field: 'remarks__c', edited_value: value })}
                    />}

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
)(UpdateEvent)

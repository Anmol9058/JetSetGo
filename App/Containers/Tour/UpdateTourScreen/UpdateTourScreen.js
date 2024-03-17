import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Select from '../../../Components/Select/Select';
import TourAction from '../../../Stores/Tour/Actions';
import Style from './UpdateTourScreenStyle';
import TextArea from '../../../Components/FormInput/TextArea'

class UpdateTourScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.clearForm();
        this.props.changeTourForm({ edited_field: 'Travel_By__c', edited_value: 'Two Wheeler' })
        this.props.changeTourForm({ edited_field: 'tour_status__c', edited_value: 'Draft' })
    }

    clearForm = async () => {
        await this.props.clearTourForm();
    }


    submit() {
        this.props.updateTour({
            ...this.props.tourForm,
            ...{
                token: this.props.token,
                agentid: this.props.agentid,
                sfid: this.props.selectMyTour.sfid
            }
        });
    }

    render() {
        const { tourForm, validation, modeOfTravelList } = this.props;

        return (
            <View style={Style.container}>
                <ScrollView style={Style.action}>


                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Food*`}
                        value={tourForm.food__c}
                        onChange={(value) => this.props.changeTourForm({ edited_field: 'food__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'food__c'}
                        label={'Food'}
                    />


                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Hotel*`}
                        value={tourForm.hotel__c}
                        onChange={(value) => this.props.changeTourForm({ edited_field: 'hotel__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'hotel__c'}
                        label={'Hotel'}
                    />

                    <InputNumber
                        style={Style.mb10}
                        placeholder={`Company Paid*`}
                        value={tourForm.Comapny_Paid__c}
                        onChange={(value) => this.props.changeTourForm({ edited_field: 'Comapny_Paid__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'Comapny_Paid__c'}
                        label={'Company Paid'}
                    />


                    <Select style={Style.picker}
                        label={'Select mode of travel*'}
                        selected={tourForm.Travel_By__c}
                        list={modeOfTravelList}
                        onChange={(value) => {
                            this.props.changeTourForm({ edited_field: 'Travel_By__c', edited_value: value })
                        }}
                    />


                    <TextArea
                        placeholder={'Travel Remarks....'}
                        numberOfLines={5}
                        value={tourForm.Travel_Details__c}
                        error={validation.invalid && validation.invalid_field == 'Travel_Details__c'}
                        onChange={(value) => this.props.changeTourForm({ edited_field: 'Travel_Details__c', edited_value: value })}
                    />


                    <View style={Style.buttonContainer}>
                        <BlueButton
                            style={Style.button}
                            rounded
                            large
                            title={'SAVE'}
                            disabled={this.props.updateTourLoader}
                            loading={this.props.updateTourLoader}
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
    selectMyTour: state.tours.selectMyTour,
    tourForm: state.tours.tourForm,
    validation: state.tours.tourFormValidation,
    updateTourLoader: state.tours.updateTourLoader,
    modeOfTravelList: state.tours.modeOfTravelList


})

const mapDispatchToProps = (dispatch) => ({
    changeTourForm: (params) => dispatch(TourAction.changeTourForm(params)),
    updateTour: (params) => dispatch(TourAction.updateTour(params)),
    clearTourForm: () => dispatch(TourAction.clearTourForm())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateTourScreen);

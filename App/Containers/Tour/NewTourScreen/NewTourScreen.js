import BlueButton from 'App/Components/BlueButton';
import SearchableDropdown from 'App/Components/SearchableDropdown';
import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import InputDate from '../../../Components/FormInput/InputDate';
import TextArea from '../../../Components/FormInput/TextArea';
import { HelperService } from '../../../Services/Utils/HelperService';
import TourAction from '../../../Stores/Tour/Actions';
import Style from './NewTourScreenStyle';
import { Icon } from 'native-base';
import { Colors } from 'App/Theme';

let cityListSize = 0;
class NewTourScreen extends Component {

    state = {
        index: 2,
        attachmentList: []
    }

    async componentDidMount() {
        await this.props.fetchCities({
            token: this.props.token,
            agentid: this.props.agentid
        })
        cityListSize = this.props.cityList.length;
        this.props.clearTourForm();
    }

    submit() {
        this.props.createTour({
            ...this.props.tourForm, ...{
                token: this.props.token,
                agentid: this.props.agentid
            }
        });
    }

    addCity = () => {
        const { index, attachmentList } = this.state;
        const { tourForm, cityList } = this.props;
        if (index < 15) {
            this.setState({ index: index + 1 });
            let componentArr = [];
            let customComponent = <SearchableDropdown
                dataSource={cityList}
                placeHolderText={`Select City`}
                selectedValue={tourForm[`city_${index}__c`]}
                onChange={(value) => this.props.changeTourForm({ edited_field: `city_${index}__c`, edited_value: value })}
                placeholder={'Type or Select City'}
                invalid={false}
                customPickerStyles={{ ...Style.picker }}
                labelStyles={{ ...Style.pickerLabel }}
                // invalid={validation.invalid && validation.invalid_field == `city_${i + 1}__c`}
                label={`Select City ${index}*`}
            />
            componentArr.push(customComponent);
            this.setState({ attachmentList: [...this.state.attachmentList, componentArr] });
        }
    }


    render() {
        const { cityList, tourForm, validation } = this.props;
        const { attachmentList } = this.state;
        return (
            <View style={Style.container}>
                <Text style={Style.heading}>{'NEW TOUR'}</Text>
                <ScrollView style={Style.action}>

                    <InputDate
                        style={Style.mb10}
                        placeholder={'From Date*'}
                        value={tourForm.tour_from__c}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            this.props.changeTourForm({ edited_field: 'tour_from__c', edited_value: formattedDate });
                        }}
                        error={validation.invalid && validation.invalid_field == 'tour_from__c'}
                        label={'From Date*'}
                    />

                    <InputDate
                        style={Style.mb10}
                        placeholder={'To Date*'}
                        value={tourForm.tour_to__c}
                        onChange={(value) => {
                            let formattedDate = HelperService.convertMomentDateToTimestamp(value);
                            this.props.changeTourForm({ edited_field: 'tour_to__c', edited_value: formattedDate });
                        }}
                        error={validation.invalid && validation.invalid_field == 'tour_to__c'}
                        label={'To Date*'}
                    />

                    <TextArea
                        style={{ marginBottom: 8 }}
                        placeholder={'Tour Purpose'}
                        numberOfLines={5}
                        value={tourForm.tour_purpose__c}
                        error={validation.invalid && validation.invalid_field == 'tour_purpose__c'}
                        onChange={(value) => this.props.changeTourForm({ edited_field: 'tour_purpose__c', edited_value: value })}
                    />

                    <SearchableDropdown
                        dataSource={cityList}
                        placeHolderText={`Select City 1`}
                        selectedValue={tourForm[`city_1__c`]}
                        onChange={(value) => this.props.changeTourForm({ edited_field: `city_1__c`, edited_value: value })}
                        placeholder={'Type or Select Area'}
                        invalid={false}
                        style={{}}
                        customPickerStyles={{ ...Style.picker }}
                        labelStyles={{ ...Style.pickerLabel }}
                        // invalid={validation.invalid && validation.invalid_field == `city_${i + 1}__c`}
                        label={`Select City 1*`}
                    />

                    {attachmentList}

                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableWithoutFeedback onPress={() => this.addCity()} style={Style.addContainer}>
                            <View style={Style.viewContainer}>
                                <Icon
                                    type="FontAwesome"
                                    name={'plus'}
                                    style={{ color: Colors.button, fontSize: 16, }}
                                />
                                <Text style={{ marginLeft: 5, color: Colors.button }}>Add City</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>


                    <View style={Style.buttonContainer}>
                        <BlueButton
                            style={Style.button}
                            rounded
                            large
                            title={'SAVE'}
                            disabled={this.props.createTourLoader}
                            loading={this.props.createTourLoader}
                            onPress={() => this.submit()}
                        />
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    tourForm: state.tours.tourForm,
    validation: state.tours.tourFormValidation,
    createTourLoader: state.tours.createTourLoader,
    cityList: state.tours.cityList
})

const mapDispatchToProps = (dispatch) => ({
    changeTourForm: (params) => dispatch(TourAction.changeTourForm(params)),
    createTour: (params) => dispatch(TourAction.createTour(params)),
    clearTourForm: () => dispatch(TourAction.clearTourForm()),
    fetchCities: (params) => dispatch(TourAction.fetchCities(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewTourScreen)

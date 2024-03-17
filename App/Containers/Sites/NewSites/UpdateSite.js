import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import InputText from 'App/Components/FormInput/InputText';
import SearchableDropdown from 'App/Components/SearchableDropdown';
import { SUBMIT } from 'App/Constants';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Select from '../../../Components/Select/Select';
import SiteActions from '../../../Stores/Sites/Actions';
import Style from './NewSitesStyle';

class UpdateSite extends Component {
    componentDidMount() {
        this.props.extractFormData(this.props.selectedSite);
    }

    componentWillUnmount() {
        this.props.clearSiteForm();
    }

    submit() {
        this.props.updateSite({
            ...this.props.siteForm, ...{
                token: this.props.token,
                agentid: this.props.agentid,
                id: this.props.selectedSite.pg_id__c
            }
        });
    }

    render() {
        const { siteForm, validation, projectType, sourceType, statusType, siteStagesType, selectedSite } = this.props;
        return (
            <View style={Style.container}>
                <Text style={Style.heading}>{'UPDATE LEAD'}</Text>
                <ScrollView style={Style.action}>

                    <InputText
                        style={Style.mb10}
                        placeholder={'Lead Name*'}
                        value={siteForm.name}
                        onChange={(value) => this.props.changeSiteForm({ edited_field: 'name', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'name'}
                        label={'Name*'}
                    />

                    <InputText
                        style={Style.mb10}
                        placeholder={'Email'}
                        value={siteForm.email__c}
                        onChange={(value) => this.props.changeSiteForm({ edited_field: 'email__c', edited_value: value })}
                        label={'Email'}
                    />

                    <InputNumber
                        styles={Style.mb10}
                        placeholder={'Phone Number' + '*'}
                        value={siteForm.phone__c}
                        onChange={(value) => this.props.changeSiteForm({ edited_field: 'phone__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'phone__c'}
                        label={'Phone*'}
                    />

                    <InputNumber
                        styles={Style.mb10}
                        placeholder={'Alternate Phone Number'}
                        value={siteForm.alternate_phone_no__c}
                        onChange={(value) => this.props.changeSiteForm({ edited_field: 'alternate_phone_no__c', edited_value: value })}
                        label={'Alternate Phone Number'}
                    />


                    <InputText
                        style={Style.mb10}
                        placeholder={'Address Line 1*'}
                        value={siteForm.address_line_1__c}
                        onChange={(value) => this.props.changeSiteForm({ edited_field: 'address_line_1__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'address_line_1__c'}
                        label={'Addres Line 1*'}
                    />

                    <InputText
                        style={Style.mb10}
                        placeholder={'Address Line 2'}
                        value={siteForm.address_line_2__c}
                        onChange={(value) => this.props.changeSiteForm({ edited_field: 'address_line_2__c', edited_value: value })}
                        label={'Address Line 2'}
                    />


                    <SearchableDropdown
                        dataSource={this.props.agentAreas}
                        placeHolderText={'Select Area*'}
                        selectedValue={selectedSite.area__c}
                        onChange={(value) => this.props.changeSiteForm({ edited_field: 'area__c', edited_value: value })}
                        placeholder={'Type or Select Area'}
                        invalid={false}
                        customPickerStyles={{ ...Style.pickerStyle }}
                        labelStyles={{ ...Style.pickerLabel }}
                        invalid={validation.invalid && validation.invalid_field == 'area__c'}
                        label={'Area*'}
                    />

                    <SearchableDropdown
                        dataSource={this.props.dealersSearchList}
                        placeHolderText={'Select Dealer'}
                        selectedValue={selectedSite.dealer__c}
                        onChange={(value) => this.props.changeSiteForm({ edited_field: 'dealer__c', edited_value: value })}
                        placeholder={'Type or Select Dealer'}
                        invalid={false}
                        customPickerStyles={{ ...Style.pickerStyle }}
                        labelStyles={{ ...Style.pickerLabel }}
                        invalid={validation.invalid && validation.invalid_field == 'dealer__c'}
                        label={'Dealer'}
                    />

                    <SearchableDropdown
                        dataSource={this.props.retailersSearchList}
                        placeHolderText={'Select Retailer'}
                        selectedValue={selectedSite.retailer__c}
                        onChange={(value) => this.props.changeSiteForm({ edited_field: 'retailer__c', edited_value: value })}
                        placeholder={'Type or Select Retailer'}
                        invalid={false}
                        customPickerStyles={{ ...Style.pickerStyle }}
                        invalid={validation.invalid && validation.invalid_field == 'retailer__c'}
                        labelStyles={{ ...Style.pickerLabel }}
                        label={'Retailer'}
                    />


                    <InputNumber
                        styles={Style.mb10}
                        placeholder={'Size'}
                        value={siteForm.size__c}
                        onChange={(value) => this.props.changeSiteForm({ edited_field: 'size__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'size__c'}
                        label={'Size*'}
                    />

                    <Select style={Style.picker}
                        label={'Project Type'}
                        selected={siteForm.project_type__c}
                        list={projectType}
                        onChange={(value) => {
                            this.props.changeSiteForm({ edited_field: 'project_type__c', edited_value: value })
                        }}
                    />

                    <SearchableDropdown
                        dataSource={this.props.influencerSearchList}
                        placeHolderText={'Select Source'}
                        selectedValue={selectedSite.source__c}
                        onChange={(value) => this.props.changeSiteForm({ edited_field: 'source__c', edited_value: value })}
                        placeholder={'Type or Select Source'}
                        invalid={false}
                        customPickerStyles={{ ...Style.pickerStyle }}
                        labelStyles={{ ...Style.pickerLabel }}
                        invalid={validation.invalid && validation.invalid_field == 'source__c'}
                        label={'Source'}
                    />


                    <Select style={Style.picker}
                        label={'Source Type*'}
                        selected={siteForm.source_type__c}
                        list={sourceType}
                        onChange={(value) => {
                            this.props.changeSiteForm({ edited_field: 'source_type__c', edited_value: value })
                        }}
                    />

                    <Select style={Style.picker}
                        label={'Status Type*'}
                        selected={siteForm.status__c}
                        list={statusType}
                        onChange={(value) => {
                            this.props.changeSiteForm({ edited_field: 'status__c', edited_value: value })
                        }}
                    />

                    <Select style={Style.picker}
                        label={'Lead Stages Type*'}
                        selected={siteForm.site_stages__c}
                        list={siteStagesType}
                        onChange={(value) => {
                            this.props.changeSiteForm({ edited_field: 'site_stages__c', edited_value: value })
                        }}
                    />

                    <BlueButton
                        style={Style.button}
                        rounded
                        large
                        title={SUBMIT}
                        onPress={() => this.submit()}
                    />
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    sitesOffset: state.sites.sitesOffset,
    sitesLimit: state.sites.sitesLimit,
    siteForm: state.sites.siteForm,
    validation: state.sites.siteFormValidation,
    dealersSearchList: state.sites.dealerSearchableList,
    retailersSearchList: state.sites.retailerSearchableList,
    influencerSearchList: state.sites.influencerSearchableList,
    agentAreas: state.user.agentAreas,
    projectType: state.sites.projectType,
    statusType: state.sites.statusType,
    siteStagesType: state.sites.siteStagesType,
    sourceType: state.sites.sourceType,
    selectedSite: state.sites.selectedSite
})

const mapDispatchToProps = (dispatch) => ({
    updateSite: (params) => dispatch(SiteActions.updateSite(params)),
    extractFormData: (params) => dispatch(SiteActions.extractFormData(params)),
    changeSiteForm: (params) => dispatch(SiteActions.changeSiteForm(params)),
    clearSiteForm: () => dispatch(SiteActions.clearSiteForm())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateSite)

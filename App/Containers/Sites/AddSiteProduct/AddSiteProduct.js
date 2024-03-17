import BlueButton from 'App/Components/BlueButton';
import InputNumber from 'App/Components/FormInput/InputNumber';
import InputText from 'App/Components/FormInput/InputText';
import SearchableDropdown from 'App/Components/SearchableDropdown';
import { SUBMIT } from 'App/Constants';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Style from './AddSiteProductStyle';
import SiteActions from '../../../Stores/Sites/Actions';
import ProductActions from '../../../Stores/Products/Actions';
import { HelperService } from '../../../Services/Utils/HelperService';

// NewSiteLayout
class NewSiteProduct extends Component {

    componentDidMount() {
        const { selectedSite } = this.props;
        this.props.clearSiteProductForm();
        this.props.changeSiteProductForm({ edited_field: 'sites__c', edited_value: selectedSite.sfid })
        this.props.changeSiteProductForm({ edited_field: 'sfid__c', edited_value: selectedSite.sfid });
        this.props.changeSiteProductForm({ edited_field: 'site_pg_id__c', edited_value: selectedSite.pg_id__c })
        this.props.changeSiteProductForm({ edited_field: 'asm__c', edited_value: this.props.agentid })
    }

    componentWillUnmount() { }

    submit() {
        this.props.createSiteProduct({
            ...this.props.siteProductForm, ...{
                token: this.props.token,
                agentid: this.props.agentid,
                id: this.props.selectedSite.pg_id__c  
            }
        });
    }

    render() {
        const { siteProductForm, validation, psmList, productList, productCategoryList, productSubCategoryList, productSubSubCategoryList } = this.props;
        return (
            <View style={Style.container}>
                <Text style={Style.heading}>{'NEW LEAD PRODUCT'}</Text>
                <ScrollView style={Style.action}>

                    <InputText
                        style={Style.mb10}
                        placeholder={'LeadProduct Name*'}
                        value={siteProductForm.name}
                        onChange={(value) => this.props.changeSiteProductForm({ edited_field: 'name', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'name'}
                        label={'LeadProduct Name*'}
                    />

                    <SearchableDropdown
                        dataSource={psmList}
                        placeHolderText={'PSM*'}
                        selectedValue={siteProductForm.psm__c}
                        onChange={(value) => this.props.changeSiteProductForm({ edited_field: 'psm__c', edited_value: value })}
                        placeholder={'Type or Select PSM'}
                        invalid={false}
                        customPickerStyles={{ ...Style.picker }}
                        labelStyles={{ ...Style.pickerLabel }}
                        invalid={validation.invalid && validation.invalid_field == 'psm__c'}
                        label={'SELECT PSM*'}
                    />


                <SearchableDropdown
                        dataSource={HelperService.convertArrToRNPickerObj(productList, 'name')}
                        placeHolderText={'Product*'}
                        selectedValue={siteProductForm.product__c}
                        onChange={(value) => this.props.changeSiteProductForm({ edited_field: 'product__c', edited_value: value })}
                        placeholder={'Type or Select Product'}
                        invalid={false}
                        customPickerStyles={{ ...Style.picker }}
                        labelStyles={{ ...Style.pickerLabel }}
                        invalid={validation.invalid && validation.invalid_field == 'product__c'}
                        label={'Select Product'}
                    />

                    <SearchableDropdown
                        dataSource={HelperService.convertArrToRNPickerObj(productCategoryList, 'category_name__c')}
                        placeHolderText={'Product Category'}
                        selectedValue={siteProductForm.product_category__c}
                        onChange={(value) => this.props.changeSiteProductForm({ edited_field: 'product_category__c', edited_value: value })}
                        placeholder={'Type or Select Product Category'}
                        invalid={false}
                        customPickerStyles={{ ...Style.picker }}
                        labelStyles={{ ...Style.pickerLabel }}
                        invalid={validation.invalid && validation.invalid_field == 'product_category__c'}
                        label={'Select Product Category'}
                    />

                    <SearchableDropdown
                        dataSource={HelperService.convertArrToRNPickerObj(productSubCategoryList, 'product_sub_category_name__c')}
                        placeHolderText={'Product Sub Category'}
                        selectedValue={siteProductForm.product_sub_category__c}
                        onChange={(value) => this.props.changeSiteProductForm({ edited_field: 'product_sub_category__c', edited_value: value })}
                        placeholder={'Type or Select Product Sub Category'}
                        invalid={false}
                        customPickerStyles={{ ...Style.picker }}
                        invalid={validation.invalid && validation.invalid_field == 'product_sub_category__c'}
                        labelStyles={{ ...Style.pickerLabel }}
                        label={'Select Product Sub Category'}
                    />

                    <SearchableDropdown
                        dataSource={HelperService.convertArrToRNPickerObj(productSubSubCategoryList, 'product_sub_sub_category_name__c')}
                        placeHolderText={'Product Sub Sub Category'}
                        selectedValue={siteProductForm.product_sub_sub_category__c}
                        onChange={(value) => this.props.changeSiteProductForm({ edited_field: 'product_sub_sub_category__c', edited_value: value })}
                        placeholder={'Type or Product Sub Sub Category'}
                        invalid={false}
                        customPickerStyles={{ ...Style.picker }}
                        labelStyles={{ ...Style.pickerLabel }}
                        invalid={validation.invalid && validation.invalid_field == 'product_sub_sub_category__c'}
                        label={'Select Product Sub Sub Category'}
                    />


                    <InputNumber
                        styles={Style.mb10}
                        placeholder={'Quantity'}
                        value={siteProductForm.quantity__c}
                        onChange={(value) => this.props.changeSiteProductForm({ edited_field: 'quantity__c', edited_value: value })}
                        error={validation.invalid && validation.invalid_field == 'quantity__c'}
                        label={'Quantity*'}
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
    siteProductForm: state.sites.siteProductForm,
    validation: state.sites.siteProductFormValidation,
    selectedValue: state.sites.selectedValue,
    psmList: state.user.psmList,
    productList: state.products.productList,
    productCategoryList: state.products.productCategoryList,
    productSubCategoryList: state.products.productSubCategoryList,
    productSubSubCategoryList: state.products.productSubSubCategoryList,
    selectedSite: state.sites.selectedSite

});

const mapDispatchToProps = (dispatch) => ({
    changeSiteProductForm: (params) => dispatch(SiteActions.changeSiteProductForm(params)),
    createSiteProduct: (params) => dispatch(SiteActions.createSiteProduct(params)),
    clearSiteProductForm: () => dispatch(SiteActions.clearSiteProductForm())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewSiteProduct)

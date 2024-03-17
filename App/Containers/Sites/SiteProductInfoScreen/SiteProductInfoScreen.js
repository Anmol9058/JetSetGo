import InfoDisplay from 'App/Components/InfoDisplay';
import Loading from 'App/Components/Loading';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import SiteProductInfoTuple from '../SiteProductInfoTuple/SiteProductInfoTuple';
import Style from './SiteProductInfoScreenStyle';
import { HelperService } from '../../../Services/Utils/HelperService';

class SiteProductInfoScreen extends Component {

    render() {
        const { selectedSiteProduct, agentAreas } = this.props;
        if (!selectedSiteProduct) {
            return (
                <View style={Style.parentContainer}>
                    <Loading />
                </View>
            );
        }

        return (
            <View style={Style.parentContainer}>
                <SiteProductInfoTuple data={selectedSiteProduct} areas={agentAreas} />
                <View style={{ height: 15 }}></View>
                <ScrollView>
                    <InfoDisplay label={'Product'} value={HelperService.getNameFromSFID(this.props.productList, selectedSiteProduct.product__c, 'name')} />
                    <InfoDisplay label={'Product Category '} value={HelperService.getNameFromSFID(this.props.productCategoryList, selectedSiteProduct.product_category__c, 'category_name__c')} />
                    <InfoDisplay label={'Product Sub Category'} value={HelperService.getNameFromSFID(this.props.productSubCategoryList, selectedSiteProduct.product_sub_category__c, 'product_sub_category_name__c')} />
                    <InfoDisplay label={'Product Sub Sub Category'} value={HelperService.getNameFromSFID(this.props.productSubSubCategoryList, selectedSiteProduct.product_sub_sub_category__c || 'None', 'product_sub_sub_category_name__c')} />
                    <InfoDisplay label={'Quantity'} value={selectedSiteProduct.quantity__c || ''} />
                    <InfoDisplay label={'PSM'} value={HelperService.getNameFromSFID(this.props.psmList, selectedSiteProduct.psm__c || '')} />
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    agentAreas: state.user.agentAreas,
    selectedSiteProduct: state.sites.selectedSiteProduct,
    psmList: state.user.psmList,
    productList: state.products.productList,
    productCategoryList: state.products.productCategoryList,
    productSubCategoryList: state.products.productSubCategoryList,
    productSubSubCategoryList: state.products.productSubSubCategoryList

});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteProductInfoScreen)


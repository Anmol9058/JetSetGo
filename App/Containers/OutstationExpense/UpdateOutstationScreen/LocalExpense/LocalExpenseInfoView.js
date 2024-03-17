import InfoDisplay from 'App/Components/InfoDisplay';
import Loading from 'App/Components/Loading';
import LocalActions from 'App/Stores/LocalExpense/Actions';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { ScrollView, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import AttachmentDetail from '../../../../Components/AttachmentDetail';
import { HelperService } from '../../../../Services/Utils/HelperService';
import Style from '../../TeamOutstationView/InfoStyle';
import NavigationService from '../../../../Services/NavigationService';
import OutstationActions from '../../../../Stores/OutstationExpense/Actions';

class LocalExpenseInfoView extends Component {

    componentDidMount() {
        let selectedData = this.props.navigation.getParam('data');
        const { fetchLocalImage, token, agentid } = this.props;
        fetchLocalImage({
            token,
            agentid,
            id: selectedData.sfid
        })
    }

    render() {
        let selectedData = this.props.navigation.getParam('data');
        console.log(selectedData, "SELECTED DATA");
        if (!selectedData) {
            return (
                <View style={Style.parentContainer}>
                    <Loading />
                </View>
            );
        }
        const { retailerList, dealerList } = this.props;
        let retailer = HelperService.getNameFromSFID(retailerList, selectedData.customer__c);
        let dealer = HelperService.getNameFromSFID(dealerList, selectedData.customer__c);

        return (
            <View style={Style.parentContainer}>
                <ScrollView style={{ marginBottom: 20 }}>
                    <InfoDisplay label={retailer ? 'Retailer' : 'Dealer'} value={retailer ? retailer : dealer} />
                    <InfoDisplay label={'From'} value={selectedData.from__c || ''} />
                    <InfoDisplay label={'To'} value={selectedData.to__c || 'None'} />
                    <InfoDisplay label={'Mode of Travel'} value={selectedData.mode__c || 'None'} />
                    {/* <InfoDisplay label={'Have Bills'} value={selectedData.have_bills__c ? 'Yes' : 'No'} /> */}
                    <InfoDisplay label={'Km travelled'} value={Math.round(selectedData.kilometers_travelled__c || '0') + ' km'} />
                    <InfoDisplay label={'System Km travelled'} value={Math.round(selectedData.system_calculated_kilometer__c || '0') + ' km'} />

                    <InfoDisplay label={'Toll Parking'} value={HelperService.currencyValue(selectedData.toll_parking_charges__c || '0')} />
                    <InfoDisplay label={'Food'} value={HelperService.currencyValue(selectedData.food__c || '0')} />
                    <InfoDisplay label={'Amount'} value={HelperService.currencyValue(selectedData.amount__c || '0')} />
                    <InfoDisplay label={'Total Amount'} value={HelperService.currencyValue(selectedData.total_amount || '0')} />
                    <AttachmentDetail
                        label={'Attachment'}
                        imageList={this.props.localImageList}
                        loader={this.props.fetchLocalImageLoader}
                    />
                </ScrollView>
                <TouchableHighlight
                    style={Style.plusIcon}
                    onPress={() => {
                        this.props.selectLocalExpense(selectedData);
                        NavigationService.navigate('UpdateLocalExpense')
                    }
                    }>
                    <Icon
                        name={'ios-create'}
                        ios={'ios-create'}
                        android={'md-create'}
                        style={{ color: Colors.white, fontSize: 28, alignSelf: 'center' }}
                    />
                </TouchableHighlight>
            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    dealerList: state.retailers.dealersSearchList,
    retailerList: state.retailers.retailersSearchList,
    localImageList: state.local.localImageList,
    fetchLocalImageLoader: state.local.fetchLocalImageLoader,

});

const mapDispatchToProps = (dispatch) => ({
    clearSelectLocalItemExpense: () => dispatch(LocalActions.clearSelectLocalItemExpense()),
    fetchLocalImage: (params) => dispatch(LocalActions.fetchLocalImage(params)),
    selectLocalExpense: (params) => dispatch(OutstationActions.selectLocalExpense(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocalExpenseInfoView)



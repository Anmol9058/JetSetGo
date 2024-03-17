import InfoDisplay from 'App/Components/InfoDisplay';
import Loading from 'App/Components/Loading';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { HelperService } from '../../../Services/Utils/HelperService';
import Style from './TeamExpenseInfoStyle';
import LocalActions from 'App/Stores/LocalExpense/Actions';
import AttachmentDetail from '../../../Components/AttachmentDetail';

class TeamExpenseInfoScreen extends Component {

    componentDidMount() {
        let selectedData = this.props.selectTeamExpenseItem;
        const { fetchLocalImage, token, agentid } = this.props;
        fetchLocalImage({
            token,
            agentid,
            id: selectedData.sfid
        })
    }


    render() {
        let selectedData = this.props.selectTeamExpenseItem;

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
                <ScrollView>
                    <InfoDisplay label={retailer ? 'Retailer' : 'Dealer'} value={retailer ? retailer : dealer} />
                    <InfoDisplay label={'From'} value={selectedData.from__c || ''} />
                    <InfoDisplay label={'To'} value={selectedData.to__c || 'None'} />
                    <InfoDisplay label={'Food'} value={selectedData.food__c || '0'} />
                    <InfoDisplay label={'Have Bills'} value={selectedData.have_bills__c ? 'Yes' : 'No'} />
                    <InfoDisplay label={'Km travelled'} value={Math.round(selectedData.kilometers_travelled__c || '0') + ' km'} />
                    <InfoDisplay label={'System Km travelled'} value={Math.round(selectedData.system_calculated_kilometer__c || '0') + ' km'} />
                    <InfoDisplay label={'Mode of Travel'} value={selectedData.mode__c || 'Two wheeler'} />
                    <InfoDisplay label={'Toll Parking'} value={HelperService.currencyValue(selectedData.toll_parking_charges__c || '0')} />
                    <InfoDisplay label={'Amount'} value={HelperService.currencyValue(selectedData.amount__c || '0')} />
                    <InfoDisplay label={'Total Amount'} value={HelperService.currencyValue(selectedData.total_amount || '0')} />
                    <AttachmentDetail
                        label={'Attachment'}
                        imageList={this.props.localImageList}
                        loader={this.props.fetchLocalImageLoader}
                    />
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    dealerList: state.retailers.dealersSearchList,
    retailerList: state.retailers.retailersSearchList,
    selectTeamExpenseItem: state.local.selectTeamExpenseItem,
    localImageList: state.local.localImageList,
    fetchLocalImageLoader: state.local.fetchLocalImageLoader
});

const mapDispatchToProps = (dispatch) => ({
    clearSelectLocalItemExpense: () => dispatch(LocalActions.clearSelectLocalItemExpense()),
    fetchLocalImage: (params) => dispatch(LocalActions.fetchLocalImage(params)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamExpenseInfoScreen)
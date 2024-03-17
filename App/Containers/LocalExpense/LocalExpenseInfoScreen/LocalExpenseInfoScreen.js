import LocalActions from 'App/Stores/LocalExpense/Actions';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Style from './LocalExpenseInfoScreenStyle';
import LocalExpenseInfoTuple from '../LocalExpenseInfoTuple';
import { HelperService } from '../../../Services/Utils/HelperService';
import LocalInfoDisplay from '../LocalInfoDisplay';
import AttachmentDetail from '../../../Components/AttachmentDetail';

class LocalExpenseInfoScreen extends Component {

    componentDidMount() {
        const { fetchLocalImage, token, agentid, selectLocalExpenseItem } = this.props;
        fetchLocalImage({
            token,
            agentid,
            id: selectLocalExpenseItem.sfid
        })
    }

    render() {
        const { selectLocalExpenseItem, retailerList, dealerList, selectLocalExpense } = this.props;
        let retailer = HelperService.getNameFromSFID(retailerList, selectLocalExpenseItem.customer__c);
        let dealer = HelperService.getNameFromSFID(dealerList, selectLocalExpenseItem.customer__c);
        console.log(this.props.localImageList, "DATA LOCAL");
        return (
            <View style={Style.parentContainer}>
                <LocalExpenseInfoTuple data={selectLocalExpenseItem} name={retailer ? retailer : dealer} visible={selectLocalExpense} />
                <View style={{ height: 15 }}></View>
                <ScrollView>
                    <LocalInfoDisplay label={retailer ? 'Retailer' : 'Dealer'} value={retailer ? retailer : dealer} />
                    <LocalInfoDisplay label={'From'} value={selectLocalExpenseItem.from__c || ''} />
                    <LocalInfoDisplay label={'To'} value={selectLocalExpenseItem.to__c || 'None'} />
                    <LocalInfoDisplay label={'Mode of Travel'} value={selectLocalExpenseItem.mode__c || 'Two wheeler'} />
                    {/* <LocalInfoDisplay label={'Have Bills'} value={selectLocalExpenseItem.have_bills__c ? 'Yes' : 'No'} /> */}
                    <LocalInfoDisplay label={'Km travelled'} value={Math.round(selectLocalExpenseItem.kilometers_travelled__c || '0') + ' km'} />
                    <LocalInfoDisplay label={'System Km travelled'} value={Math.round(selectLocalExpenseItem.system_calculated_kilometer__c || '0') + ' km'} />
                    <LocalInfoDisplay label={'Toll Parking'} value={HelperService.currencyValue(selectLocalExpenseItem.toll_parking_charges__c || '0')} />
                    <LocalInfoDisplay label={'Food'} value={HelperService.currencyValue(selectLocalExpenseItem.food__c || '0')} />
                    <LocalInfoDisplay label={'Amount'} value={HelperService.currencyValue(selectLocalExpenseItem.amount__c || '0')} />
                    <LocalInfoDisplay label={'Total Amount'} value={HelperService.currencyValue(selectLocalExpenseItem.total_amount || '0')} />
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
    offset: state.local.expenseOffset,
    limit: state.local.expenseLimit,
    localExpenseItemList: state.local.localExpenseItemList,
    selectLocalExpenseItem: state.local.selectLocalExpenseItem,
    selectLocalExpense: state.local.selectLocalExpense,
    dealerList: state.retailers.dealersSearchList,
    retailerList: state.retailers.retailersSearchList,
    localImageList: state.local.localImageList,
    fetchLocalImageLoader: state.local.fetchLocalImageLoader
});

const mapDispatchToProps = (dispatch) => ({
    fetchLocalItemExpenses: (params) => dispatch(LocalActions.fetchLocalItemExpenses(params)),
    selectLocalItemExpense: (params) => dispatch(LocalActions.selectLocalItemExpense(params)),
    clearSelectLocalItemExpense: () => dispatch(LocalActions.clearSelectLocalItemExpense()),
    fetchLocalImage: (params) => dispatch(LocalActions.fetchLocalImage(params)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocalExpenseInfoScreen)


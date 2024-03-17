import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native'
import OrderCard from 'App/Components/OrderCard'
import RetailersActions from 'App/Stores/Retailers/Actions'
import {HelperService} from 'App/Services/Utils/HelperService';
import _ from 'lodash';
import Loading from 'App/Components/Loading'
import NoDataFound from 'App/Components/NoDataFound'
import NavigationService from 'App/Services/NavigationService'
import GenericDisplayCard from 'App/Components/GenericDisplayCard'
import BlueButton from 'App/Components/BlueButton'
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class VisitRetailerOutstanding extends Component {
	componentDidMount() {
		this.getOutstanding();
	}

	getOutstanding() {
		const {
			executeVisitData,
			offset, 
			limit,
			fetchDealerOutstanding,
			agentid,
			token
		} = this.props

		let seller_id = executeVisitData.retailer_dealer__c;
		let type      = executeVisitData.type1__c;

		fetchDealerOutstanding({
			agentid, 
			token, 
			offset, 
			limit,
			seller_id,
			type
		});
	}

	

	getCardNode(item) {
		return (
			<GenericDisplayCard
				key={item.sfid}
          		content={[
          			<GenericDisplayCardStrip key={'0-30 Days' + item.sfid} label={'0-30 days'} value={HelperService.currencyValue(item.x0_30_days__c) || 'None'}/>,
                	<GenericDisplayCardStrip key={'30-60 Days' + item.sfid} label={'30-60 days'} value={HelperService.currencyValue(item.x30_60_days__c) || 'None'}/>,
                  	<GenericDisplayCardStrip key={'60-90 Days' + item.sfid} label={'60-90 days' } value={HelperService.currencyValue(item.x60_90_days__c) || 'None'}/>,
                  	<GenericDisplayCardStrip key={'More Than 90 Days' + item.sfid} label={'More Than 90 days'} value={HelperService.currencyValue(item.x90_days__c) || 'None'}/>,
                  	<GenericDisplayCardStrip key={'Total Outstanding' + item.sfid} label={'Total Outstanding'} value={HelperService.currencyValue(item.total_outstanding)}/>,

                  	
                  	<BlueButton key={'Add Payment' + item.sfid} title={'ADD PAYMENT'} onPress={() => NavigationService.navigate('OutstandingPaymentInfo', {id: item.sfid, data: item})} style={{width: '60%', alignSelf: 'center', marginTop: hp('2%')}} textStyle={{fontSize: wp('4%'), textTransform: 'uppercase'}}/>
          		]} 
	            dark={false} 
	            onPress={() => {NavigationService.navigate('OutstandingPaymentInfo', {id: item.sfid, data: item})}}
	        />
		);
	}

  	render() {
  		const {
  			loader, 
  			dealerOutstanding,
  			executeVisitData
  		} = this.props;

	    let id   = executeVisitData.retailer_dealer__c;
		let type = executeVisitData.type1__c;
		let visibleNode = [];
	    let data =[];

	    _.map(dealerOutstanding, (value, key) => {
	    	if (key == id) {
	    		data = dealerOutstanding[key];
	    	}
	    });
	    
	    if (data && data.length && !loader) {
	        visibleNode = (
	          	<FlatList
	            	data={data}
	            	renderItem={({ item }) => this.getCardNode(item)}
	            	keyExtractor={item => item.name}
	            	onRefresh={() => this.getOutstanding()}
            		refreshing={loader}
	           	/>
	        );
	    }else if (loader){
	        visibleNode = <Loading />
	    }else if(data && !data.length && !loader){
        	visibleNode = <NoDataFound text={'No Outstanding.'}/>
      	}

	    return (
	      	<View style={{flex: 1}}>
	        	{visibleNode}
	      	</View>
	    );
  	}
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  dealerOutstanding: state.retailers.dealerOutstanding,
  retailersList: state.retailers.retailersList,
  dealersList: state.retailers.dealersList,
  loader: state.retailers.fetchDealerOutstandingLoader,
  offset: state.retailers.retailerOrdersOffset,
  limit: state.retailers.retailerOrdersLimit,
  executeVisitData: state.visits.executeVisitData
});

const mapDispatchToProps = (dispatch) => ({
  fetchDealerOutstanding:(params)   => dispatch(RetailersActions.fetchDealerOutstanding(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitRetailerOutstanding)


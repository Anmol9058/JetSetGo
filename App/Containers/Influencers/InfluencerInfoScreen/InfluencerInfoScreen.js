import InfoDisplay from 'App/Components/InfoDisplay';
import Loading from 'App/Components/Loading';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Style from './InfluencerInfoStyle';
import InfluencerInfoTuple from '../InfluencerInfoTuple/InfluencerInfoTuple';
import { HelperService } from '../../../Services/Utils/HelperService'

class InfluencerInfoScreen extends Component {

    render() {
        const {
            selectedInfluencer
        } = this.props;

        const {
            id,
            data
        } = selectedInfluencer

        if (!data) {
            return (
                <View style={Style.parentContainer}>
                    <Loading />
                </View>
            );
        }

        return (
            <View style={Style.parentContainer}>
                <InfluencerInfoTuple data={selectedInfluencer} id={id} data={data} />
                {/* <View style={Style.actionContainer}> */}
                {/* <WhiteButton
                        selected={false}
                        title={'Call'}
                        disabled={this.props.updateRetailerLocationLoader}
                        onPress={() => HelperService.callNumber(data.phone)}
                        style={{ ...Style.actionButton, ...Style.callAction }}
                        textStyle={Style.actionButtonText}
                    >
                        <Icon name="call" style={Style.actionButtonIcon} />
                    </WhiteButton> */}

                {/* <WhiteButton
                        selected={false}
                        title={'Direction'}
                        disabled={this.props.updateRetailerLocationLoader}
                        onPress={() => HelperService.showDirectionInGoogleMaps(data.location__latitude__s, data.location__longitude__s, 'Retailer Direction')}
                        style={{ ...Style.actionButton, ...Style.directionAction }}
                        textStyle={Style.actionButtonText}
                    >
                        <Icon name="locate" style={Style.actionButtonIcon} />
                    </WhiteButton> */}
                {/* </View> */}

                <ScrollView>
                    <InfoDisplay label={'Date'} value={HelperService.dateReadableFormat(data.createddate || '')} />
                    <InfoDisplay label={'Meetings Attend'} value={data.meets_attended__c || 'None'} />
                    <InfoDisplay label={'Potential'} value={data.potential__c || 'None'} />
                    <InfoDisplay label={'Status'} value={data.status__c || 'None'} />
                    <InfoDisplay label={'Attached Dealer'} value={HelperService.getNameFromSFID(this.props.dealersList, data.attached_dealer__c || 'None')} />
                    <InfoDisplay label={'Attached Retailer'} value={HelperService.getNameFromSFID(this.props.retailersList, data.attached_retailer__c || 'None')} />
                    <InfoDisplay label={'Business So Far'} value={data.business_so_far__c || 'None'} />
                    <InfoDisplay label={'Business This Month'} value={data.business_this_month__c || 'None'} />
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedInfluencer: state.influencers.selectedInfluencer,
    // updateRetailerLocationLoader: state.retailers.updateRetailerLocationLoader,
    retailersList: state.influencers.retailerSearchableList,
    dealersList: state.influencers.dealerSearchableList,
    agentid: state.user.id
});

const mapDispatchToProps = (dispatch) => ({
    // updateRetailerLocation: (params) => dispatch(RetailersActions.updateRetailerLocation(params)),
    // updateRetailerLocationLoading: () => dispatch(RetailersActions.updateRetailerLocationLoading()),
    // updateRetailerLocationLoadingStop: () => dispatch(RetailersActions.updateRetailerLocationLoadingStop())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfluencerInfoScreen)


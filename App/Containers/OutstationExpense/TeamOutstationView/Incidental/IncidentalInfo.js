import InfoDisplay from 'App/Components/InfoDisplay';
import Loading from 'App/Components/Loading';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { HelperService } from '../../../../Services/Utils/HelperService';
import Style from '../InfoStyle';

class IncidentalInfoScreen extends Component {

    render() {
        let selectedData = this.props.navigation.getParam('data');
        console.log(selectedData, "SELECT CHECK");
        if (!selectedData) {
            return (
                <View style={Style.parentContainer}>
                    <Loading />
                </View>
            );
        }

        return (
            <View style={Style.parentContainer}>
                <ScrollView>
                    <InfoDisplay label={'From'} value={HelperService.dateReadableFormat(selectedData.from_date__c) || 'None'} />
                    <InfoDisplay label={'To'} value={HelperService.dateReadableFormat(selectedData.to_date__c) || 'None'} />
                    <InfoDisplay label={'Place'} value={selectedData.place__c || 'None'} />
                    <InfoDisplay label={'Remark'} value={selectedData.remark__c || 'None'} />
                    <InfoDisplay label={'Amount'} value={HelperService.currencyValue(selectedData.amount__c || '0')} />
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    cityList: state.tours.cityList
})


export default connect(
    mapStateToProps,
    null
)(IncidentalInfoScreen);




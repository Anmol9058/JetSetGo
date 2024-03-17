import InfoDisplay from 'App/Components/InfoDisplay';
import Loading from 'App/Components/Loading';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { HelperService } from '../../../../Services/Utils/HelperService';
import Style from '../InfoStyle';

class ConvenienceInfoScreen extends Component {

    render() {
        let selectedData = this.props.navigation.getParam('data');

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
                    <InfoDisplay label={'Date'} value={HelperService.dateReadableFormat(selectedData.date__c || 'None')} />
                    <InfoDisplay label={'From'} value={selectedData.from__c || 'None'} />
                    <InfoDisplay label={'To'} value={selectedData.to__c || 'None'} />
                    <InfoDisplay label={'Mode of Travel'} value={selectedData.mode__c || 'None'} />
                    <InfoDisplay label={'City'} value={HelperService.getNameFromSFID(this.props.cityList, selectedData.city__c || 'None')} />
                    <InfoDisplay label={'Company Paid'} value={selectedData.company_paid__c || 'No'} />
                    <InfoDisplay label={'Have bills'} value={selectedData.have_bills__c || 'No'} />
                    <InfoDisplay label={'Toll Parking'} value={selectedData.toll_parking_charges__c || 'No'} />
                    <InfoDisplay label={'Amount'} value={selectedData.amount__c || '0'} />
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
)(ConvenienceInfoScreen);




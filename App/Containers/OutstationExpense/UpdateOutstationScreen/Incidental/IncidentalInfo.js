import InfoDisplay from 'App/Components/InfoDisplay';
import { Icon } from 'native-base';
import Loading from 'App/Components/Loading';
import React, { Component } from 'react';
import { ScrollView, View, TouchableHighlight } from 'react-native';
import { HelperService } from '../../../../Services/Utils/HelperService';
import Style from '../../TeamOutstationView/InfoStyle';
import AttachmentDetail from '../../../../Components/AttachmentDetail';
import { Colors } from 'App/Theme'
import { connect } from 'react-redux';
import NavigationService from '../../../../Services/NavigationService';

class Incidentalinfo extends Component {

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
                    <ScrollView>
                        <InfoDisplay label={'From'} value={HelperService.dateReadableFormat(selectedData.from_date__c) || 'None'} />
                        <InfoDisplay label={'To'} value={HelperService.dateReadableFormat(selectedData.to_date__c) || 'None'} />
                        <InfoDisplay label={'Place'} value={selectedData.place__c || 'None'} />
                        <InfoDisplay label={'Remark'} value={selectedData.remark__c || 'None'} />
                        <InfoDisplay label={'Amount'} value={HelperService.currencyValue(selectedData.amount__c || '0')} />
                    </ScrollView>
                </ScrollView>
                <TouchableHighlight
                    style={Style.plusIcon}
                    onPress={() => { NavigationService.navigate('UpdateIncidentalScreen') }}>
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
    cityList: state.tours.cityList
})


export default connect(
    mapStateToProps,
    null
)(Incidentalinfo);



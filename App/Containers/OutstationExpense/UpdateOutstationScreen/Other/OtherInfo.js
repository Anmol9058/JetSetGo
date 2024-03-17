import InfoDisplay from 'App/Components/InfoDisplay';
import Loading from 'App/Components/Loading';
import OutstationActions from 'App/Stores/OutstationExpense/Actions';
import React, { Component } from 'react';
import { ScrollView, View, TouchableHighlight } from 'react-native';
import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import AttachmentDetail from '../../../../Components/AttachmentDetail';
import { HelperService } from '../../../../Services/Utils/HelperService';
import Style from '../../TeamOutstationView/InfoStyle';
import NavigationService from '../../../../Services/NavigationService';

class OtherInfo extends Component {

    componentDidMount() {
        const { fetchExpenseImage, token, agentid } = this.props;
        let selectedData = this.props.navigation.getParam('data');
        fetchExpenseImage({
            token,
            agentid,
            id: selectedData.pg_id__c
        })
    }

    componentWillUnmount() {
        this.props.clearExpenseImage();
    }

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
                    <InfoDisplay label={'Date'} value={HelperService.dateReadableFormat(selectedData.date__c) || 'None'} />
                    <InfoDisplay label={'Place'} value={selectedData.place__c || 'None'} />
                    <InfoDisplay label={'Bill Number'} value={selectedData.bill_number__c || 'No'} />
                    <InfoDisplay label={'Remark'} value={selectedData.remark__c || 'None'} />
                    <InfoDisplay label={'Company Paid'} value={selectedData.company_paid__c ? 'Yes' : 'No'} />
                    <InfoDisplay label={'Have bills'} value={selectedData.have_bills__c ? 'Yes' : 'No'} />
                    <InfoDisplay label={'Amount'} value={HelperService.currencyValue(selectedData.amount__c || '0')} />
                    <AttachmentDetail
                        label={'Attachment'}
                        imageList={this.props.expenseImage}
                        loader={this.props.fetchExpenseImageLoader}
                    />
                </ScrollView>
                <TouchableHighlight
                    style={Style.plusIcon}
                    onPress={() => { NavigationService.navigate('UpdateOtherScreen') }}>
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
    cityList: state.tours.cityList,
    expenseImage: state.outstations.expenseImage,
    fetchExpenseImageLoader: state.outstations.fetchExpenseImageLoader
})

const mapDispatchToProps = (dispatch) => ({
    fetchExpenseImage: (params) => dispatch(OutstationActions.fetchExpenseImage(params)),
    clearExpenseImage: () => dispatch(OutstationActions.clearExpenseImage())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OtherInfo);

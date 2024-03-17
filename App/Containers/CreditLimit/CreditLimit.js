import React, { Component } from 'react'
import { View, Alert, ScrollView, Text } from 'react-native'
import SpeedoMeter from 'App/Components/SpeedoMeter'
import CircularProgressBar from 'App/Components/CircularProgressBar'
import Style from './CreditLimitStyles'
import { connect } from 'react-redux'
import _ from 'lodash'
import { FlatList, Dimensions } from 'react-native'
import RetailersActions from 'App/Stores/Retailers/Actions'
import CommonActions from 'App/Stores/Common/Actions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


class CreditLimit extends React.Component {
    componentDidMount() {

        const {
            fetchCreditLimit,
            fetchCreditLimitLoading,
        } = this.props;

        this.fetchCreditCall()

    }

    fetchCreditCall() {
        const {
            token,
            fetchCreditLimit,
            selectedRetailer,
        } = this.props;

        fetchCreditLimit
            ({
                token,
                account_id: selectedRetailer.id
            });
    }


    render() {
        const { data } = this.props;

        return (
            <ScrollView style={{ marginTop: hp('-42%'), marginLeft: wp('5%'),flex:1 }}>

                {/* <View style={{ ...Style.card}}>
                    <Text style={Style.head}>Paper</Text>
                    <SpeedoMeter datasource={data && data.length && data[0] ? data[0] : ''} />
                </View> */}

                <View style={{ ...Style.card }}>
                    <Text style={Style.head}>Board</Text>
                    <CircularProgressBar
                        datasource={data && data.length && data[1] ? data[1] : ''}
                    />
                </View>

                <View style={{ ...Style.card }}>
                    <Text style={Style.head}>Paper</Text>
                    <CircularProgressBar
                        datasource={data && data.length && data[0] ? data[0] : ''}
                    />
                </View>

            </ScrollView>
        )
    }
}


const mapStateToProps = (state) => ({
    token: state.user.token,
    fetchCreditLimitLoading: state.retailers.fetchCreditLimitLoading,
    fetchCreditLimitList: state.retailers.fetchCreditLimitList,
    data: state.retailers.fetchCreditLimitList,
    selectedRetailer: state.retailers.selectedRetailer,

});

const mapDispatchToProps = (dispatch) => ({
    fetchCreditLimit: (params) => dispatch(RetailersActions.fetchCreditLimit(params)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditLimit)

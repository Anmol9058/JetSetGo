import React, { Component } from 'react'
import { View, Alert, ScrollView, Text } from 'react-native'
import Style from './OutstandingStyles'
import RetailersActions from 'App/Stores/Retailers/Actions'
import CommonActions from 'App/Stores/Common/Actions';
import { Table, Row, Rows } from 'react-native-table-component';
import { connect } from 'react-redux'

class Outstanding extends React.Component {

  
    getTableHead() {
       

      return ( ['Bucket', 'Board', 'Paper'] )
    }

   

    render() {
       
        const {data} =  this.props

        const tableData = [
            ['0-30 Days', data&&data.length&&data[0]?data[0].x0_30_days__c:0, data&&data.length&&data[1]?data[1].x0_30_days__c:0],
            ['31-44 Days', data&&data.length&&data[0]?data[0].x31_44_days__c:0, data&&data.length&&data[1]?data[1].x31_44_days__c:0],
            ['45-60 Days', data&&data.length&&data[0]?data[0].x45_60_days__c:0, data&&data.length&&data[1]?data[1].x45_60_days__c:0],
            ['61-90 Days', data&&data.length&&data[0]?data[0].x61_90_days__c:0, data&&data.length&&data[1]?data[1].x61_90_days__c:0],
            ['>90 Days', data&&data.length&&data[0]?data[0].x90__c:0, data&&data.length&&data[1]?data[1].x90__c:0]
        ]

        return (
            <View style={Style.V1}>
                <Table borderStyle={Style.border}>
                    <Row data={this.getTableHead()} style={Style.head} textStyle={Style.text} />
                    <Rows data={tableData} style={{ height: 40 }} textStyle={Style.text} />
                </Table>
            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    data: state.retailers.fetchCreditLimitList

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Outstanding)

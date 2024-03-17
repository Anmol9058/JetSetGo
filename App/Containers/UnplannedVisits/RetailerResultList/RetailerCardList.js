import React, { Component } from 'react'
import { View, Alert, ScrollView, FlatList} from 'react-native'
import { Button, Text } from 'native-base';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BlueButton from 'App/Components/BlueButton'
import WhiteButton from 'App/Components/WhiteButton';
import NavigationService from 'App/Services/NavigationService'
import {HelperService} from 'App/Services/Utils/HelperService';
import UnplannedRetailerCard from 'App/Containers/UnplannedVisits/UnplannedRetailerCard'
import UnplannedSiteCard from 'App/Containers/UnplannedVisits/UnplannedRetailerCard/SiteCard'
import UnplannedInfluencerCard from 'App/Containers/UnplannedVisits/UnplannedRetailerCard/InfluencerCard'
import Loading from 'App/Components/Loading'
import GenericIcon from 'App/Components/GenericIcon'
import NoDataFound from 'App/Components/NoDataFound'
import RetailersActions from 'App/Stores/Retailers/Actions'
import VisitsActions from 'App/Stores/Visits/Actions'
import {Colors } from 'App/Theme'
import _ from 'lodash'


const RetailerCardList = ({list, loading, fetchCall, noDataFoundCustomMsg, noDataFoundCustomNode, onSelect, actionLoader, type}) => { 
    let visibleNode = [];
    let noDataNode= (
      <NoDataFound text={noDataFoundCustomMsg ? noDataFoundCustomMsg : 'No Data'}>
        <GenericIcon 
              name={'refresh'}
              onPress={() => fetchCall()}
              style={{color: Colors.button, fontSize: 35, alignSelf: 'center', padding: 10}}
            />
          {noDataFoundCustomNode}
      </NoDataFound>
    );

    if (type=='Retailer' || type == 'Dealer') {
      if (list && list.length) {
        visibleNode = (
          <FlatList
            data={list}
            renderItem={({ item }) => <UnplannedRetailerCard data={item} id={item.sfid} onPress={() => onSelect({sfid: item.sfid, type: type})}/>}
            keyExtractor={item => item.sfid}
            onRefresh={() => fetchCall()}
            refreshing={loading}
            ListEmptyComponent={() => noDataNode}
          />
        );
      }else if(loading){
          visibleNode = <Loading />
       }else if(list && !list.length && !loading){
          visibleNode = noDataNode
      }
    }

    if (type == 'Sites') {
      if (list && list.length) {
        visibleNode = (
          <FlatList
            data={list}
            renderItem={({ item }) => <UnplannedSiteCard data={item} id={item.sfid} onPress={() => onSelect({sfid: item.sfid, type: type})}/>}
            keyExtractor={item => item.sfid}
            onRefresh={() => fetchCall()}
            refreshing={loading}
            ListEmptyComponent={() => noDataNode}
          />
        );
      }else if(loading){
          visibleNode = <Loading />
       }else if(list && !list.length && !loading){
          visibleNode = noDataNode
      }
    }


    if (type == 'Influencer') {
      if (list && list.length) {
        visibleNode = (
          <FlatList
            data={list}
            renderItem={({ item }) => <UnplannedInfluencerCard data={item} id={item.sfid} onPress={() => onSelect({sfid: item.sfid, type: type})}/>}
            keyExtractor={item => item.sfid}
            onRefresh={() => fetchCall()}
            refreshing={loading}
            ListEmptyComponent={() => noDataNode}
          />
        );
      }else if(loading){
          visibleNode = <Loading />
       }else if(list && !list.length && !loading){
          visibleNode = noDataNode
      }
    }
    

    let loadingNode = (
      <View style={{flex: 1, backgroundColor: Colors.button, paddingBottom: 5, position: 'absolute', backgroundColor: 'rgb(0, 0, 0, .3)', zIndex: 4, width: '100%', height: '100%'}}>
        <Loading />
      </View>
    )

    loadingNode = actionLoader ? loadingNode : []
    return (
          <View style={{flex: 1}}>
          {loadingNode}
          <View style={{flex: 1, backgroundColor: Colors.button, paddingBottom: 5}}>
            {visibleNode}
          </View>
          </View>
      )
  }



export default RetailerCardList;
import React from 'react'
import { Platform, View, ActivityIndicator, Image, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import { ApplicationStyles, Helpers, Images, Metrics, Colors } from 'App/Theme'
import { Container, Header, Title, Content, Button, Icon, Left, Body, Text, Input, Item, Right, Segment } from 'native-base';
import WhiteButton from 'App/Components/WhiteButton'
import NavigationService from 'App/Services/NavigationService'
import ProductActions from 'App/Stores/Products/Actions';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class SchemesListLayout extends React.Component {
  render() {
    const {
    	schemes,
    	searchFilters,
    	changeSearchFilters
    } = this.props;

    let product = [];
    let order = [];


    schemes.map((obj) => {
    	if(obj.scheme_category__c == 'Order Level') {
    		order.push(obj);
    	}

    	if(obj.scheme_category__c == 'Product Cat Level') {
    		product.push(obj)
    	}
    })



    return (
      <View>
        <Header style={Styles.header}>
          <View style={Styles.searchFilterContainer}>
            <WhiteButton
              selected={searchFilters['type'] == 'Product Cat Level'}
              title={`Product Level ${product ? '(' + product.length  + ')' : ''}`}
              onPress={() => changeSearchFilters({ edited_field: 'type', 'edited_value': 'Product Cat Level' })}
              style={Styles.searchFilterTypeBox}
              textStyle={Styles.searchFilterTypeText}
            />

            <WhiteButton
              selected={searchFilters['type'] == 'Order Level'}
              title={`Order Level ${order ? '(' + order.length  + ')' : ''}`}
              onPress={() => changeSearchFilters({ edited_field: 'type', 'edited_value': 'Order Level' })}
              style={Styles.searchFilterTypeBox}
              textStyle={Styles.searchFilterTypeText}
            />        
          </View>
        </Header>
        {this.props.children}
      </View>
    )
  }
}



const mapStateToProps = (state) => ({
  searchFilters: state.products.schemesSearchFilters,
  schemes: state.products.schemes,
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchFilters: (params) => dispatch(ProductActions.changeSchemesSearchFilters(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchemesListLayout)

const Styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: undefined,
    paddingTop: hp('5%'),
    paddingBottom: 10,
    borderBottomWidth: 0,
    paddingLeft: 10,
    paddingRight: 10
  },
  searchContainer: {
    width: Math.round(Dimensions.get('window').width - 20)
  },
  searchableDropdownContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 60
  },
  picker: {
    borderRadius: 100,
    width: 330
  },
  searchFilterContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  searchFilterTypeBox: {
    marginHorizontal: wp('1%'),
    marginBottom: hp('1%'),
    borderWidth: 1.5,
    width: wp('43%'),
    paddingLeft: wp('.5%'),
    paddingRight: wp('.5%')
  },
  searchFilterTypeText: {
    fontSize: wp('3.8%'),
    fontFamily: ApplicationStyles.textMediumFont
  },
});

import ItemDetail from 'App/Components/ItemDetail';
import Loading from 'App/Components/Loading';
import VisitOrderCartCard from 'App/Containers/Visits/VisitOrderCartCard';
import OrdersActions from 'App/Stores/Orders/Actions';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import NoData from '../../../Components/NoDataFound/NoDataFound';
import BlueButton from 'App/Components/BlueButton'

class ReOrderInfoScreen extends Component {
  getRetailerData(id) {
    const {
      retailersList,
    } = this.props;

    let data = {};
    retailersList.map((obj) => {
      if (obj.seller.sfid == id) {
        data = obj.seller
      }
    });
    return data;
  }

  getDealerData(id) {
    const {
      dealersList,
    } = this.props;

    let data = {};
    dealersList.map((obj) => {
      if (obj.seller.sfid == id) {
        data = obj.seller
      }
    });
    return data;
  }


  componentDidMount() {
    const {
      id,
      data
    } = this.props.navigation.state.params;

    this.props.fetchOrderDetails({
      order_id: id,
      token: this.props.token,
      agentid: this.props.agentid
    })
  }

  getTotalQuantity() {
    let quantity = 0;

    const {
      allOrdersDetailsMapping
    } = this.props;

    const {
      id
    } = this.props.navigation.state.params;

    let orderLineData = allOrdersDetailsMapping[id];
    if (orderLineData) {
      orderLineData.map((obj) => {
        quantity += Number(obj.quantity__c)
      });
    }

    return quantity;
  }

  getItemDetailsNode() {
    let visibleNode = <Loading />;
    const {
      id
    } = this.props.navigation.state.params;
    const {
      allOrdersDetailsMapping
    } = this.props;

    let orderLineData = allOrdersDetailsMapping[id];
    if (orderLineData) {
      visibleNode = (
        <ScrollView>
          {orderLineData.map((obj) => <ItemDetail label={obj.product_name__c} value={obj.quantity__c} key={obj.order_pg_id__c + obj.sfid} showEdit={true}  showDelete={true}/>)}
        </ScrollView>
      );
    } else {
      visibleNode = <NoData></NoData>
    }
    return visibleNode;
  }

  getItemCount() {
    const {
      id
    } = this.props.navigation.state.params;

    const {
      allOrdersDetailsMapping
    } = this.props;

    let orderLineData = allOrdersDetailsMapping[id];

    return (orderLineData && orderLineData.length ? orderLineData.length : 0);
  }

  render() {
    const {
      id,
      data
    } = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        <VisitOrderCartCard
          customerName={this.getRetailerData(data.retailer__c).name || this.getDealerData(data.retailer__c).name}
          orderDate={data.order_date__c}
          items={this.getItemCount()}
          quantity={this.getTotalQuantity()}
          dark={true}
          orderValue={data.order_value__c}
          totalTax={data.total_tax__c}
        />
        
        <View style={{marginTop:'2.5%', marginBottom:'2.5%'}}>
        <BlueButton title={'Add Product'}  style={{alignSelf: 'flex-end', width: '27.5%',}}  textStyle={{ fontSize: 12.5,alignSelf: 'center',}} />
        </View>
        {this.getItemDetailsNode()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  fetchProductsLoader: state.products.fetchProductsLoader,
  fetchCategoryLoader: state.products.fetchCategoryLoader,
  fetchSubCategoryLoader: state.products.fetchSubCategoryLoader,
  fetchSubSubCategoryLoader: state.products.fetchSubSubCategoryLoader,
  productList: state.products.productList,
  filteredProductList: state.products.filteredProductList,
  productCategoryList: state.products.productCategoryList,
  productSubCategoryList: state.products.productSubCategoryList,
  productSubSubCategoryList: state.products.productSubSubCategoryList,
  searchFilters: state.products.searchFilters,
  categoryOffset: state.products.categoryOffset,
  categoryLimit: state.products.categoryLimit,
  productLimit: state.products.productLimit,
  productOffset: state.products.productOffset,
  cart: state.visits.cart,
  retailersList: state.retailers.retailersList,
  executeVisitData: state.visits.executeVisitData,
  placeOrderLoader: state.visits.placeOrderLoader,
  dealersSearchList: state.retailers.dealersSearchList,
  retailersOffset: state.retailers.retailersOffset,
  retailersLimit: state.retailers.retailersLimit,
  dealersList: state.retailers.dealersList,
  allOrdersDetailsMapping: state.orders.allOrdersDetailsMapping,
  fetchOrderDetailsLoader: state.orders.fetchOrderDetailsLoader
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrderDetails: (params) => dispatch(OrdersActions.fetchOrderDetails(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReOrderInfoScreen)

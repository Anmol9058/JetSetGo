import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import OrderCard from 'App/Components/OrderCard'
import LayoutScreen from 'App/Containers/Layout/LayoutScreen'
import VisitOrderCartCard from 'App/Containers/Visits/VisitOrderCartCard';
import { connect } from 'react-redux'
import OrdersActions from 'App/Stores/Orders/Actions'
import ItemDetail from 'App/Components/ItemDetail'
import NoDataFound from 'App/Components/NoDataFound'
import Loading from 'App/Components/Loading'
import { HelperService } from 'App/Services/Utils/HelperService';
import GenericDisplayCard from 'App/Components/GenericDisplayCard'
import GenericDisplayCardStrip from 'App/Components/GenericDisplayCard/GenericDisplayCardStrip'

class DealerOrderInfoScreen extends Component {
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
          {orderLineData.map((obj) =>
            <GenericDisplayCard dark={false}
              style={{ width: '88%', elevation: 0 }}
              key={obj.sfid}
              content={[
                <GenericDisplayCardStrip label={'Item Name'} value={obj.name} />,
                <GenericDisplayCardStrip label={'Ordered Quantity'} value={obj.orderedquantity__c} />
              ]}
            />

          )}
        </ScrollView>
      )
    } else {
      visibleNode = <View></View>
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
        <OrderCard
          orderDate={data.order_date__c}
          orderValue={data.order_value__c || ' '}
          orderNumber={data.name}
          totalTax={data.total_tax__c}
          dark={true}
        />
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
  fetchOrderDetails: (params) => dispatch(OrdersActions.fetchDealerOrderDetails(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DealerOrderInfoScreen)

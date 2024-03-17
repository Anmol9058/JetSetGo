import ItemDetail from 'App/Components/ItemDetail';
import Loading from 'App/Components/Loading';
import VisitOrderCartCard from 'App/Containers/Visits/VisitOrderCartCard';
import OrdersActions from 'App/Stores/Orders/Actions';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import NoData from '../../../Components/NoDataFound/NoDataFound';
import BlueButton from 'App/Components/BlueButton'
import { HelperService } from 'App/Services/Utils/HelperService';
import ProductCartCard from 'App/Components/ProductCartCard';
import RetailersActions from 'App/Stores/Retailers/Actions'
import ProductActions from 'App/Stores/Products/Actions';
import Styles from './OrderInfoStyles'
import GenericIcon from 'App/Components/GenericIcon'
import NavigationService from 'App/Services/NavigationService'
import VisitsActions from "../../../Stores/Visits/Actions"

class OrderInfoScreen extends Component {
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
    } = this.props.route.params;
console.log("ddddddddddd",id);
   this.props.fetchOrderDetails({
      order_id: id,
      token: this.props.token,
      //agentid: this.props.agentid
    })
  }

  componentWillUnmount() {
    //this.props.clearAddOrderLineData();
   this.props.updateSearchFilters({ edited_field: 'editOrder', 'edited_value': '' })
   this.props.clearEditOrderLineData()
    }

  getTotalQuantity() {
    let quantity = 0;

    const {
      allOrdersDetailsMapping
    } = this.props;

    const {
      id,
      data,
      show,
     
    } = this.props.route.params;

    let orderLineData = [];
    if(show){
      orderLineData =  allOrdersDetailsMapping[id]? allOrdersDetailsMapping[id]: data.order_line
      }
      else{ orderLineData = allOrdersDetailsMapping[id]?allOrdersDetailsMapping[id]:[]}
    if (orderLineData) {
      orderLineData.map((obj) => {
        quantity += Number(obj.quantity__c)
      });
    }

    return quantity;
  }

	onChangeQuantity(params) {
		const {
			deleteOrderLine,
      token,
      editOrderQuantity,
      Tax,
      updateSearchFilters,
      setEditOrderLineData,
      executeVisitData,
      selectedRetailer
		} = this.props;
    let taxValue= Tax&&Tax.length&&Tax[0].igst__c?Tax[0].igst__c:0
    let taxValue2= Tax&&Tax.length&&Tax[0].cgst__c?Tax[0].cgst__c:0
    let taxValue3= Tax&&Tax.length&&Tax[0].sgst__c?Tax[0].sgst__c:0 
 let match= executeVisitData.type__c=='Retailer'||selectedRetailer&&selectedRetailer.data&&selectedRetailer.data.account_type__c=='Retailer'?  this.getStateCodeMap() :true
		if (params.quantity__c == 0) {
      match?	deleteOrderLine({token:token,  id: params.order_line_id, order_id: params.order_id,total_tax: params.total_tax,sgst_amount: taxValue2/taxValue*params.total_tax, cgst_amount:taxValue3/taxValue*params.total_tax, igst_amount:0 ,total_exmill:	this.getTotalExmill()}):deleteOrderLine({token:token,  id: params.order_line_id, order_id: params.order_id,total_tax: params.total_tax,igst_amount: params.total_tax,sgst_amount: 0, cgst_amount:0 ,total_exmill:	params.total_exmill})
		} else {
      updateSearchFilters({ edited_field: 'editOrder', 'edited_value': params.order_line_id })
      match? setEditOrderLineData({...params, sgst_amount: taxValue2/taxValue*params.total_tax, cgst_amount:taxValue3/taxValue*params.total_tax ,  igst_amount:0,igst__c:0, sgst__c:taxValue2/100*params.price,cgst__c:taxValue3/100*params.price,total_exmill:this.getTotalExmill()}) : 	setEditOrderLineData({...params, igst_amount: params.total_tax, sgst_amount: 0, cgst_amount:0 ,igst__c:taxValue/100*params.price, sgst__c:0,cgst__c:0,total_exmill:	params.total_exmill})
		}
	}


  getItemDetailsNode() {
    let orderLineData=[]
    let visibleNode = <Loading />;
    const {
      id,
      data,
      show,
      
    } = this.props.route.params;
    console.log(show,"showwww")
   
    const {
      allOrdersDetailsMapping,
      Tax,
      fetchOrderDetailsLoader,
      updateSearchFilters,
      retailerSearchFilters,
      editOrderQuantity,
      editOrderForm,
      executeVisitData,
      selectedRetailer
    } = this.props;
    let taxValue= Tax&&Tax.length&&Tax[0].igst__c?Tax[0].igst__c:0
    let taxValue2= Tax&&Tax.length&&Tax[0].cgst__c?Tax[0].cgst__c:0
    let taxValue3= Tax&&Tax.length&&Tax[0].sgst__c?Tax[0].sgst__c:0
   
    let match= executeVisitData.type__c=='Retailer'||selectedRetailer&&selectedRetailer.data&&selectedRetailer.data.account_type__c=='Retailer'? this.getStateCodeMap(): true
    if(show ){

     orderLineData =  allOrdersDetailsMapping[id]? allOrdersDetailsMapping[id]: data.order_line
     } //console.log(orderLineData)
     else{ 
     
      orderLineData = allOrdersDetailsMapping[id]? allOrdersDetailsMapping[id]: []}
    if(fetchOrderDetailsLoader)
    {
      visibleNode = <Loading/>;
    }
    if (orderLineData&&!fetchOrderDetailsLoader) {
      //console.log(retailerSearchFilters['editOrder'])
      visibleNode = (
        <ScrollView>
          {orderLineData.map((obj) =>
          	<ProductCartCard
            name={obj.product_name?obj.product_name:obj.name}
            data={obj}
            dealerDiscount={obj.component_2__c}
            quantity={obj.quantity__c}
           onRemoveClick={() =>  match? this.props.deleteOrderLine({token: this.props.token, id:  obj.pg_id__c ||obj.sfid , order_id: id , total_tax: taxValue/100*((this.getTotalOrderValueDiscount())- (obj.total_price__c-obj.component_2__c)*obj.quantity__c) ,sgst_amount: taxValue2/100*(this.getTotalOrderValueDiscount()- (obj.total_price__c-obj.component_2__c)*obj.quantity__c), cgst_amount:taxValue3/100*(this.getTotalOrderValueDiscount()- (obj.total_price__c-obj.component_2__c)*obj.quantity__c), igst_amount:0, total_exmill:	this.getTotalExmill()-obj.component_1__c}):this.props.deleteOrderLine({token: this.props.token, id:  obj.pg_id__c ||obj.sfid , order_id: id , total_tax: taxValue/100*(this.getTotalOrderValueDiscount()- (obj.total_price__c-obj.component_2__c)*obj.quantity__c) ,igst_amount:taxValue/100*((this.getTotalOrderValueDiscount())- (obj.total_price__c-obj.component_2__c)*obj.quantity__c),sgst_amount: 0, cgst_amount:0 ,total_exmill:this.getTotalExmill()-obj.component_1__c})}
            onChangeQuantity={(quantity) => this.onChangeQuantity({ quantity: quantity,  order_id: obj.order_pg_id__c ,order_line_id:obj.pg_id__c ||obj.sfid  ,token:this.props.token,additional_discount:obj.component_2__c, total_tax: taxValue/100*(((obj.total_price__c-obj.component_2__c)*quantity)+(this.getTotalOrderValueDiscount()-((obj.total_price__c-obj.component_2__c)*obj.quantity__c))), price :(obj.total_price__c-obj.component_2__c)*quantity, total_price__c:((obj.total_price__c-obj.component_2__c)*quantity) +taxValue/100*((obj.total_price__c-obj.component_2__c)*quantity) ,total_exmill:this.getTotalExmill()-obj.component_1__c})}
            editLoader={this.props.editOrderQuantityLoader}
            deleteLoader={this.props.deleteOrderLineLoader}
            show={true}
            editOrderLineId={retailerSearchFilters['editOrder']}
            submitForm={()=>editOrderQuantity({...editOrderForm})}
            editOrderForm={editOrderForm}
            showEdit={!show}
          />
          
          )}
        </ScrollView>
      );
    }
    if(orderLineData && !orderLineData.length &&!fetchOrderDetailsLoader) {
      visibleNode = <NoData></NoData>
    }
  
    
    return visibleNode;
  }

  

  getItemCount() {
    const {
      id,
      data,
      show,
    } = this.props.route.params;
    let orderLineData = []
    const {
      allOrdersDetailsMapping
    } = this.props;
    if(show){
      orderLineData =  allOrdersDetailsMapping[id]? allOrdersDetailsMapping[id]: data.order_line
      }
      else{ orderLineData = allOrdersDetailsMapping[id]}

    return (orderLineData && orderLineData.length ? orderLineData.length : 0);
  }

  getTotalOrderValueDiscount() {
    let orderLineData = []
		let value = 0;
    const {
      allOrdersDetailsMapping
    } = this.props;
    const {
      id,
      data,
      show,
    } = this.props.route.params;
    if(show){
      orderLineData =  allOrdersDetailsMapping[id]? allOrdersDetailsMapping[id]: data.order_line
      }
      else{ orderLineData = allOrdersDetailsMapping[id]}
   
    if(orderLineData){
      orderLineData.map((obj) => {
			
			if(obj.component_2__c)
			//console.log(Number(obj.price))
			value +=  Number(obj.quantity__c)*(Number(obj.total_price__c))- (Number(obj.component_2__c))* Number(obj.quantity__c)
			else
			value += Number(obj.quantity__c)*(Number(obj.total_price__c))
		})}
		//console.log(value)
		return (value);
	}
   getStateCodeMap() {
    const {
      selectedRetailer,
      partiesMapping,
      executeVisitData,
    } = this.props;
	
    let value = false;
    //console.log(selectedRetailer.data.parentId)
    //console.log(selectedRetailer.id)
    
    if(selectedRetailer&&selectedRetailer.data&&partiesMapping.Retail_Distributor[selectedRetailer.data.parentid].state__c== partiesMapping.Retailer[selectedRetailer.id].state__c)
    {
      value = true
  
    }
    if( executeVisitData&& executeVisitData.parentid&&partiesMapping.Retail_Distributor[executeVisitData.parentid].state__c== partiesMapping.Retailer[executeVisitData.customer_sfid__c].state__c)
    {
      value = true
  
    }
    return value;
  }

  

	getTotalDiscount() {
    let orderLineData = []
		let value = 0;
    const {
      id,
      data,
      show
    } = this.props.route.params;
    const {
      allOrdersDetailsMapping
    } = this.props;

    if(show){
      orderLineData =  allOrdersDetailsMapping[id]? allOrdersDetailsMapping[id]: data.order_line
      }
    else{ orderLineData = allOrdersDetailsMapping[id]}
    if(orderLineData){
      orderLineData.map((obj) => {
			
			if(obj.component_2__c)
			//console.log(Number(obj.price))
			value +=  Number(obj.quantity__c)*(Number(obj.component_2__c))
			
		})}
		//console.log(value)
		return (value);
	}
  getTotalDiscount() {
    let orderLineData = []
		let value = 0;
    const {
      id,
      data,
      show,
    } = this.props.route.params;
    const {
      allOrdersDetailsMapping
    } = this.props;

    if(show){
      orderLineData =  allOrdersDetailsMapping[id]? allOrdersDetailsMapping[id]: data.order_line
      }
    else{ orderLineData = allOrdersDetailsMapping[id]}
    if(orderLineData){
      orderLineData.map((obj) => {
			
			if(obj.component_2__c)
			//console.log(Number(obj.price))
			value +=  Number(obj.quantity__c)*(Number(obj.component_2__c))
			
		})}
		//console.log(value)
		return (value);
	}



  getTotalOrderValue() {
    let orderLineData = []
		let value = 0;
    const {
      allOrdersDetailsMapping
    } = this.props;
    const {
      id,
      data,
      show,
    } = this.props.route.params;
    if(show){
      orderLineData =  allOrdersDetailsMapping[id]? allOrdersDetailsMapping[id]: data.order_line
      }
    else{ orderLineData = allOrdersDetailsMapping[id]}
    if(orderLineData){
      orderLineData.map((obj) => {
			
			
			value +=  Number(obj.quantity__c)*(Number(obj.total_price__c))
		})}
		//console.log(value)
		return (value);
	}
	getTotalExmill() {
    let orderLineData = []
		let value = 0;
    const {
      allOrdersDetailsMapping
    } = this.props;
    const {
      id,
      data,
      show
    } = this.props.route.params;
    if(show){
      orderLineData =  allOrdersDetailsMapping[id]? allOrdersDetailsMapping[id]: data.order_line
      }
    else{ orderLineData = allOrdersDetailsMapping[id]}
    if(orderLineData){
      orderLineData.map((obj) => {
			
			
			value +=  (Number(obj.component_1__c))
		})}
		//console.log(value)
		return (value);
	}


  getTotalTax() {

    const {
			Tax,
			
		} = this.props;
    console.log(this.getTotalOrderValueDiscount(),Tax,"taxxxxxxx")
		let value = this.getTotalOrderValueDiscount();
    let taxValue= Tax&&Tax.length&&Tax[0].igst__c?Tax[0].igst__c:0
		let tax = taxValue/100*value;
		
		return tax;
	}

  render() {
    const {
      id,
      data,
      show
    } = this.props.route.params;
   const{editCartOrder}=this.props;
  

    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        <VisitOrderCartCard
          customerName={data.from_name}
          orderDate={data.order_date__c}
          items={this.getItemCount()}
          quantity={this.getTotalQuantity()}
          dark={true}
          deliveryDate={data.delivery_date__c}
          orderValue={this.getTotalOrderValueDiscount()}
						orderValueWithoutDis={this.getTotalOrderValue()}
						//totalTax={this.getTotalTax(cart.items)}
						totalDiscount={this.getTotalDiscount()}
          totalTax={this.getTotalTax()}
          show={true}
          remark={data.remarks__c}
          showEdit={false}
        />

       {!show? 
       <BlueButton 
                    title={'Add'} 
                    style={Styles.markLostButton} 
                    textStyle={Styles.markLostButtonText} 
                    onPress={() => {NavigationService.navigate('VisitBookOrder')
                    this.props.setAddOrderLineData({id:id ,status:true, value:this.getTotalOrderValueDiscount(), total_exmill:this.getTotalExmill(), deliveryDate:data.delivery_date__c, remark:data.remarks__c})
                    editCartOrder({edited_field: 'delivery_date__c',  edited_value: data.delivery_date__c })
                  }}
                    >
                      <GenericIcon name="add-box" style={Styles.markLostButtonIcon}
                     // show={true}
                      />
                  </BlueButton>
                  :[]}

        {this.getItemDetailsNode()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  Tax: state.user.Tax,
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
  fetchOrderDetailsLoader: state.orders.fetchOrderDetailsLoader,
  deleteOrderLineLoader: state.retailers.deleteOrderLineLoader,
  editOrderQuantityLoader: state.retailers.editOrderQuantityLoader,
  partiesMapping: state.retailers.partiesMapping,
  selectedRetailer: state.retailers.selectedRetailer,
  selectedRetailer: state.retailers.selectedRetailer,
  editOrderForm: state.retailers.editOrderForm,
  retailerSearchFilters: state.retailers.retailerSearchFilters,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrderDetails: (params) => dispatch(OrdersActions.fetchOrderDetails(params)),
  deleteOrderLine: (params) => dispatch(RetailersActions.deleteOrderLine(params)),
  editOrderQuantity: (params) => dispatch(RetailersActions.editOrderQuantity(params)),
  setAddOrderLineData: (params) => dispatch(RetailersActions.setAddOrderLineData(params)),
  clearAddOrderLineData: () => dispatch(RetailersActions.clearAddOrderLineData()),
  updateSearchFilters: (params) => dispatch(RetailersActions.updateSearchFilters(params)),
  setEditOrderLineData: (params) => dispatch(RetailersActions.setEditOrderLineData(params)),
  clearEditOrderLineData: (params) => dispatch(RetailersActions.clearEditOrderLineData(params)),
  editCartOrder: (params) => dispatch(VisitsActions.editCartOrder(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderInfoScreen)

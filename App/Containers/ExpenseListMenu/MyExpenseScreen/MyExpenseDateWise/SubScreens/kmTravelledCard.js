import React,{Component} from 'react';
import { StyleSheet,View,Text,Button } from "react-native";
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputText from 'App/Components/FormInput/InputText';
import BlueButton from 'App/Components/BlueButton';
import CommonActions from 'App/Stores/Common/Actions'
import { connect } from 'react-redux';
import ExpenseActions from 'App/Stores/Expenses/Actions';
 class KmTravelledCard extends Component {
    submit() {
      const {

        form,
        updateloader,
        changeform,token
        }=this.props;

		this.props.updateform({
			form:{
				...this.props.form,
				//complaint_url__c: this.props.complaint_url__c.join(),
				//team__c:this.props.agentid,
				//customer_name__c:this.props.selectedRetailer.id,

			}  ,
			token : token
			//  ...{
			// 	token: this.props.token,
				//agentid: this.props.agentid,
				//account_type__c: this.props.user_details.business_channel__c == 'Wholesale' ? 'CRM Customer' : 'Retailer'

			
		});
	}
render(){

const {
form,
updateloader,
changeform,
validation
}=this.props;
console.log(form);

    return(


<View>
<View style={{width:'100%',marginTop:30}}>
           <InputText
                        style={Style.mb10}
                        placeholder={'KM*'}
                        value={form.kilometer_travelled__c}
                        onChange={(value) => this.props.changeform({ edited_field: 'kilometer_travelled__c', edited_value: value })}
                         error={validation.invalid && validation.invalid_field == 'kilometer_travelled__c'}
                        label={'Km Travelled*'}
                    />
                    </View>
                     <View style={{ alignItems:'center',marginLeft:'30%',marginRight:'30%',marginTop:10}}>
                    <BlueButton
                        style={Style.button}
                        textStyle={Style.text}
                        title={'Save'}
                        disabled={updateloader}
                        loading={updateloader}
                        onPress={()=>this.submit()}
                    />
                </View>
</View>




    )
}

}
const mapStateToProps = (state) => ({
     token: state.user.token,
    // expenseLine:state.expenses.teamExpenseList,
    // loader:state.expenses.teamExpenseLoader,
    validation: state.expenses.updateValidation,
    form: state.expenses.updateTravelExpense,
    updateloader:state.expenses.updateTravelExpenseLoader,

});

const mapDispatchToProps = (dispatch) => ({
    // fetchData : (params)   => dispatch(ExpenseActions.getTeamExpenses(params)),
    // openModal : (params)   => dispatch(CommonActions.openModal(params)),
    // closeModal: (params)   => dispatch(CommonActions.closeModal(params)),
    updateform    : (params)   => dispatch(ExpenseActions.updateTravelExpense(params)),
    changeform:(params) => dispatch(ExpenseActions.changeTravelExpense(params)),
    clearform :() => dispatch(ExpenseActions.clearExpense()),
});
export default connect(mapStateToProps,mapDispatchToProps) (KmTravelledCard)

let Style=StyleSheet.create({
    mb10:{
        width:'100%'
    },
    button: {
        width:'60%',
       
     
  },
  });
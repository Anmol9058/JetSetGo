import React, { Component } from 'react';
import { View,StyleSheet,Text, } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import GenericIcon from 'App/Components/GenericIcon';
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import InputText from '../../../../../Components/FormInput/InputText'
import BlueButton from 'App/Components/BlueButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ExpensesActions from 'App/Stores/Expenses/Actions'
import { connect } from 'react-redux';
import NavigationService from 'App/Services/NavigationService'

class KmEdit extends Component {
  state = {
    KmInput:'',
    visible:false
};
    showDialog = () => this.setState({visible:true})
    hideDialog = () => this.setState({visible:false})
    submitKM = () =>{
        this.props.EditTravelExpense({token:this.props.token,expense_line__id:"a101y000000OoNmAAK",
                        kilometer_travelled__c :this.state.KmInput})
        this.hideDialog();
        NavigationService.navigate('MyExpenseDateWise')
    }   
  render(){
      const {formData}=this.props;
  return (
        <View>
            <GenericIcon
                name={'edit'}
                onPress={()=>this.showDialog()}
                style={{paddingTop:'1%'}}
            />
            <Portal style={{paddingTop:'1%'}}>
                <Dialog visible={this.state.visible} onDismiss={()=>this.hideDialog()}>
                <GenericIcon
                name={'close'}
                onPress={()=>this.hideDialog()}
                style={Style.cancelIcon}
            />
                <Dialog.Title style={Style.title}>Update KM Travelled</Dialog.Title>
                <Dialog.Content>
                    <Text style={Style.textHead}>KM Travelled</Text>
                    <InputText style={Style.inputText}
                        placeholder='KM Travelled*'
                        value={this.state.KmInput}
                        onChange={(text)=>{this.setState({KmInput:text})}}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                <BlueButton
                        style={Style.button}
                        textStyle={Style.text}
                        title={'SAVE'}
                        loading={this.props.updateTravelExpenseLoading}
                        onPress={()=>this.submitKM()}
                    />
                </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
  )
  }
};

let Style=StyleSheet.create({
    title: {
        color: Colors.button,
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: 20,
        alignSelf: 'center',
    },
    cancelIcon:{
        color: Colors.button,
        //padding:('2%'),
        fontSize:20
    },
    button: {
        width: wp('20%'),
        height: hp('5%'),
        //alignSelf: 'center',
        marginRight:'40%',
    },
    text: {
        color: Colors.white,
        fontFamily: ApplicationStyles.textMsgFont,
        fontSize: wp('3%'),
        textTransform: 'uppercase',
        textAlign: 'center'
    },
});

const mapStateToProps = (state) => ({
    token: state.user.token,
    updateTravelExpenseLoading:state.expenses.updateTravelExpenseLoading,
    formData:state.expenses.updateTravelExpense
});

const mapDispatchToProps = (dispatch) => ({
    EditTravelExpense: (params) => dispatch(ExpensesActions.updateTravelExpense(params))
});

export default connect(mapStateToProps,mapDispatchToProps)(KmEdit);

import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import { Button, Textarea } from 'native-base'
import { connect } from 'react-redux'
import InputText from 'App/Components/FormInput/InputText'
import InputMobile from 'App/Components/FormInput/InputMobile'
import InputNumber from 'App/Components/FormInput/InputNumber'
import BlueButton from 'App/Components/BlueButton'
import { SUBMIT } from 'App/Constants'
import NavigationService from 'App/Services/NavigationService'
import RetailersActions from 'App/Stores/Retailers/Actions'
import { HelperService } from 'App/Services/Utils/HelperService';
import { StyleSheet } from 'react-native'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import { Left } from 'native-base'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class NewAreaForm extends Component {
	submit() {
		const {
			id,
			form,
			submit
		} = this.props;

		if (form.area__c) {
			submit({...form, id: id});
		}else {
			HelperService.showToast({
				message: 'Please Select Area'
			});
		}
	}

	

	render() {
		const { form, editForm, loading ,areaList, loader} = this.props;
		return (
			<View style={Style.container}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={Style.action}>
					
				
                    {		 loader ?
          <Text style={Style.heading1}>{'Area List Loading ..'}</Text>
        
        :
						<SearchableDropdown
						dataSource={areaList}
						placeHolderText={'Select Area*'}
						selectedValue={form.area__c}
						onChange={(value) => editForm({ edited_field: 'area__c', edited_value: value })}
						placeholder={'Type or Select Area'}
						invalid={false}
						customPickerStyles={{ ...Style.picker }}
						labelStyles={{ ...Style.pickerLabel }}
						invalid={validation.invalid && validation.invalid_field == 'area__c'}
						label={'Area*'}
						style={Style.mb10}

					/>}

					<BlueButton
						style={Style.button}
						rounded
						large
						title={SUBMIT}
						disabled={loading}
						loading={loading}
						onPress={() => this.submit()}
					/>
				</ScrollView>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		form: state.retailers.dsrAreaForm,
        loading: state.retailers.createDsrAreaLoader,
        areaList: state.retailers.dsrAreaList,
        loader: state.retailers.fetchDsrAreaListLoader
        
	}
}

const mapDispatchToProps = (dispatch) => ({
	submit: (params) => dispatch(RetailersActions.createDsrArea(params)),
	editForm: (params) => dispatch(RetailersActions.changeDsrAreaForm(params)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewAreaForm)



const Style = StyleSheet.create({
  action: {
    width: wp('90%'),
  },
  button: {
    ...Metrics.smallBottomMargin,
    width: 120,
    alignSelf:'center',
    height: hp('5%')
  },
  container: {
    ...Metrics.tinyHorizontalPadding,
    ...Metrics.tinyVerticalPadding,
    ...Helpers.center,
    backgroundColor:Colors.lightgrey,
    flex: 1,
  },
  heading: {
    alignSelf: 'center',
    color: '#0720C4',
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: 24,
    marginBottom: 15
  },
  link: {
    color: Colors.label,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'flex-end',
  },
  linkText: {
    ...Fonts.input,
    color: Colors.label,
  },
  mb10: {
    marginBottom: hp('2%'),
    height: hp('5.5%'),
    fontSize: wp('3.7%'),
    justifyContent: 'center',
    padding: 0
  },
  text: {
    color: Colors.white,
    fontFamily: ApplicationStyles.textFont,
    fontSize: 18,
  },
  picker: {
    borderRadius: hp('1%'), 
    width: wp('88%'),
    height: hp('5.7%'),
    marginBottom: hp('2%')
  },
  pickerLabel: {
    color: Colors.placeHolder,
    fontFamily: ApplicationStyles.textFont,
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  heading1: {
    alignSelf: 'center',
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    fontSize: wp('4.2%'),
	marginBottom: 0, 
  fontWeight:'bold',
  marginRight:'5%'
  },
});

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

class NewCompetitorForm extends Component {
	submit() {
		const {
			id,
			form,
			submit
		} = this.props;

		if (form.Name) {
			submit({...form, id: id});
		}else {
			HelperService.showToast({
				message: 'Please Enter Valid Name'
			});
		}
	}

	

	render() {
		const { form, editForm, loading } = this.props;
		return (
			<View style={Style.container}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={Style.action}>
					
					<InputText
						style={Style.mb10}
						placeholder={'Name'}
						value={form.Name}
						onChange={(value) => editForm({ edited_field: 'Name', edited_value: value })}
						label={'Name'}
					/>

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
		form: state.retailers.newCompetitorForm,
		loading: state.retailers.createCompetitorLoader
	}
}

const mapDispatchToProps = (dispatch) => ({
	submit: (params) => dispatch(RetailersActions.createCompetitor(params)),
	editForm: (params) => dispatch(RetailersActions.editNewCompetitorForm(params)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewCompetitorForm)



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
  }
});

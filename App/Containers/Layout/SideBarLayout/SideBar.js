import GenericIcon from 'App/Components/GenericIcon';
import NavigationService from 'App/Services/NavigationService';
import { ApplicationStyles, Colors, Helpers } from 'App/Theme';
import { ListItem } from 'native-base';
import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { HelperService } from '../../../Services/Utils/HelperService';

export default class SideBar extends Component {
	navigate(screen) {
		NavigationService.navigate(screen);
		this.props.toggleModal()
	}

	render() {
		return (
			<View style={{ width: '100%' }}>
				<View style={Styles.buttonBox}>
					<Image
						style={{ width: 100, height: 100 }}
						source={require('App/Assets/Images/logo.png')}
					/>
				</View>
				<ScrollView>
					<ListItem style={Styles.listItemDivider} onPress={() => this.navigate('ProfileScreen')}>
						<GenericIcon name={'person'} style={Styles.listItemIcon} /><Text style={{ ...Styles.selectedListItemText }}>{' Profile'}</Text>
					</ListItem>

					<ListItem style={Styles.listItemDivider} onPress={() => this.navigate('OrdersListScreen')}>
						<GenericIcon name={'cart'} style={Styles.listItemIcon} /><Text style={{ ...Styles.selectedListItemText }}>{' Orders'}</Text>
					</ListItem>

					<ListItem style={Styles.listItemDivider} onPress={() => this.navigate('SchemesListScreen')}>
						<GenericIcon name={'wallet'} style={Styles.listItemIcon} /><Text style={{ ...Styles.selectedListItemText }}>{' Schemes'}</Text>
					</ListItem>
					<ListItem style={Styles.listItemDivider} onPress={
						() => this.navigate('LocalExpenseTabScreen')
					}>
						<GenericIcon name={'wallet'} style={Styles.listItemIcon} /><Text style={{ ...Styles.selectedListItemText }}>{' Local Expense'}</Text>
					</ListItem>

					<ListItem style={Styles.listItemDivider} onPress={
						() => this.navigate('TourTabScreen')
					}>
						<GenericIcon name={'car'} style={Styles.listItemIcon} /><Text style={{ ...Styles.selectedListItemText }}>{' Tour'}</Text>
					</ListItem>

					<ListItem style={Styles.listItemDivider} onPress={
						() => this.navigate('OutstationExpenseTabScreen')
					}>
						<GenericIcon name={'wallet'} style={Styles.listItemIcon} /><Text style={{ ...Styles.selectedListItemText }}>{'Outstation Expense'}</Text>
					</ListItem>

					<ListItem style={Styles.listItemDivider} onPress={
						() => this.navigate('ExpenseItemTabScreen')
					}>
						<GenericIcon name={'swap'} style={Styles.listItemIcon} /><Text style={{ ...Styles.selectedListItemText }}>{'Move Expense Item'}</Text>
					</ListItem>

					<ListItem style={Styles.listItemDivider}>
						<GenericIcon name={'person'} style={Styles.listItemIcon} /><Text style={{ ...Styles.selectedListItemText }}>{'Log Out'}</Text>
					</ListItem>
					
				</ScrollView>
			</View>
		);
	}
}

// RetailerList
// SiteListScreen
const Styles = StyleSheet.create({
	buttonBox: {
		...Helpers.textCenter,
		alignItems: 'center',
		backgroundColor: Colors.user,
		height: hp('20%'),
		paddingTop: hp('4%')
	},
	logo: {
		width: hp('10%'),
		height: hp('10%')
	},
	selectedListItemText: {
		fontFamily: ApplicationStyles.textMsgFont,
		fontSize: wp('4%'),
		color: Colors.button
	},
	listItemIcon: {
		fontFamily: ApplicationStyles.textFont,
		fontSize: wp('4.5%'),
		color: Colors.button,
		marginHorizontal: 15
	},
	selectedListItemIcon: {
		fontFamily: ApplicationStyles.textMsgFont,
		fontSize: 18,
		color: Colors.button
	},
	listItem: {
		marginLeft: 0,
		paddingLeft: 15
	},
	listItemHeader: {
		backgroundColor: Colors.white
	},
	listItemDivider: {
		backgroundColor: Colors.clrF1F9FF,
		paddingHorizontal: 0,
		marginHorizontal: 0,
		marginLeft: 0,
		paddingTop: 20,
		paddingBottom: 20
	}
});
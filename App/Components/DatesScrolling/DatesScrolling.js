import DatePicker from 'App/Components/DatePicker';
import WhiteButton from 'App/Components/WhiteButton';
import React, { Component } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    View
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { HelperService } from '../../Services/Utils/HelperService';
import {
    Colors
} from '../../Theme';

export default class DatesScrolling extends Component {
	constructor(props) {
		super(props);
		this.selectedIndex = 0;
	}

	getItemLayout(data, index){
		let itemWidth = (Dimensions.get('window').width*.20) + 10
		return (
    		{ length: itemWidth, offset: itemWidth * index, index }
 	 	)
	}

	componentDidMount() {
    		this.scrollToIndex();
	}

	componentDidUpdate() {
    		this.scrollToIndex();
	}

	scrollToIndex(){
		if (this.flatListRef){
    		this.flatListRef.scrollToIndex({animated: true, index: this.selectedIndex});
    	}
  	}

  	cardNode(item) {
  		const {
			focusedDate,
			onDateChange
		} = this.props;
  		return (
  			<WhiteButton 
  				key={item.currentDate} 
  				vertical 
  				style={Styles.dateButton} 
  				textStyle={Styles.dateText} 
  				title={HelperService.getDisplayDate(item.currentDate)} 
  				selected={HelperService.datesAreOnSameDay(item.currentDate, focusedDate)} 
  				onPress={() => onDateChange({selectedDate: item.currentDate})}>
  			</WhiteButton>
  		)
  	}

	render() {
		const {
			startDate,
			endDate,
			onDateChange,
			selectedStartDate,
			selectedEndDate,
			focusedDate,
			allowRangeSelection,
			minDate
		} = this.props;

		let currentDate = startDate;
		let datesNode = [];
		let scrollview_ref = '';
		

		while(currentDate <=endDate) {
			datesNode.push({currentDate: currentDate})
			currentDate = HelperService.getNextDayTimestamp(currentDate);
		
				
			if (HelperService.datesAreOnSameDay(currentDate, focusedDate)){
				this.selectedIndex = datesNode.length - 1
			}
		}

		if (HelperService.datesAreOnSameDay(currentDate, endDate)) {
			datesNode.push({currentDate: currentDate})
			if (HelperService.datesAreOnSameDay(currentDate, focusedDate)){
				this.selectedIndex = datesNode.length - 1
			}
		}

		return (
			<View style={Styles.headerContainer}>
			    <FlatList
			    	data={datesNode}
            		renderItem={({ item }) => this.cardNode(item)}
            		getItemLayout={this.getItemLayout}
			    	ref={ref => {this.flatListRef = ref}}
			    	horizontal={true} 
			    	style={Styles.scrollViewContainer}>
			    </FlatList>
	            <View style={Styles.datePickerContainer}>
	            	<DatePicker 
					  	allowRangeSelection={allowRangeSelection}
					  	selectedStartDate={selectedStartDate} 
					  	selectedEndDate={selectedEndDate}
					  	minDate={minDate} 
					  	onDateChange={(params) => onDateChange({selectedDate: params.selectedStartDate})}
					  	iconStyle={Styles.datePickerIcon}
					/>
	            </View>
		    </View>
		)
	}
}


const Styles = StyleSheet.create({
	headerContainer: {
	 	flex: 1, 
		 position: 'relative',
		 
		
	},
	dateButton: {
		height: hp('4.5%'), 
		width: wp('20%'), 
		paddingLeft: 0, 
		paddingRight: 0, 
		marginHorizontal: 5,
		marginVertical:'1.5%'
	},
	dateText: {
		fontSize: wp('3%'), 
	},
	scrollViewContainer: {
		marginRight: (Dimensions.get('window').width*.12), 
		flex: 1, 
		width: (Dimensions.get('window').width) -  (Dimensions.get('window').width*.17),
		
			
		
		
	},
	datePickerContainer: {
		position: 'absolute', 
		width: 60, 
		height: hp('6%'), 
		backgroundColor: Colors.button, 
		right: -10, 
		zIndex: 2, 
		borderRadius: 5, 
		top: -hp('.75%'), 
		paddingLeft: 0, 
		paddingRight: 0, 
		borderBottomRightRadius: 0, 
		borderTopRightRadius: 0,
		alignItems: 'center', 
		justifyContent: 'center'
	},
	datePickerIcon: {
		color: Colors.white, 
		backgroundColor:Colors.primary,
		fontSize: wp('8%'), 
		marginLeft: 0, 
		marginRight: 0, 
		zIndex: 8
	}
});

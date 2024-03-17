import GenericIcon from 'App/Components/GenericIcon';
import moment from 'moment';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { HelperService } from '../../Services/Utils/HelperService';
import { ApplicationStyles, Colors } from '../../Theme';
import Style from './DatePickerStyles';



//HOW TO CALL THIS COMPONENT:
//<DatePicker 
//   allowRangeSelection={true}
//   selectedStartDate={(new Date()).getTime()} 
//   selectedEndDate={(new Date()).getTime()} 
//   onDateChange={(params) => console.log(params)}
// />

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    const {
      selectedStartDate,
      selectedEndDate
    } = props;
    this.state = {
      selectedStartDate: selectedStartDate ? moment(selectedStartDate) : null,
      selectedEndDate: selectedEndDate ? moment(selectedEndDate) : null,
      openCalender: false
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  toggleCalender() {
    this.setState({
      openCalender: !this.state.openCalender
    });
  }

  closePicker() {
    const {
      selectedStartDate,
      selectedEndDate
    } = this.props;

    this.setState({
      selectedStartDate: selectedStartDate ? moment(selectedStartDate) : null,
      selectedEndDate: selectedEndDate ? moment(selectedEndDate) : null,
      openCalender: false
    });
  }

  onSubmit() {
    const {
      iconStyle,
      allowRangeSelection,
      onDateChange
    } = this.props;

    const {
      selectedStartDate,
      selectedEndDate
    } = this.state;

    if (allowRangeSelection) {
      if (selectedStartDate && selectedEndDate) {
        onDateChange({
          selectedStartDate: HelperService.convertMomentObjectToUnix(selectedStartDate),
          selectedEndDate: HelperService.convertMomentObjectToUnix(selectedEndDate)
        });
        this.toggleCalender();
      } else {
        alert("Please Select valid Start and End Dates.")
      }
    } else {
      if (selectedStartDate) {
        onDateChange({
          selectedStartDate: HelperService.convertMomentObjectToUnix(selectedStartDate)
        });
        this.toggleCalender();
      } else {
        alert("Please valid Date.")
      }
    }
  }

  render() {
    const {
      selectedStartDate,
      selectedEndDate
    } = this.state;

    const {
      iconStyle,
      allowRangeSelection,
      children,
      minDate,
      showEdit=true
    } = this.props
    //console.log(showEdit)
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';
    let toggleNode = (<GenericIcon show={true} name={'calendar'} style={{ ...Style.icon, ...Style.iconActive, ...iconStyle }} />);
    if (children) {
      toggleNode = children;
    }
    return (
      <View>
        <TouchableOpacity transparent onPress={() => this.toggleCalender()} >
          {toggleNode}
        </TouchableOpacity>
        {this.state.openCalender&&showEdit?
          (<Modal animationType={"fade"} transparent={false} visible={this.state.openCalender}>
            <View style={Style.container}>
              <View style={Style.calenderContainer}>
                <CalendarPicker
                  startFromMonday={true}
                  allowRangeSelection={allowRangeSelection}
                  todayBackgroundColor={'#7CC3FF'}
                  selectedDayColor={Colors.button}
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                  selectedDayTextColor={Colors.white}
                  onDateChange={this.onDateChange}
                  minDate={minDate ? moment(minDate) : ''}
                  textStyle={{ fontFamily: ApplicationStyles.textFont, fontSize: 14 }}
                />
                <View style={Style.action}>
                  <Text style={Style.actionText} onPress={() => this.closePicker()}>{'CANCEL'}</Text>
                  <Text style={Style.actionText} onPress={() => this.onSubmit()}>{'DONE'}</Text>
                </View>
              </View>
            </View></Modal>) : []
        }
      </View>
    );
  }
}

DatePicker.propTypes = {
  allowRangeSelection: PropTypes.bool, //flag to allow range selection or not
  selectedStartDate: PropTypes.number, //unix timestamp in milliseconds
  selectedEndDate: PropTypes.number,//unix timestamp in milliseconds 
  styles: PropTypes.object, //custom styles for icon
  onDateChange: PropTypes.func //custom styles for icon
}
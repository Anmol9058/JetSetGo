import { Label } from 'native-base';
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RNPicker from "rn-modal-picker";
import { ApplicationStyles, Colors } from '../../Theme';

export default class SearchableDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeHolderText: this.props.placeHolderText,
      selectedText: this._getSelectedText(this.props.selectedValue) || this.props.placeHolderText
    };
  }


  _selectedValue(index, item) {
    this.setState({ selectedText: item.name });
    this.props.onChange(item.id);
  }


  _getSelectedText(item) {
    let selectedValue = '';
    if (item) {
      selectedValue = this.props.dataSource.filter((obj) => obj.id == item);
      if (selectedValue.length) {
        selectedValue = selectedValue[0].name;
      }
    }
    return selectedValue;
  }

  render() {
    return (
      <>
        {this.props.label ? <Label style={{ ...Styles.label, }}>{this.props.label}</Label> : []}
        <View style={Styles.container}>
          <RNPicker
            dataSource={this.props.dataSource}
            dummyDataSource={this.props.dataSource}
            defaultValue={true}
            showSearchBar={true}
            disablePicker={!!this.props.disabled}
            changeAnimation={"none"}
            searchBarPlaceHolder={"Search..."}
            showPickerTitle={true}
            searchBarContainerStyle={this.props.searchBarContainerStyle}
            pickerStyle={!this.props.invalid ? { ...Styles.pickerStyle, ...this.props.customPickerStyles } : { ...Styles.pickerStyle, ...this.props.customPickerStyles, ...Styles.invalidPickerStyle }}
            pickerItemTextStyle={Styles.listTextViewStyle}
            selectedLabel={this.state.selectedText}
            placeHolderLabel={this.state.placeHolderText}
            selectLabelTextStyle={{ ...Styles.selectLabelTextStyle, ...this.props.labelStyles }}
            placeHolderTextStyle={Styles.placeHolderTextStyle}
            dropDownImageStyle={Styles.dropDownImageStyle}
            selectedValue={(index, item) => this._selectedValue(index, item)}
          />
        </View>
      </>
    );
  }
}


const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    fontFamily: ApplicationStyles.textMsgFont,
    color: Colors.primary,
    fontSize: wp('4.4%'),
    marginBottom: wp('1.5%'),
    width: '106%',
    textAlign: 'left'
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    borderRadius: 10,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10
  },

  selectLabelTextStyle: {
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    textAlign: "left",
    width: "99%",
    alignSelf: 'center',
    fontSize: wp('4%')
  },
  placeHolderTextStyle: {
    marginLeft: 20,
    color: Colors.primary,
    fontFamily: ApplicationStyles.textMsgFont,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },
  listTextViewStyle: {
    color: Colors.grey,
    fontFamily: ApplicationStyles.textMsgFont,
    marginVertical: 6,
    padding: 8,
    marginHorizontal: 8,
    textAlign: "left",
    backgroundColor: Colors.lightGrey,
    borderRadius: 7
  },
  pickerStyle: {
    width: 250,
    elevation: 0,
    paddingRight: 25,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    flexDirection: "row",
    fontSize: 10
  },
  invalidPickerStyle: {
    borderColor: Colors.error,
  }
});


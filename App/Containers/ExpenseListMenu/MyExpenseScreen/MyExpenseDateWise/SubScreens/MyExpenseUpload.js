import Colors from 'App/Theme/Colors';
import { Tab, Tabs } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View,TouchableWithoutFeedback,StyleSheet, FlatList } from 'react-native';
import BlueButton from 'App/Components/BlueButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NavigationService from 'App/Services/NavigationService'
import FilePicker from '../../../../../Components/FIlePicker/FilePicker'
import CommonActions from 'App/Stores/Common/Actions';
import { HelperService } from 'App/Services/Utils/HelperService';

class MyExpenseUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: '',
            fileUri: '',
        }
    }
    upload(){
        this.props.uploadImage({image:this.state.fileUri, params: {edited_field: 'Attach_Expense_Bills'}, multiple: false})
        HelperService.showToast({ message:"Image Uploaded", duration: 2000, buttonText: '' });
        NavigationService.navigate('MyExpenseDateWise')
    }
    render(){
        return(
            <View style={{marginHorizontal:'10%'}}>
                <FilePicker onSuccess={({ fileName, fileUri }) => {
                this.setState({ fileName: fileName, fileUri: fileUri })
            }} />
                <View style={{ alignItems:'stretch',marginHorizontal:'25%', marginTop:'10%'}}>
                    <BlueButton
                        textStyle={Style.text}
                        title={'UPLOAD'}
                        loading={this.props.loader}
                        onPress={()=>{this.upload()}}
                    />
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    loader:state.common.stateList.uploadImageLoader
})

const mapDispatchToProps = (dispatch) => ({
    uploadImage: (params)=> dispatch(CommonActions.uploadImage(params)),
    
})

export default connect(mapStateToProps,mapDispatchToProps)(MyExpenseUpload)

//FilePicker
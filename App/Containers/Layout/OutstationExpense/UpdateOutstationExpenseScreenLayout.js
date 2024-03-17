import GenericIcon from 'App/Components/GenericIcon';
import WhiteButton from 'App/Components/WhiteButton';
import NavigationService from 'App/Services/NavigationService';
import { ApplicationStyles, Colors } from 'App/Theme';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import BlueButton from '../../../Components/BlueButton';
import { HelperService } from '../../../Services/Utils/HelperService';
import OutstationActions from '../../../Stores/OutstationExpense/Actions';

class UpdateOutstationExpenseScreenLayout extends React.Component {

    // onSubmit = () => {
    //     const { addExpenseItemList, submitExpenseItem, selectMyOutstationExpense, token, agentid, clearAddExpenseItemList } = this.props;
    //     if (addExpenseItemList.length) {
    //         submitExpenseItem({
    //             token,
    //             agentid,
    //             addExpenseItemList,
    //             sfid: selectMyOutstationExpense.sfid,
    //             pg_id: selectMyOutstationExpense.pg_id__c
    //         });
    //     } else {
    //         HelperService.showToast({ message: 'No Expense Item in List' });
    //     }
    //     clearAddExpenseItemList();
    // }
    render() {
        const { submitExpenseItemLoader } = this.props;
        return (
            <View style={{ padding: 8 }}>
                <View>
                    <View style={Styles.container}>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> */}

                        <View style={Styles.arrowContainer}>
                            <GenericIcon
                                name={'arrow-back'}
                                onPress={NavigationService.goback}
                                style={Styles.backArrow}
                            />
                        </View>
                        {/* <View>
                                <BlueButton
                                    title={'SUBMIT'}
                                    style={Styles.submitButton}
                                    textStyle={Styles.submitButtonText}
                                    disabled={submitExpenseItemLoader}
                                    loading={submitExpenseItemLoader}
                                    onPress={() => this.onSubmit()}
                                />
                            </View> */}
                        {/* </View> */}
                        <ScrollView
                            horizontal={true}
                        >
                            <WhiteButton
                                title={'Travel Details'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('TravelListScreen')}
                                selected={this.props.currentScreen == 'TravelListScreen'}
                            />

                            {/* <WhiteButton
                                title={'Conveyance'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('ConvenienceListScreen')}
                                selected={this.props.currentScreen == 'ConvenienceListScreen'}
                            /> */}

                            <WhiteButton
                                title={'Local Conveyance'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('LocalExpenseList')}
                                selected={this.props.currentScreen == 'LocalExpenseList'}
                            />

                            <WhiteButton
                                title={'Hotel/Own Arrangement/DA'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('HotelListScreen')}
                                selected={this.props.currentScreen == 'HotelListScreen'}
                            />

                            <WhiteButton
                                title={'Food Expense'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('FoodListScreen')}
                                selected={this.props.currentScreen == 'FoodListScreen'}
                            />

                            <WhiteButton
                                title={'Incidental Expense'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('IncidentalListScreen')}
                                selected={this.props.currentScreen == 'IncidentalListScreen'}
                            />

                            <WhiteButton
                                title={'Other Expenses'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('OtherListScreen')}
                                selected={this.props.currentScreen == 'OtherListScreen'}
                            />

                            {/* <WhiteButton
                                title={'Attachments'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('OutstationAttachmentScreen')}
                                selected={this.props.currentScreen == 'OutstationAttachmentScreen'}
                            /> */}
                        </ScrollView>
                    </View>
                </View>
                {this.props.children}
            </View >
        )
    }
}



const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    isConnected: state.network.isConnected,
    isVisible: state.common.isNetworkBannerVisible,
    currentScreen: state.common.currentScreen,
    addExpenseItemList: state.outstations.addExpenseItemList,
    selectMyOutstationExpense: state.outstations.selectMyOutstationExpense,
    submitExpenseItemLoader: state.outstations.submitExpenseItemLoader
});

const mapDispatchToProps = (dispatch) => ({
    clearAddExpenseItemList: () => dispatch(OutstationActions.clearAddExpenseItemList()),
    submitExpenseItem: (params) => dispatch(OutstationActions.submitExpenseItem(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateOutstationExpenseScreenLayout)


const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
        // justifyContent: 'space-around',
        // width: wp('100%')
    },
    header: {
        marginTop: 10,
        // alignItems: 'center',
        height: .20 * Dimensions.get('window').height,
    },
    arrowContainer: {
        width: wp('10%'),
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    backArrow: {
        color: Colors.button,
        paddingLeft: 5
    },
    actionButton: {
        borderWidth: 1,
        width: wp('30%'),
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 5
    },

    submitButton: {
        borderWidth: 1,
        width: wp('35%'),
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        margin: 5
    },
    customActionButton: {
        borderWidth: 1,
        width: wp('40%'),
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        margin: 5
    },
    actionButtonText: {
        textTransform: 'none',
        textAlign: 'center',
        fontSize: wp('3%'),
        fontFamily: ApplicationStyles.textMediumFont
    },
    submitButtonText: {
        textTransform: 'none',
        textAlign: 'center',
        fontSize: wp('4%'),
        fontFamily: ApplicationStyles.textMediumFont
    }
});

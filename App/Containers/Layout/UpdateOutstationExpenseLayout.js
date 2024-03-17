import GenericIcon from 'App/Components/GenericIcon';
import WhiteButton from 'App/Components/WhiteButton';
import NavigationService from 'App/Services/NavigationService';
import { ApplicationStyles, Colors } from 'App/Theme';
import { Header } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

class UpdateOutstationExpenseLayout extends React.Component {
    render() {
        return (
            <View>
                <Header transparent style={Styles.header}>
                    <View style={Styles.container}>


                        <View style={Styles.arrowContainer}>
                            <GenericIcon
                                name={'arrow-back'}
                                onPress={NavigationService.goback}
                                style={Styles.backArrow}
                            />
                        </View>

                        <ScrollView horizontal={true}>
                            <WhiteButton
                                title={'Travel Detail'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('TravelListScreen')}
                                selected={this.props.currentScreen == 'TravelListScreen'}
                            />

                            <WhiteButton
                                title={'Convenience'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('ConvenienceListScreen')}
                                selected={this.props.currentScreen == 'ConvenienceListScreen'}
                            />

                            <WhiteButton
                                title={'Hotel'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('HotelListScreen')}
                                selected={this.props.currentScreen == 'HotelListScreen'}
                            />

                            <WhiteButton
                                title={'Food'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('FoodListScreen')}
                                selected={this.props.currentScreen == 'FoodListScreen'}
                            />

                            <WhiteButton
                                title={'Incidental'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('IncidentalListScreen')}
                                selected={this.props.currentScreen == 'IncidentalListScreen'}
                            />

                            <WhiteButton
                                title={'Other'}
                                style={Styles.customActionButton}
                                textStyle={Styles.actionButtonText}
                                onPress={() => NavigationService.navigate('OtherListScreen')}
                                selected={this.props.currentScreen == 'OtherListScreen'}
                            />

                            <WhiteButton
                                title={'Local Expense'}
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
                </Header>
                {this.props.children}
            </View>
        )
    }
}



const mapStateToProps = (state) => ({
    isConnected: state.network.isConnected,
    isVisible: state.common.isNetworkBannerVisible,
    currentScreen: state.common.currentScreen,
})

export default connect(
    mapStateToProps
)(UpdateOutstationExpenseLayout)


const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: wp('100%')
    },
    header: {
        marginTop: 10,
        alignItems: 'center',
        height: hp('30%'),
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
        margin: 5,
        elevation: 8
    },
    customActionButton: {
        borderWidth: 1,
        width: wp('35%'),
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        margin: 5
    },
    actionButtonText: {
        fontSize: wp('3.5%'),
        fontFamily: ApplicationStyles.textMediumFont
    }
});

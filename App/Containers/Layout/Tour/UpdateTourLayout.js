import GenericIcon from 'App/Components/GenericIcon';
import WhiteButton from 'App/Components/WhiteButton';
import NavigationService from 'App/Services/NavigationService';
import { ApplicationStyles, Colors } from 'App/Theme';
import { Header } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';



class UpdateTourLayout extends React.Component {
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
                        <WhiteButton
                            title={'Tour Info'}
                            style={Styles.actionButton}
                            textStyle={Styles.actionButtonText}
                            onPress={() => NavigationService.navigate('UpdateTourScreen')}
                            selected={this.props.currentScreen == 'UpdateTourScreen'}
                        />

                        <WhiteButton
                            title={'Attachments'}
                            style={Styles.customActionButton}
                            textStyle={Styles.actionButtonText}
                            onPress={() => NavigationService.navigate('TourAttachmentScreen')}
                            selected={this.props.currentScreen == 'TourAttachmentScreen'}
                        />
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
)(UpdateTourLayout)


const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: wp('100%')
    },
    header: {
        alignItems: 'center',
        height: hp('14%')
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
        width: wp('40%'),
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 5
    },
    customActionButton: {
        borderWidth: 1,
        width: wp('40%'),
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 5
    },
    actionButtonText: {
        fontSize: wp('3.5%'),
        fontFamily: ApplicationStyles.textMediumFont
    }
});

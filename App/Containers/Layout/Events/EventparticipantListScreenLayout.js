import SearchBar from 'App/Components/SearchBar';
import RetailersActions from 'App/Stores/Retailers/Actions';
import { Body, Button, Header, Left, Right, Text, Title, } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import ApplicationStyles from '../../../Theme/ApplicationStyles';
import Colors from '../../../Theme/Colors';
import GenericIcon from 'App/Components/GenericIcon';
import NavigationService from 'App/Services/NavigationService';

class EventParticipantListScreenLayout extends React.Component {


    render() {
        const {
            updateSearchFilters,
            influencerSearchFilters
        } = this.props;

        return (
            <View>
                <Header style={Styles.header}>
                    <Left style={{ flex: 1 }}>
                        <GenericIcon
                            name={'arrow-back'}
                            onPress={NavigationService.goback}
                            style={Styles.backArrow}
                        />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title style={{ color: Colors.button, fontSize: wp('4.8%'), marginLeft: 10, textAlign: 'center' }}>{'Participants'}</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Text></Text>
                    </Right>
                </Header>

                <SearchBar
                    placeholder={`Search by ${influencerSearchFilters['searchBy']}`}
                    onInputChange={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
                    onInputSubmit={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
                    onInputClear={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': '' })}
                    value={`${influencerSearchFilters['searchValue']}`}
                    ContainerStyles={Styles.searchContainer}
                />
                {this.props.children}
            </View>
        )
    }
}



const mapStateToProps = (state) => ({
    influencerSearchFilters: state.influencers.influencerSearchFilters
});

const mapDispatchToProps = (dispatch) => ({
    updateSearchFilters: (params) => dispatch(RetailersActions.updateSearchFilters(params)),
    openMoreFiltersOption: () => dispatch(RetailersActions.openMoreFiltersOption()),
    closeMoreFiltersOption: () => dispatch(RetailersActions.closeMoreFiltersOption()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventParticipantListScreenLayout)

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: wp('100%')
    },
    header: {
        backgroundColor: 'white',
        elevation: 0,
        borderBottomWidth: 0
    },
    arrowContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    backArrow: {
        color: Colors.button,
        padding: 5
    },
    actionButton: {
        overflow: 'visible',
        borderWidth: 1.5,
        width: wp('36%'),
        paddingLeft: 0,
        paddingRight: 0
    },
    actionButtonText: {
        fontSize: wp('3.9%'),
        fontFamily: ApplicationStyles.textMediumFont
    },
    countBadge: {
        position: 'absolute',
        borderRadius: 100,
        width: 25,
        height: 25,
        backgroundColor: Colors.button,
        right: -5,
        top: -8
    },
    badgeText: {
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center'
    },
    searchContainer: {
        width: Math.round(Dimensions.get('window').width - 20),
        alignSelf: 'center',
        marginBottom: 10
    },
    submitBtnStyle: {
        width: wp('30%'),
        marginLeft: 10
    },
    actionButton: {
        overflow: 'visible',
        borderWidth: 1.5,
        width: wp('36%'),
        paddingLeft: 0,
        paddingRight: 0
    },
    actionButtonText: {
        fontSize: wp('3.9%'),
        fontFamily: ApplicationStyles.textMediumFont
    }
});

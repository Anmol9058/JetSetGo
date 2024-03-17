import GenericIcon from 'App/Components/GenericIcon';
import SearchBar from 'App/Components/SearchBar';
import WhiteButton from 'App/Components/WhiteButton';
import NavigationService from 'App/Services/NavigationService';
import EventActions from 'App/Stores/Events/Actions';
import { Badge, Header, Text } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import BlueButton from '../../../Components/BlueButton';
import ApplicationStyles from '../../../Theme/ApplicationStyles';
import Colors from '../../../Theme/Colors';

class AddParticipantListScreenLayout extends React.Component {


    render() {
        const {
            updateParticipantSearchFilters,
            eventParticipantSearchFilters
        } = this.props;

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
                            title={'Participants'}
                            style={Styles.actionButton}
                            textStyle={Styles.actionButtonText}
                            onPress={() => NavigationService.navigate('EventParticipantListScreen', { id: this.props.id, type: this.props.type })} selected={this.props.currentScreen == 'EventParticipantListScreen'}>
                            {/* <Badge style={Styles.countBadge}>
                                <Text style={Styles.badgeText}>{0}</Text>
                            </Badge> */}
                        </WhiteButton>

                        <BlueButton
                            title={'SAVE'}
                            style={Styles.submitBtnStyle}
                            textStyle={Styles.actionButtonText}
                            onPress={() => {
                                let obj = {
                                    token: this.props.token,
                                    agentid: this.props.agentid,
                                    payloads: this.props.participantObjList
                                }
                                this.props.addParticipant({ ...obj });
                            }}
                        />
                    </View>
                </Header>

                <SearchBar
                    placeholder={`Search by name`}
                    onInputChange={(text) => updateParticipantSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
                    onInputSubmit={(text) => updateParticipantSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
                    onInputClear={(text) => updateParticipantSearchFilters({ edited_field: 'searchValue', 'edited_value': '' })}
                    value={`${eventParticipantSearchFilters['searchValue']}`}
                    ContainerStyles={Styles.searchContainer}
                />
                {this.props.children}
            </View>
        )
    }
}



const mapStateToProps = (state) => ({
    token: state.user.token,
    agentid: state.user.id,
    eventParticipantSearchFilters: state.events.eventParticipantSearchFilters,
    participantObjList: state.events.participantObjList
});

const mapDispatchToProps = (dispatch) => ({
    addParticipant: (params) => dispatch(EventActions.addParticipants(params)),
    updateParticipantSearchFilters: (params) => dispatch(EventActions.updateParticipantSearchFilters(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddParticipantListScreenLayout)

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: wp('95%')
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

import SearchBar from 'App/Components/SearchBar';
import GenericIcon from 'App/Components/GenericIcon';
import NavigationService from 'App/Services/NavigationService';
import InfluencersActions from '../../../Stores/Influencers/Actions';
import { ApplicationStyles, Colors } from 'App/Theme';
import { Header } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


class InfluencersListLayout extends React.Component {

  render() {
    const {
      updateSearchFilters,
      influencerSearchFilters
    } = this.props;


    return (
            <Header style={Styles.header}>
      <View   style={Styles.container}>

         <View style={Styles.arrowContainer}>
                                    <GenericIcon
                                        name={'arrow-back'}
                                        onPress={NavigationService.goback}
                                        style={Styles.backArrow}
                                    />
                                </View>


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
      </Header>
    )
  }
}



const mapStateToProps = (state) => ({
  token: state.user.token,
  agentid: state.user.id,
  influencerOffset: state.influencers.influencerOffset,
  influencerLimit: state.influencers.influencerLimit,
  influencersList: state.influencers.influencersList,
  fetchInfluencersLoader: state.influencers.fetchInfluencersLoader,
  influencerSearchFilters: state.influencers.influencerSearchFilters
});

const mapDispatchToProps = (dispatch) => ({
  updateSearchFilters: (params) => dispatch(InfluencersActions.updateSearchFilters(params)),
  openMoreFiltersOption: () => dispatch(InfluencersActions.openMoreFilters()),
  closeMoreFiltersOption: () => dispatch(InfluencersActions.closeMoreFilters()),
  fetchInfluencers: (params) => dispatch(InfluencersActions.fetchInfluencers(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfluencersListLayout)

const Styles = StyleSheet.create({

container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: wp('100%')
    },


  header: {
    backgroundColor: Colors.white,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 65,
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomWidth: 0,
    paddingLeft: 10,
    paddingRight: 10
  },
  searchContainer: {
    width: Math.round(Dimensions.get('window').width - 45)
  },
  searchableDropdownContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  picker: {
    borderRadius: 100,
    width: 330
  },
  searchFilterContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchFilterTypeBox: {
    marginHorizontal: 5,
    width: 140,
    borderWidth: 1.5
  },
  searchFilterTypeText: {
    fontSize: 15,
    fontFamily: ApplicationStyles.textMediumFont
  },
    arrowContainer: {
        width: wp('10%'),
        alignItems: 'flex-start',
        justifyContent: 'center'
      },
      backArrow: {
        color: Colors.button,
        padding: 10
      },
});

import SearchBar from 'App/Components/SearchBar';
import { ApplicationStyles, Colors } from 'App/Theme';
import { Header } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import SitesActions from '../../../Stores/Sites/Actions';


class SitesListLayout extends React.Component {
  render() {
    const {
      siteSearchFilters,
      updateSearchFilters
    } = this.props;


    return (
      <View>
        <Header style={Styles.header}>
          <SearchBar
            placeholder={`Search by ${siteSearchFilters['searchBy']}`}
            onInputChange={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
            onInputSubmit={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': text })}
            onInputClear={(text) => updateSearchFilters({ edited_field: 'searchValue', 'edited_value': '' })}
            value={siteSearchFilters['searchValue']}
            ContainerStyles={Styles.searchContainer}
          />
        </Header>
        {this.props.children}
      </View>
    )
  }
}



const mapStateToProps = (state) => ({
  siteSearchFilters: state.sites.siteSearchFilters
});

const mapDispatchToProps = (dispatch) => ({
  updateSearchFilters: (params) => dispatch(SitesActions.updateSearchFilters(params)),
  openMoreFiltersOption: () => dispatch(SitesActions.openMoreFiltersOption()),
  closeMoreFiltersOption: () => dispatch(SitesActions.closeMoreFiltersOption()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SitesListLayout)

const Styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 80,
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomWidth: 0,
    paddingLeft: 10,
    paddingRight: 10
  },
  searchContainer: {
    width: Math.round(Dimensions.get('window').width - 20)
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
});
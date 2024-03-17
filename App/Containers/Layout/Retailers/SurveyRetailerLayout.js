import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Header, Title, Content, Button, Icon, Left, Body, Text, Input, Item, Right } from 'native-base';
import NavigationService from 'App/Services/NavigationService'
import BackArrowButton from 'App/Components/BackArrowButton'
import { Colors } from 'App/Theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


export default class NewRetailerLayout extends React.Component {
  render() {
    return (
      <View>
        <Header style={Styles.header}>
          <Left>
            <BackArrowButton />
          </Left>
          <Body>
            <Title style={Styles.title}>SURVEY</Title>
          </Body>
        </Header>
        {this.props.children}
      </View>
    )
  }
}


const Styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0
  },
  title:{
    'color':'#2f4f4f',
    'fontSize':wp('6%'),
    'fontWeight':'bold',
    'flex':2,'textAlignVertical': "center",'textAlign': "center",
    'width':wp('40%')
  }
});

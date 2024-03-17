import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Header, Title, Content, Button, Icon, Left, Body, Text, Input, Item, Right } from 'native-base';
import NavigationService from 'App/Services/NavigationService'
import BackArrowButton from 'App/Components/BackArrowButton'
import { Colors } from 'App/Theme'


export default class NewRetailerLayout extends React.Component {
  render() {
    return (
      <View>
        <Header style={Styles.header}>
          <Left>
            <BackArrowButton />
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right>
            <Button transparent>
              <Text></Text>
            </Button>
          </Right>
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
  }
});

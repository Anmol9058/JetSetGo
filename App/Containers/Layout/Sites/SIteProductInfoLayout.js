import BackArrowButton from 'App/Components/BackArrowButton';
import { Colors } from 'App/Theme';
import { Body, Button, Header, Left, Right, Text, Title } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';


export default class SiteProductInfoLayout extends React.Component {
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

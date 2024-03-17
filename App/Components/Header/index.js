import * as React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import NavigationService from '../../Services/NavigationService';

export const Header = ({ title }) => {
  

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");

  return (
    <Appbar.Header style={[{ marginTop: 2 }, styles.color]}>
      <Appbar.BackAction onPress={NavigationService.goback} />
      <Appbar.Content title={title} />
     
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  color: { backgroundColor: "white" },
});

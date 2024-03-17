import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Row, Table } from 'react-native-table-component';
import { ApplicationStyles, Colors } from '../../Theme';

const DataTable = ({tableHead, tableData}) => {
  let widthArrHead = [];
  tableHead.map((x) => {
    widthArrHead.push(78)
  });


  let widthArrRow = [];
  tableHead.map((x) => {
    widthArrRow.push(78)
  });

  if (!tableData.length) {
    tableData = [['No Data']]
    widthArrRow = [78*tableHead.length];
  }

  return(
   <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: Colors.button}}>
              <Row data={tableHead} widthArr={widthArrHead} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: Colors.button}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArrRow}
                      style={[styles.row, index%2 && {backgroundColor: Colors.white}]}
                      textStyle={styles.rowText}
                      
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
  );
};

export default DataTable


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', alignItems: 'center' },
  header: { height: 50, backgroundColor: Colors.white },
  text: { textAlign: 'center', fontFamily: ApplicationStyles.textMsgFont, color: Colors.button},
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: Colors.white},
  rowText: { textAlign: 'center', fontFamily: ApplicationStyles.textMediumFont, color: Colors.button}
});

// import React from 'react'
// import { View } from 'react-native'
// import { Picker, Label } from 'native-base'
// import Style from './SelectStyle'

// const Select = ({ selected = '', list = [], onChange = () => { }, style = {}, label = '', editable = true }) => (
//   <>
//     {label ? <Label style={{ ...Style.labelStyle }}>{label}</Label> : []}
//     <View style={{ ...Style.select, ...style }}>
//       <Picker note mode={'dropdown'} selectedValue={selected} onValueChange={onChange} enabled={editable}>
//         {list.map(({ label, value }) => (
//           <Picker.Item label={label} key={value} value={value} />
//         ))}
//       </Picker>
//     </View>
//   </>
// )

// export default Select

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      initialSelection: false, 
    };
  }

  componentDidMount() {
    // Select the initial value (if exists) on the first render
    const { list, selected, onChange } = this.props;
    if (!this.state.initialSelection && list.length > 0) {
      onChange(list[0]);
      this.setState({ initialSelection: false });
    }
  }

  renderItem = ({ item }) => {
    const { onChange } = this.props;
    const displayText = typeof item === 'object' ? item.label : item;

    return (
      <TouchableOpacity
        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
        onPress={() => {
          onChange(item);
          this.setModalVisible(false);
        }}
      >
        <Text style={{fontWeight: '600', color: '#5c5a5a'}}>{displayText}</Text>
      </TouchableOpacity>
    );
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { style, placeholder, list, selected } = this.props;
    const { modalVisible } = this.state;

    return (
      <View>
        <TouchableOpacity
          style={style}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={{fontWeight: '600', color: '#767474'}}>
            {typeof selected === 'object' ? selected.label : selected || placeholder}
          </Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
              onPress={() => this.setModalVisible(false)}
            />
            <View
              style={{
                backgroundColor: '#ffffff',
                width: '100%',
                position: 'absolute',
                justifyContent: 'center',
                alignContent: 'center',
                marginLeft: 20,
                marginRight: '20%',
                marginTop: '-50%',
                borderRadius: 6
              }}
            >
              <FlatList
                data={list}
                renderItem={this.renderItem}
                keyExtractor={(item) =>
                  typeof item === 'object' ? item.value.toString() : item.toString()
                }
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Select;
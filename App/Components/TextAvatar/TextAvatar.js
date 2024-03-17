import React from 'react'
import { View, Text } from 'react-native'
import styles from './TextAvatarStyles'
import PropTypes from 'prop-types'

class TextAvatar extends React.PureComponent {
  render() {
    const { text, size, textStyle: textStyleFromProps, backgroundColor } = this.props
    let containerStyleFromProps = {}
    if (typeof size === 'number') {
      containerStyleFromProps = {
        height: size,
        width: size,
        borderRadius: Math.ceil(size / 2),
      }
    }
    if (typeof backgroundColor === 'string') {
      containerStyleFromProps = {
        ...containerStyleFromProps,
        backgroundColor,
      }
    }
    return (
      <View style={[styles.container, containerStyleFromProps]}>
        {typeof text === 'string' && <Text style={[styles.text, textStyleFromProps]}>{text}</Text>}
      </View>
    )
  }
}

TextAvatar.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number,
  backgroundColor: PropTypes.string,
  textStyle: PropTypes.object,
}

export default TextAvatar

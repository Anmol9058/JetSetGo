import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Style from './GenericDisplayCardStyles';

const GenericDisplayCard = ({
  content,
  heading,
  dark,
  style,
  onPress
}) => (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={dark ? { ...Style.darkCard, ...style } : { ...Style.card, ...style }}>
        {
          heading ?
            (<View>
              <Text style={dark ? Style.darkTitle : Style.title}>{heading}</Text>
            </View>) : []
        }
        <View>
          {content}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )

export default GenericDisplayCard

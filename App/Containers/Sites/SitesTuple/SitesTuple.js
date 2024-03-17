import { Colors } from 'App/Theme';
import { Icon } from 'native-base';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Style from './SitesTupleStyle';
import GenericIcon from 'App/Components/GenericIcon'

const SitesTuple = ({ onPress, id, data }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={Style.box} onPress={onPress}>
      <View style={Style.tuple}>
        <View style={Style.userCircle}>
          <GenericIcon
            name={'business'}
            style={{ color: Colors.button }}
          />
        </View>
        <View style={Style.userDtl}>
          <Text style={Style.title}>{data.name}</Text>
          <Text style={Style.desc}>{data.email__c}</Text>
        </View>
      </View>

      <View style={Style.btmBox}>
        <View style={Style.strip}>
          <Text style={Style.ttl}>{'Status'}</Text>
          <Text style={Style.detail}>{data.status__c || ''}</Text>
        </View>
        <View style={Style.strip}>
          <Text style={Style.ttl}>{'Type'}</Text>
          <Text style={Style.detail}>{data.project_type__c || ''}</Text>
        </View>
        <View style={Style.strip}>
          <Text style={Style.ttl}>{'Lead Stage'}</Text>
          <Text style={Style.detail}>{data.site_stages__c || ''}</Text>
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
)

export default SitesTuple

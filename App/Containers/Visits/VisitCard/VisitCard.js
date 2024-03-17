import React from 'react'
import { Text, View, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Style from './VisitCardStyles'
import { Icon, Input, Button } from 'native-base'
import { AREA, PREV_ORDER_VAL, VISIT_THIS_WEEK, MAIN_COMPETETOR } from 'App/Constants'
import { Colors, Metrics, Helpers, Fonts, ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import { HelperService } from 'App/Services/Utils/HelperService'
import Ratings from 'App/Components/Ratings'
import WhiteButton from 'App/Components/WhiteButton'
import BlueButton from 'App/Components/BlueButton'
import GenericIcon from 'App/Components/GenericIcon'
import TextAvatar from 'App/Components/TextAvatar'
import VisitStatusBar from 'App/Containers/Visits/VisitStatusBar'

const VisitCard = ({
  visitData,
  orderData,
  categoryRatingMapping,
  onEditClick,
  onCancelClick,
  onPressStartVisit,
  onPressEndVisit,
  startVisitDisabled,
  endVisitDisabled,
  startVisitLoading,
  endVisitLoading,
  editDisabled,
  cancelDisabled,
  isASM,
  psmAssigned,
  showPsmDetails,
  startVisitText,
  disabled,
  actionVisible,
  infoVisible,
}) => {
  // console.log("visit.....",visitData);
  let infoVisibleNode = []
  infoVisibleNode = infoVisible ? (
    <WhiteButton
      selected={false}
      title={'Show Visit Info'}
      onPress={() =>
        NavigationService.navigate('VisitInfoScreen', { id: visitData.pg_id__c, data: visitData })
      }
      style={{ ...Style.actionButton, ...Style.showVisitAction, ...{ marginTop: 15 } }}
      textStyle={{ ...Style.actionButtonText, ...Style.visitActionText }}
    />
  ) : (
    []
  )
  let { text: visitTypeAvatarText, bgColor: visitTypeAvatarBgColor } =
    HelperService.getAvatarTextAndBgColorForVisitType(visitData.type__c) || {}
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        visitData.status__c == 'Completed'
          ? NavigationService.navigate('VisitInfoScreen', {
              id: visitData.pg_id__c,
              data: visitData,
            })
          : ''
      }}
    >
      <View
        style={{
          ...Style.box,
          backgroundColor: visitData.order_info.last_order_date ? '#b6d0fa' : Colors.white,
        }}
      >
        <View style={Style.tuple}>
          <View style={Style.userDtl}>
            <View style={Style.titleContainer}>
              <Text style={Style.title}>{visitData.customer_name__c}</Text>
            </View>
            {visitData.area_name ? (
              <Text style={Style.desc}>{`${visitData.area_name || ''}, ${visitData.city_name ||
                ''}`}</Text>
            ) : (
              []
            )}
            <VisitStatusBar status={visitData.status__c} />
          </View>
        </View>

        <View
          style={Style.btmBox}
          onPress={() =>
            NavigationService.navigate('VisitInfoScreen', {
              id: visitData.pg_id__c,
              data: visitData,
            })
          }
        >
          <View style={Style.strip}>
            <Text style={Style.ttl}>{'  Type'}</Text>

            <Text style={Style.detail}>{visitData.type__c}</Text>
          </View>

          <View style={Style.strip}>
            <Text style={Style.ttl}>{'  Last Visit Date'}</Text>
            <Text style={Style.detail}>
              {visitData.last_visit_date__c
                ? HelperService.dateReadableFormat(visitData.last_visit_date__c)
                : ''}
            </Text>
          </View>

          <View style={Style.strip}>
            <Text style={Style.ttl}>{'  Last order date'}</Text>
            <Text style={Style.detail}>
              {visitData.order_info.last_order_date
                ? HelperService.dateReadableFormat(visitData.order_info.last_order_date)
                : ''}
            </Text>
          </View>

          <View style={Style.strip}>
            <Text style={Style.ttl}>{'  Last order value'}</Text>
            <Text style={Style.detail}>
              {visitData.order_info.last_order_value
                ? HelperService.FixedcurrencyValue(visitData.order_info.last_order_value)
                : ''}
            </Text>
          </View>

          <View style={Style.stripM}>
            {
              // <TouchableOpacity
              // onPress={() => NavigationService.navigate('VisitInfoScreen', { id: visitData.pg_id__c, data: visitData })}>
              /* onPress={() => NavigationService.navigate('StartVisitForm')}> */
              // <Text style={Style.detail}>
              //  <GenericIcon
              //show={true}
              // name={'google-analytics'}
              //  style={Style.callActionButtonIcon}
              //   />
              // <Text style={Style.actionText}>Analytics</Text>
              //  </Text>
              // </TouchableOpacity>
            }
            <TouchableOpacity
              style={{ paddingRight: 10 }}
              onPress={() =>
                visitData.mobile__c
                  ? HelperService.callNumber(visitData.mobile__c)
                  : HelperService.showToast({
                      message: 'Mobile number unavailable ',
                      duration: 2000,
                      buttonText: 'Okay',
                    })
              }
            >
              <Text style={Style.detail}>
                <GenericIcon name={'call'} style={Style.callActionButtonIcon} />
                <Text style={Style.actionText}> Call </Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                visitData.location__latitude__s && visitData.location__longitude__s
                  ? HelperService.showDirectionInGoogleMaps(
                      visitData.location__latitude__s,
                      visitData.location__longitude__s
                    )
                  : HelperService.showToast({
                      message: 'Geo Location Not Available',
                      duration: 2000,
                      buttonText: 'Okay',
                    })
              }
            >
              <Text style={Style.detail}>
                <GenericIcon name={'my-location'} style={Style.callActionButtonIcon} />
                <Text style={Style.actionText}> Direction </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Style.ratingBox}>
          {/* <Ratings value={categoryRatingMapping[visitData.category__c] || 0} /> */}
          <Ratings value={categoryRatingMapping[visitData.category__c] || 5} />

        </View>

        {actionVisible ? (
          <TouchableOpacity style={Style.editAction} onPress={onEditClick} disabled={editDisabled}>
            <Text style={Style.detail}>
              <Text style={Style.actionText}>Reschedule </Text>
              <GenericIcon name={'create'} style={Style.editActionIcon} />
            </Text>
          </TouchableOpacity>
        ) : (
          []
        )}

        {actionVisible ? (
          <TouchableOpacity
            style={Style.cancelAction}
            onPress={onCancelClick}
            disabled={cancelDisabled}
          >
            <Text style={Style.detail}>
              <Text style={Style.actionText}>Cancel </Text>
              <GenericIcon name={'trash-can'} show={true} style={Style.editActionIcon} />
            </Text>
          </TouchableOpacity>
        ) : (
          []
        )}
        {actionVisible ? (
          <View style={Style.actionContainer}>
            <WhiteButton
              selected={false}
              title={startVisitText}
              disabled={startVisitLoading || startVisitDisabled}
              loading={startVisitLoading}
              onPress={() => onPressStartVisit()}
              style={{ ...Style.actionButton, ...Style.visitAction }}
              textStyle={{ ...Style.actionButtonText, ...Style.visitActionText }}
            />

            <WhiteButton
              selected={false}
              title={'End Visit'}
              disabled={endVisitLoading || endVisitDisabled}
              loading={endVisitLoading}
              onPress={() => onPressEndVisit()}
              style={{ ...Style.actionButton, ...Style.visitAction }}
              textStyle={{ ...Style.actionButtonText, ...Style.visitActionText }}
            />
          </View>
        ) : (
          []
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default VisitCard

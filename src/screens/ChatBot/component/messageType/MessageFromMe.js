import React from 'react';
import {moderateScale, verticalScale} from '../../../../utils/Scale';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export const MessageFromMe = ({item, onBubblePress}) => {
  return (
    <TouchableOpacity
      onPress={() => onBubblePress(item.text)}
      style={{
        marginHorizontal: moderateScale(10),
        marginVertical: verticalScale(7.5),
      }}>
      <View style={styles.message_from_me}>
        <Text style={styles.text_12_white}>{item.text}</Text>
        <View style={styles.arrowChat} />
      </View>
      <Text
        style={[
          styles.text_10_black,
          {textAlign: 'right', marginTop: verticalScale(4)},
        ]}>
        {item.time}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view_ic_arrow_left: {
    position: 'absolute',
    left: moderateScale(20),
    alignContent: 'center',
  },
  ic_arrow_left: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  text_12: {
    fontSize: moderateScale(12),
    color: '#8D8F92',
  },
  text_12_white: {
    fontSize: moderateScale(12),
    color: 'white',
  },
  text_10_black: {
    fontSize: moderateScale(10),
    color: 'black',
  },

  message_from_me: {
    alignSelf: 'flex-end',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(8),
    backgroundColor: '#007AFF',
    borderRadius: moderateScale(8),
  },
  arrowRight: {
    right: moderateScale(0, 0.5),
    bottom: -10,
    position: 'absolute',
  },
  arrowChat: {
    height: 15,
    width: 15,
    borderRadius: 3,
    backgroundColor: '#007AFF',
    position: 'absolute',
    top: 8,
    right: -5,
    transform: [{rotate: '45deg'}],
  },
});

import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {moderateScale, verticalScale} from '../../../../utils/Scale';
import {Image, StyleSheet, View} from 'react-native';
import {IconLoadingGif} from '../../../../assets';

export const MessageLoading = ({item, onBubblePress}) => {
  return (
    <View
      style={{
        marginHorizontal: moderateScale(10),
        marginVertical: verticalScale(7.5),
      }}>
      <View style={styles.message_from_me}>
        <Image
          style={styles.img}
          resizeMode="stretch"
          source={IconLoadingGif}
          autoPlay
        />
        <Svg
          style={styles.arrowLeft}
          width={moderateScale(15.5, 0.6)}
          height={moderateScale(17.5, 0.6)}
          viewBox="32.484 17.5 15.515 17.5"
          enable-background="new 32.485 17.5 15.515 17.5">
          <Path
            d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
            fill="#f1f1f3"
            x="0"
            y="0"
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  message_from_me: {
    alignSelf: 'flex-start',
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(5),
    backgroundColor: '#f1f1f3',
    borderTopLeftRadius: moderateScale(13),
    borderTopRightRadius: moderateScale(13),
    borderBottomLeftRadius: moderateScale(13),
    borderBottomRightRadius: moderateScale(13),
    marginBottom: moderateScale(12),
  },
  arrowLeft: {
    left: moderateScale(0, 0.5),
    bottom: -10,
    position: 'absolute',
  },
  img: {margin: 8, height: 9, width: 24},
});

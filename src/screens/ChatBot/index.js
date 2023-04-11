import React, { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import Sound from 'react-native-sound';
import Header from './component/header';
import VoiceHelper from './component/voiceHelper';
import MessageRating from './component/messageType/MessageRating';
import MessageDetailProduct from './component/messageType/MessageDetailProduct';

import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  RefreshControl,
  SafeAreaView, StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IconSend } from '../../assets';
import {
  BASE_URL,
  BASE_URL_CHAT,
  getData,
  getHistoryChat,
  getRatingType,
  postData,
  TERM_CONDITION,
  URL_VOICE
} from '../../networks';
import {
  pushDataChats,
  pushLoading,
  unshiftDataChats
} from '../../redux/actions/chat';
import { moderateScale, verticalScale } from '../../utils/Scale';
import { MessageCarousel } from './component/messageType/MessageCarousel';
import { MessageFromMe } from './component/messageType/MessageFromMe';
import { MessageHTML } from './component/messageType/MessageHTML';
import { MessageImage } from './component/messageType/MessageImage';
import { MessageLoading } from './component/messageType/MessageLoading';
import { MessageText } from './component/messageType/MessageText';
import { MessageWeather } from './component/messageType/MessageWeather';
import { QuickButton } from './component/QuickButton';
import VoiceHelperIos from './component/voiceHelper/voiceHelperIos';
import VoiceHelperAndroid from './component/voiceHelper/voiceHelperAndroid';


const {width} = Dimensions.get('screen');
const keyboardVerticalOffset = Platform.OS == 'ios' ? 130 : 0;


const ChatBot = ({navigation}) => {
  const dispatch = useDispatch();
  const [messageFromMe, setMessageFromMe] = useState('');
  const [dataQuickButton, setDataQuickButton] = useState([]);
  const [lon, setLon] = useState('0');
  const [lat, setLat] = useState('0');
  const [setDataTermCondition] = useState('');
  const [type_send, setTypeSend] = useState('mic');
  const [page, setPage] = useState(1);
  const [IsChatLoading, setIsChatLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [showRating, setShowRating] = useState(false)
  const [ratingQuestion, setRatingQuestion] = useState([])
  const [ratingType, setRatingType] = useState(0)
  const [dataAgentRating, setDataAgentRating] = useState({})
  const [firstMessageId, setFirstMessageId] = useState('')
  const [per_page, setPer_page] = useState('')

  const flatListRef = useRef();
  const RBSDetailProduct = useRef();

  const loginRedux = useSelector(state => state.login);
  const dataChatsRedux = useSelector(state => state.dataChats);

  let dataUserLogin = loginRedux.dataUser;
  let dataChat = dataChatsRedux.data;
  let dataParamChat = dataChatsRedux.paramChat;
  let dataRatingParam = dataChatsRedux.dataRating
  let ResponsiveVoice;
  let femaleVoice;
  let textVoice;
  let encodetext;
  let replaceText;


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLocation();
      getTermConditions();
      getDataChat('PdyMgd', 1, true);
      scrollToBottom();
      if (dataParamChat != '') {
        sendToWebhook(dataParamChat, true);
      }
      // else {
      //   if (dataChat.length === 0) {
      //     sendToWebhook('hai', false);
      //   }
      // }
    });
    return unsubscribe;
  }, [navigation, dataParamChat]);

  useEffect(() => {
    // getDataChat('PdyMgd', 1, true);
    // RBSRatingRef.current.open();
    // getRatingMessageType()
    scrollToBottom()
  }, [dataChat, dataRatingParam]);

  
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        setLon(position.coords.longitude);
        setLat(position.coords.latitude);
        // this.setState({initialPosition});
      },
      error => {
        // Alert.alert("Error", JSON.stringify(error));
        // console.log("not permission location", error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const getTermConditions = () => {
    getData(BASE_URL + TERM_CONDITION, dataUserLogin.access_token)
      .then(response => {
        setDataTermCondition(response.data.value);
      })
      .catch(error => {
        // console.log("error term condition =>", error);
      });
  };

  const onPressMessageFromMe = value => {
    setMessageFromMe(value);
    setTypeSend('chat');
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      var l = 0;
      dataChat.map(data => {
        l++;
      });
      if (l > 1) {
        flatListRef.current?.scrollToEnd({
          animated: true,
          index:
            Platform.OS === 'ios' ? dataChat.length - 1 : dataChat.length - 1,
        });
      }
    }, 1000);
  };
  
  const scrollToBottom2 = data => {
    if (data.length != undefined) {
      try {
        setTimeout(() => {
          this.flatListRef.scrollToOffset({animated: true, offset: 0});
        }, 1000);
      } catch (error) {}
    }
  };

  const setLoadingChat = () => {
    let data = {
      text: '...',
      type: 'loading',
    };
    dispatch(pushLoading(data));
  };

  const onMic2 = data => {
    setMessageFromMe(data);
    setTimeout(() => {
      sendToWebhook(data, true);
    }, 500);
  };

  const onVoiceBot = async data => {
    if (data != null && data != '') {
      (femaleVoice = URL_VOICE + dataUserLogin.data.id), (textVoice = data);
      encodetext =
        Platform.OS === 'ios' ? decodeURI(textVoice) : encodeURI(textVoice);
      replaceText = femaleVoice.replace('$paramtext', encodetext);

      ResponsiveVoice = new Sound(replaceText, null, error => {
        if (error) {
          // console.log('error voice : ',error)
        } else {
          console.log('data ResponsiveVoice', 'true');
          try {
            ResponsiveVoice.play();
          } catch (error) {
            console.log('data ResponsiveVoice', 'error');
          }
        }
      });
    }
  };

  const stopVoice = () => {
    if (typeof ResponsiveVoice != 'undefined') {
      ResponsiveVoice.stop();
      ResponsiveVoice = undefined;
    }
  };

  const stopVoiceIsMic = data => {
    stopVoice();
  };

  const onIsMic = data => {
    console.log('Ini ada di on is mic : ',data);
  };

  const onActionCarousel = item => {
    if (item.type == 'postback') {
      sendToWebhook(item.data, true);
    } else if (item.type == 'uri') {
      Linking.openURL(item.uri);
    } else if (item.type == 'location') {
      let lat = '';
      let long = '';
      const words = item.data.split(',');

      const latLng = `${words[0]},${words[1]}`;
      let label = words[2];

      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });
      Linking.openURL(url);
    } else {
      console.log('masuk else');
      sendToWebhook(item.data, true);
    }
  };

  const onSendInformasiProduct = (item) => {
    if (item.data != 'Informasi Produk') {
      sendToWebhook(item?.data, false);
    } else {
      sendToWebhook(item.data, true);
    }
  }

  const onChangeTextFromMe = data => {
    setMessageFromMe(data);
    if (data !== '') {
      setTypeSend('chat');
    } else {
      setTypeSend('mic');
    }
  };

  // =========================================================================== //

  const handleLoadMore = data => {
    // console.log("handleLoadMore", data);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getDataChat('PdyMgd', page);
  };

  const handleHistoryChat = data_chat => {
    let result_data = [];
    data_chat.data.map(response => {
      if (response.messageable_type == 'bot') {
        response.content.map(res => {
          let data = {
            ...res,
            time: moment(response.created_at).format('HH:mm'),
          };
          result_data.push(data);
        });
      } else if (response.messageable_type == 'user_platform') {
        response.content.map(res => {
          let data = {
            ...res,
            time: moment(response.created_at).format('HH:mm'),
          };
          result_data.push(data);
        });
      }else {
        response.content.map(data => {
          let data_from_me = {
            text: data.text,
            type: 'messageFromMe',
            time: moment(response.created_at).format('HH:mm'),
          };
          result_data.push(data_from_me);
        });
      }
    });
    dispatch(unshiftDataChats(result_data));
  };

  const getDataChat = async (id, data_page, isScroll) => {
    const user_id = dataUserLogin.data.id;
    try {
      const res = await getHistoryChat(id, user_id, firstMessageId, 10, dataUserLogin.access_token).then(response => {
        setFirstMessageId(res.data[0].id)
        setIsChatLoading(false);
        setRefreshing(false);
        if (!res) {
          console.log('data tidak ditemukan');
        }
        if (res.length != 0) {
          handleHistoryChat(res);
          //to scrol when first load
          isScroll && scrollToBottom2(res);
        } else {
          if (dataChat.length === 0) {
            sendToWebhook('hai', false);
          } else {
            scrollToBottom();
          }
        }
      });
    } catch (error) {
      console.log('error getDataChat => ', error);
      if (dataChat.length === 0) {
        sendToWebhook('hai', false);
      } else {
        scrollToBottom();
      }
    }
  };

  const renderChat = ({ item, index }) => {
    switch (item.type) {
      case 'messageFromMe':
        return (
          <MessageFromMe
            item={item}
            onBubblePress={value => onPressMessageFromMe(value)}
          />
        );
      case 'text':
        return (
          <MessageText
            item={item}
            onBubblePress={value => onPressMessageFromMe(value)}
          />
        );
      case 'carousel':
        return (
          <MessageCarousel
            item={item}
            onTextPress={value => onActionCarousel(value)}
            onInformasiProduct={(value) => onSendInformasiProduct(value)}
          />
        );
      case 'html':
        return <MessageHTML item={item} />;
      case 'image':
        return <MessageImage item={item} />;
      case 'weather':
        return <MessageWeather item={item} />;
      case 'loading':
        return <MessageLoading item={item} />;
      default:
        return false;
    }
  };
  
  const sendToWebhook = async (value, visible) => {
    Keyboard.dismiss()
    if (value != '') {
      let data = {
        text: value,
        type: 'messageFromMe',
        time: moment().format('HH:mm'),
      };
      if (visible) {
        dispatch(pushDataChats(data));
        scrollToBottom();
      }
      getLocation();
      setLoadingChat();
      let params = {
        user_id: dataUserLogin.data.id,
        query: value,
        lat: lat,
        lon: lon,
        channel: Platform.OS === 'ios' ? 'ios' : 'android',
      };
      postData(BASE_URL_CHAT, params, dataUserLogin.access_token )
        .then(response => {
          console.log('Ini response chatbot: ', response)
          if (response.success === true) {
            var chat_response = [];
            if (response.result.output != null) {
              var data_voice = [];
              response.result.output.map((data, index) => {
                dispatch(pushDataChats(data));
                stopVoice();
                data.time = moment().format('HH:mm');
                try {
                  if (data.speech != '' && data.speech != null) {
                    data_voice.push(data.speech);
                  }
                } catch (error) {
                  console.log('ERROR VOICE => ', error);
                }
                setDataQuickButton(response.result.quickbutton);
                scrollToBottom();
              });
              if (data_voice.length != 0) {
                // onVoiceBot(data_voice.join(',\n '));
              }
              scrollToBottom();
            }else {
              let value = {
                data: [],
                type: "",
              };
              dispatch(pushDataChats(value));
              scrollToBottom();
            }
          } else {
            let value = {
              data: [],
              type: "",
            };
            dispatch(pushDataChats(value));
            scrollToBottom();
            
          }
        })
        .catch(response => {
          console.log('catch WEBHOOK => ', response);
        });
      setMessageFromMe('');
      setTypeSend('mic');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          style={styles.list_chat}
          data={dataChat}
          renderItem={renderChat}
          keyExtractor={(item, index) => 'key' + index}
          showsVerticalScrollIndicator={false}
          animated={false}
          onEndReached={data => handleLoadMore(data)}
          onEndReachedThreshold={0.5}
          initialNumToRender={15}
          refreshControl={
            <RefreshControl
              colors={['#E74F22', '#13788B']}
              tintColor="#E74F22"
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? keyboardVerticalOffset : null
          }>
          <QuickButton
            dataQuickButton={dataQuickButton}
            sendMessage={value => sendToWebhook(value, true)}
          />
          <View style={styles.view_compose}>
            <TextInput
              keyboardType={'default'}
              style={{flex: 1, marginHorizontal: moderateScale(10), color: 'black'}}
              placeholder="Klik untuk mengetik"
              value={messageFromMe}
              onSubmitEditing={() => sendToWebhook(messageFromMe, true)}
              onChangeText={v => onChangeTextFromMe(v)}
            />
            {type_send === 'mic' ? Platform.OS === 'ios' ?
              (<VoiceHelperIos
                sendVoice={data => onMic2(data)}
                isMic={data => onIsMic(data)}
                stopVoiceInMic={data => stopVoiceIsMic(data)} />)
              : <VoiceHelperAndroid
                sendVoice={data => onMic2(data)}
                isMic={data => onIsMic(data)}
                stopVoiceInMic={data => stopVoiceIsMic(data)}
              />
             : (
              <TouchableOpacity
                onPress={() => sendToWebhook(messageFromMe, true)}>
                <Image source={IconSend} style={styles.sendImg} />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
      <MessageRating
        isVisible={showRating}
        data={dataRatingParam}
        onClose={() => { setShowRating(false) }}
        type={ratingType}
        question={ratingQuestion.length < 1 ? false : true}
        dataQuestion={ratingQuestion} dataAgent={dataAgentRating} />
      <MessageDetailProduct />
    </SafeAreaView>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5FF',
  },
  header: {
    width: width,
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    height: verticalScale(50),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#F1F5FF',
  },
  text_header: {
    fontSize: moderateScale(24),
    fontFamily: 'SF Pro Text',
  },
  view_compose: {
    width: width - moderateScale(32),
    marginLeft: moderateScale(16),
    marginBottom: Platform.OS === 'ios' ?  verticalScale(-10)  : verticalScale(10),
    flexDirection: 'row',
    height: verticalScale(50),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    backgroundColor: 'white',
  },
  list_chat: {
    // height: Dimensions.get("window").height - 250,
    // backgroundColor: "#F1F1F1",
  },
  sendImg: {
    height: moderateScale(28),
    width: moderateScale(28),
  },
});

import React from "react";
import Collapsible from "react-native-collapsible";
import Modal from "react-native-modal";
import md5 from 'md5';


import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import {
  EmotionBad,
  EmotionBadInactive,
  EmotionFlat,
  EmotionFlatInactive,
  EmotionGood,
  EmotionGoodInactive,
  ImageSuccessSubmit
} from "../../../../assets";

import { Rating } from "react-native-ratings";
import { moderateScale } from "../../../../utils/Scale";
import { useState } from "react";
import { postRating } from "../../../../networks";
import { useDispatch } from "react-redux";
import { ratingChat } from "../../../../redux/actions/chat";

const { height, width } = Dimensions.get("screen");
const keyboardVerticalOffset = Platform.OS == "ios" ? 83 : 0;

const MessageRating = ({
  isVisible,
  onClose,
  type,
  question,
  dataQuestion,
  dataAgent,
  data
}) => {

  const dispatch = useDispatch()
  const [emotSelect, setEmotSelect] = React.useState(3);
  const [isSbumit, setIsSbumit] = React.useState(1);
  const [toogleCollapse, setToogleCollapse] = React.useState(false);
  const [valueRate, setValueRate] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [initial, setInitial] = useState('')

  
  const [answer, setAnswer] = React.useState(['Pilih','Pilih']);
  const [listQuestion, setListQuestion] = useState(['q1', 'q2'])


  const emotList = [
    { id: 1, icon: EmotionBad, iconInActive: EmotionBadInactive },
    { id: 2, icon: EmotionFlat, iconInActive: EmotionFlatInactive },
    { id: 3, icon: EmotionGood, iconInActive: EmotionGoodInactive }
  ];
  

  const onsubmitStar = val => {
    console.log(val);
  };

  const onSubmitQuestion = (question,val, index) => {
    if (index > answer.length) {
      setAnswer([...answer, val])
      setListQuestion([...listQuestion, question])
    } else {
      answer.splice(index, 1, val)
      listQuestion.splice(index, 1, question)
      console.log(answer);
      console.log(listQuestion);
    }
  }

  const onSkip = () => {
    setComment('')
    dispatch(ratingChat(null))
  }

  const initialName = (param) => {
    let data_initial = ''
    param?.split(' ')?.slice(0, 2).map(data => {
      data_initial = data_initial + data?.charAt(0);
    });
    return data_initial
  }


  const onSubmitRating = async () => {
    
    const data = new FormData()
    data.append('ticketid', md5(Number(data?.row?.id)))
    data.append('rate', emotSelect)
    data.append('type', 2)

    if (data?.ratingquestion) {
      for (let i= 0; i < answer.length; i++){
        data.append(`answer[${[i]}]`, answer[i])
      }
      for (let i= 0; i <listQuestion.length; i++){
        data.append(`question[${[i]}]`, listQuestion[i])
      }
    }

    data.append('comment', comment)

    console.log('data yang dikirim : ',data);

    setLoading(true)
    try {
      await postRating(data)
        .then((res) => {
          setLoading(false)
          setComment('')
          setIsSbumit(2)

        }).catch((err) => {
          setLoading(false)
          console.log(err);
      })
    } catch (error) {
      console.log('error post rating',error);
    }

  }


  const conditionalTypeRating = type => {
    switch (type) {
      case '3':
        return (
          <View nestedScrollEnabled={true}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              keyboardVerticalOffset={
                Platform.OS === "ios" ? keyboardVerticalOffset : null
              }
            >
              <View style={styles.flexRow}>
                <View style={styles.imgInitiate}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                    {initialName(data?.row?.agentname)}
                  </Text>
                </View>
                <View style={{marginLeft: moderateScale(8)}}>
                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>{data?.row?.agentname}</Text>
                  <Text style={{color: 'grey'}}>Customer Service Agent</Text>
                </View>
              </View>
              <View style={styles.borderGap} />
              <View>
                <View style={{ alignItems: "center", position: 'relative' }}>
                  <FlatList
                    data={emotList}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    contentContainerStyle={styles.containerFlatlist}
                    renderItem={({ item, index }) => {
                      return (
                        <Pressable
                          activeOpacity={0.6}
                          onPress={() => {
                            setEmotSelect(item.id);
                          }}
                        >
                          <View style={styles.itemEmotion}>
                            <Image
                              style={styles.imgStyle}
                              source={
                                emotSelect === item.id
                                  ? item.icon
                                  : item.iconInActive
                              }
                            />
                          </View>
                        </Pressable>
                      );
                    }}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        );
      case '5':
        return (
          <View nestedScrollEnabled={true}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              keyboardVerticalOffset={
                Platform.OS === "ios" ? keyboardVerticalOffset : null
              }
            >
              <View style={styles.flexRow}>
                <View style={styles.imgInitiate}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                    {initialName(data?.row?.agentname)}
                  </Text>
                </View>
                <View style={{marginLeft: moderateScale(8)}}>
                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>{data?.row?.agentname}</Text>
                  <Text style={{color: 'grey'}}>Customer Service Agent</Text>
                </View>
              </View>
              <View style={styles.borderGap} />
              <View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View>
                    <Rating
                      type="star"
                      ratingCount={5}
                      imageSize={50}
                      onFinishRating={e => onsubmitStar(e)}
                    />
                  </View>
                  <Text style={styles.txtRateUs}>Rate Us Please</Text>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        );
      case '10':
        return (
          <View nestedScrollEnabled={true}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              keyboardVerticalOffset={
                Platform.OS === "ios" ? keyboardVerticalOffset : null
              }
            >
               <View style={styles.flexRow}>
                <View style={styles.imgInitiate}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                    {initialName(data?.row?.agentname)}
                  </Text>
                </View>
                <View style={{marginLeft: moderateScale(8)}}>
                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>{data?.row?.agentname}</Text>
                  <Text style={{color: 'grey'}}>Customer Service Agent</Text>
                </View>
              </View>
              <View style={styles.borderGap} />
              <View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View>
                    <Rating
                      type="star"
                      ratingCount={10}
                      imageSize={32}
                      onFinishRating={e => onsubmitStar(e)}
                    />
                  </View>
                  <Text style={styles.txtRateUs}>Rate Us Please</Text>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        );
      default:
        return null;
    }
  };


  return (
    <Modal isVisible={!data ? false : true}>
      <View style={styles.containerModal}>
        <View style={styles.container}>
          {isSbumit === 1
            ? <ScrollView>
                {conditionalTypeRating(data?.ratingtype)}
                <View style={styles.contentInputFeedback}>
                  {data?.ratingquestion
                    ? data?.ratingquestion.map((item, index) => {
                        return (
                          <View style={{ marginBottom: 24 }} key={index}>
                            <Text>
                              {item?.question}
                            </Text>
                            <View style={styles.contentCollapsable}>
                              {item?.answer === "option"
                                ?
                                <>
                                  <Pressable
                                    onPress={() => {
                                      setToogleCollapse(index);
                                    }}
                                  >
                                    <Text style={{ marginBottom: 5 }}>
                                      {answer[index]}
                                    </Text>
                                  </Pressable>
                                  
                                  <Collapsible
                                      collapsed={
                                        toogleCollapse === index ? false : true
                                      }
                                    >
                                      {item.list
                                        .split("\r\n")
                                        .map((list, i) => {
                                          return (
                                            <Pressable
                                              key={i}
                                              onPress={() => {
                                                setToogleCollapse(true);
                                                onSubmitQuestion(item?.question, list , index)
                                              }}
                                            >
                                              <Text style={{ marginVertical: 5 }}>
                                                {list}
                                              </Text>
                                            </Pressable>
                                          );
                                        })}
                                    </Collapsible>
                                  </>
                                : <View style={{height: 30, justifyContent: 'center'}}>
                                  <TextInput
                                    style={{height: 40, fontSize: 14, color:"black"}}
                                    placeholder="Beri Masukkan untuk kita"
                                    onChangeText={(text) => onSubmitQuestion(item?.question,text, index)}
                                  />
                                  </View>}
                            </View>
                          </View>
                        );
                      })
                    : null}
                  <Text style={styles.txtTitleFeedback}>
                    Tell us about experience!
                  </Text>
                  <View style={styles.boxInput}>
                  <TextInput
                    style={{ color: 'black' }}
                    placeholder="Very usefull"
                    multiline={true}
                    value={comment}
                    onChangeText={(text) => setComment(text)} />
                  </View>
                </View>
                <View
                  style={{
                    ...styles.flexRow,
                    justifyContent: "space-around",
                    marginTop: moderateScale(24)
                  }}
                >
                  <Pressable
                    style={{ ...styles.btn, backgroundColor: "#F3F6F9" }}
                    onPress={() => {
                      onSkip();
                      setAnswer([])
                    }}
                  >
                    <Text style={{color: '#3F5189'}}>Skip</Text>
                  </Pressable>
                  <Pressable
                    style={{ ...styles.btn, backgroundColor: "#3F5189" }}
                    onPress={() => {
                      onSubmitRating()
                    }}
                >
                  {loading ? (
                  <ActivityIndicator size={'small'} color={'white'} />
                  ): (
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      Submit
                    </Text>
                    
                  )}
                  </Pressable>
                </View>
              </ScrollView>
            : <View style={styles.containerSuccss}>
                <View />
                <View>
                  <ImageSuccessSubmit height={158} width={250} />
                  <View style={styles.contentTxt}>
                    <Text style={styles.txtThankyou}>
                      Thankyou for your feedback!
                    </Text>
                  </View>
                </View>
                <Pressable
                      style={styles.btnDone}
                      onPress={() => {
                        setIsSbumit(1);
                        onSkip()
                      }}
                    >
                      <Text style={styles.txtDone}>Done</Text>
                </Pressable>
              </View>}
        </View>
      </View>
    </Modal>
  );
};

export default MessageRating;

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    minHeight: height - 350,
    width: width,
    padding: 23,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: -10
  },
  containerSuccss: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between"
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  txtAgentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black"
  },
  contentAgentName: {
    marginLeft: moderateScale(18)
  },
  txtCustomerCare: {
    color: "#878A96"
  },
  img: {
    height: moderateScale(52),
    width: moderateScale(52),
    backgroundColor: "lightgrey",
    borderRadius: 52 / 2
  },
  gapBorder: {
    borderTopColor: "#E0E0E0",
    borderWidth: 0.5,
    marginVertical: moderateScale(24)
  },
  txtRatingTitle: {
    fontSize: moderateScale(24),
    width: moderateScale(260),
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    color: "black"
  },
  itemEmotion: {
    height: 76,
    width: 76,
    backgroundColor: "#EFF0F6",
    borderRadius: 76 / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  containerFlatlist: {
    // flexGrow: 1,
    width: "80%",
    justifyContent: "space-between",
    marginTop: moderateScale(40)
  },
  contentInputFeedback: {
    marginTop: moderateScale(24)
  },
  txtTitleFeedback: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold"
  },
  boxInput: {
    marginTop: moderateScale(16),
    height: moderateScale(135),
    width: "100%",
    borderWidth: 1,
    borderColor: "#DBDDE0",
    padding: moderateScale(8)
  },
  btn: {
    height: moderateScale(46),
    width: moderateScale(128),
    borderRadius: moderateScale(2),
    justifyContent: "center",
    alignItems: "center"
  },
  imgStyle: {
    height: 55,
    width: 55
  },
  contentTxt: {
    marginTop: moderateScale(24),
    width: moderateScale(198),
    alignSelf: "center"
  },
  txtThankyou: {
    fontSize: moderateScale(24),
    color: "black",
    textAlign: "center"
  },
  btnDone: {
    height: moderateScale(46),
    width: 374,
    backgroundColor: "#3F5189",
    justifyContent: "center",
    alignItems: "center"
  },
  txtDone: {
    color: "white",
    fontSize: 16
  },
  txtRateUs: {
    fontSize: 16,
    color: "#323F6B",
    marginBottom: 24
  },
  contentCollapsable: {
    padding: 8,
    minHeight: 40,
    borderWidth: 1,
    borderColor: "lightgrey",
    justifyContent: "center",
    marginTop: 8
  },
  txtAgentName: {
    height: 40,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 8
  },
  imgInitiate: {
    backgroundColor: '#3F5189',
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderGap: {
    width: '100%',
    borderWidth: 0.3,
    borderColor: '#E0E0E0',
    alignSelf: 'center',
    marginTop: moderateScale(24)
  }
});

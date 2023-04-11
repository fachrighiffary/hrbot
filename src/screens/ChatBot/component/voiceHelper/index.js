import Voice from "@react-native-voice/voice";
import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { IconMic, IconMicActive } from "../../../../assets";
import { moderateScale } from "../../../../utils/Scale";

class VoiceHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voice: "",
      isMic: false
    };
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = e => {
    console.log("onSpeechStart: ", e);
    this.setState({ isMic: true });
  };

  onSpeechRecognized = e => {
    console.log("onSpeechRecognized: ", e.isFinal);
    if (Platform.OS === "android") {
      this.setState((this.state.isMic = false));
    }
  };

  onSpeechEnd = e => {
    console.log("onSpeechEnd: ", e);
    this.setState({ isMic: false });
  };

  onSpeechError = e => {
    this.setState({ isMic: false });
    // this._stopRecognizing();
  };

  onSpeechResults = e => {
    console.log("onSpeechResults: ", e);
    // this.props.onSpeech(e.value[0]);
    setTimeout(() => {
      this.setState({ voice: e.value[0] });
      this.sendMessage(this.state.voice);
    }, 1000);
  };

  onSpeechPartialResults = e => {
    console.log("onSpeechPartialResults: ", e);
  };

  onSpeechVolumeChanged = e => {
    // console.log("onSpeechVolumeChanged: ", e);
  };

  _startRecognizing = async () => {
    if (this.state.isMic === true) {
      await this._stopRecognizing();
    } else {
      this.setState({ isMic: true });
      try {
        await Voice.start("id-ID");
      } catch (e) {
        console.error(e);
      }
      this.props.stopVoiceInMic(true);
    }
  };

  _stopRecognizing = async data => {
    //Stops listening for speech
    try {
      this.setState({ isMic: false });
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  // onMic = () => {
  //     console.log("onMic");
  //     // this.props.isMic(true);
  //     // this._startRecognizing();
  // };

  sendMessage(data) {
    console.log("sendMessage: ", data);
    console.log("sendMessage: ", this.props);
    this.props.sendVoice(data);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this._startRecognizing()}>
        {this.state.isMic
          ? <IconMicActive
              height={moderateScale(35)}
              width={moderateScale(35)}
            />
          : <IconMic height={moderateScale(35)} width={moderateScale(35)} />}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touch_mic: {
    marginHorizontal: moderateScale(10),
    height: moderateScale(45),
    width: moderateScale(45),
    justifyContent: "center",
    alignItems: "center"
  },
  ic_mic: {
    height: moderateScale(20),
    width: moderateScale(15),
    resizeMode: "stretch"
  }
});

export default VoiceHelper;

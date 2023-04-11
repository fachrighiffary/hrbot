import Voice from "@react-native-voice/voice";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { IconMic, IconMicActive } from "../../../../assets";
import { moderateScale } from "../../../../utils/Scale";

class VoiceHelperIos extends Component {
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

  onSpeechRecognized = e => {
    console.log("onSpeechRecognized: ", e);
  };
  onSpeechError = e => {
    console.log("onSpeechError: ", e);
    this._stopRecognizing();
    this.setState({ isMic: false });
  };
  onSpeechStart = e => {
    console.log("onSpeechStart: ", e);
  };
  onSpeechEnd = e => {
    console.log("onSpeechEnd: ", this.state.voice);
    this.sendMessage(this.state.voice);
    this.setState({ isMic: false });
  };
  onSpeechResults = e => {
    console.log("onSpeechResults: ", e);
    this.setState({ voice: e.value[0] });
    this.props.isMic(e.value[0]);

    setTimeout(() => {
      this._stopRecognizing();
    }, 2000);
  };
  onSpeechPartialResults = e => {
    console.log("onSpeechPartialResults: ", e);
  };
  onSpeechVolumeChanged = e => {
    // console.log("onSpeechVolumeChanged: ", e);
  };

  onMic = () => {
    console.log("onMic");
    this.setState({ isMic: true });
    this._startRecognizing();
    if (this.state.isMic == true) {
      this._stopRecognizing();
    }
  };

  _startRecognizing = async () => {
    try {
      await Voice.start("id-ID");
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async data => {
    //Stops listening for speech
    console.log("_stopRecognizing 1: ", "");
    this.setState({ isMic: false });
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };
  sendMessage(data) {
    console.log("sendMessage: ", data);
    console.log("sendMessage: ", this.props);
    // this.props.isMic(data);
    this.props.sendVoice(data);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onMic()}>
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
    backgroundColor: "#E74F22",
    height: moderateScale(45),
    width: moderateScale(45),
    borderRadius: moderateScale(50),
    justifyContent: "center",
    alignItems: "center"
  },
  ic_mic: {
    height: moderateScale(20),
    width: moderateScale(15),
    resizeMode: "stretch"
  }
});

export default VoiceHelperIos;

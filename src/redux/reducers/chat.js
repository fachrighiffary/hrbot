import {
  PUSH_DATA_CHATS,
  PUSH_LOADING,
  SET_PARAM_CHAT,
  SET_SPEECH_TEXT,
  PUSH_NEW_CHATS,
  RESET_CHAT,
  UNSHIFT_DATA_CHATS,
  RATING_CHAT
} from "../actions/chat";

let dataState = {
  data: [],
  paramChat: "",
  speechTText: "",
  dataRating: null
};

export const dataChats = (state = dataState, action) => {
  switch (action.type) {
    case PUSH_DATA_CHATS:
      var message = { ...state };
      var index_loading = message.data.length - 1;
      var data_loading = message.data[index_loading];

      if (message.data[index_loading] != null) {
        if (data_loading.type == "loading") {
          message.data.splice(index_loading, 1);
        }
      }
      return {
        message,
        data: [...message.data, action.payload],
        paramChat: message.paramChat,
        speechTText: message.speechTText
      };

    case UNSHIFT_DATA_CHATS:
      var message = { ...state };
      var index_loading = message.data.length - 1;
      var data_loading = message.data[index_loading];
      return {
        message,
        // data: [...action.payload, ...message.data],
        data: [...action.payload, ...message.data],
        paramChat: message.paramChat,
        speechTText: message.speechTText
      };

    case PUSH_LOADING:
      var message = { ...state };
      var index_loading = message.data.length - 1;
      var data_loading = message.data[index_loading];

      if (message.data[index_loading] != null) {
        if (data_loading.type == "loading") {
          message.data.splice(index_loading, 1);
        }
      }
      return {
        message,
        data: [...message.data, action.payload],
        paramChat: message.paramChat,
        speechTText: message.speechTText
      };

    case SET_PARAM_CHAT:
      return {
        ...state,
        data: [...state.data],
        paramChat: action.payload,
        speechTText: state.speechTText
      };

    case SET_SPEECH_TEXT:
      return {
        ...state,
        data: [...state.data],
        paramChat: state.paramChat,
        speechTText: action.payload
      };

    case PUSH_NEW_CHATS:
      return {
        ...state,
        data: action.payload
      };

    case RESET_CHAT:
      return {
        data: [],
        paramChat: "",
        speechTText: ""
      };

    case RATING_CHAT:
      return {
        ...state,
        dataRating: action.payload
      };
    default:
      return state;
  }
};

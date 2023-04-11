export const UNSHIFT_DATA_CHATS = "UNSHIFT_DATA_CHATS";
export const PUSH_DATA_CHATS = "PUSH_DATA_CHATS";
export const PUSH_LOADING = "PUSH_LOADING";
export const SET_PARAM_CHAT = "SET_PARAM_CHAT";
export const SET_SPEECH_TEXT = "SET_SPEECH_TEXT";
export const PUSH_NEW_CHATS = "PUSH_NEW_CHATS";
export const RESET_CHAT = "RESET_CHAT";
export const RATING_CHAT = "RATING_CHAT";

export const pushDataChats = data => {
  return {
    type: PUSH_DATA_CHATS,
    payload: data
  };
};

export const unshiftDataChats = data => {
  return {
    type: UNSHIFT_DATA_CHATS,
    payload: data
  };
};

export const pushLoading = data => ({
  type: PUSH_LOADING,
  payload: data
});

export const setParamChat = data => ({
  type: SET_PARAM_CHAT,
  payload: data
});

export const setSpeechToText = data => ({
  type: SET_SPEECH_TEXT,
  payload: data
});

export const pushNewChats = data => {
  return {
    type: PUSH_NEW_CHATS,
    payload: data
  };
};

export const resetChat = data => ({
  type: RESET_CHAT,
  payload: data
});

export const ratingChat = data => {
  return {
    type: RATING_CHAT,
    payload: data
  };
};

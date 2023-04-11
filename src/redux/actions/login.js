export const DATA_INPUT_USER_LOGIN1 = "DATA_INPUT_USER_LOGIN1";
export const DATA_INPUT_USER_LOGIN2 = "DATA_INPUT_USER_LOGIN2";
export const DATA_DELETE_USER_LOGIN = "DATA_DELETE_USER_LOGIN";

export const onDataInputUserLogin1 = data => ({
  type: DATA_INPUT_USER_LOGIN1,
  payload: data
});

export const onDataInputUserLogin2 = data => ({
  type: DATA_INPUT_USER_LOGIN2,
  payload: data
});

export const onDataDeleteUserLogin = () => ({
  type: DATA_DELETE_USER_LOGIN
});

import {
  COUNT,
  HANDLE_CHANGE,
  ADD_USER,
  RESET_USER,
  SEARCH,
  DELETE_USER,
  EDIT_USER,
  DELETE_ALL,
  RESTORE_LIST,
  RESTORE_FLIST,
} from "./type";

export const incCount = () => {
  return { type: COUNT };
};

export const handleChange = (e) => {
  return { type: HANDLE_CHANGE, payload: e };
};

const adduser1 = (num) => ({
  type: ADD_USER,
  payload: num,
});

export const addUser = (num) => (dispatch) => {
  dispatch(adduser1(num));
};

export const resetUser = () => {
  return { type: RESET_USER };
};

export const search = (val) => {
  return { type: SEARCH, payload: val };
};

export const deleteUser = (id) => {
  return { type: DELETE_USER, payload: id };
};

export const editUser = (user) => {
  return { type: EDIT_USER, payload: user };
};
export const deleteAll = () => {
  return { type: DELETE_ALL };
};

export const setFListAction = (user) => {
  return { type: RESTORE_LIST, payload: user };
};

export const setListAction = (user) => {
  return { type: RESTORE_FLIST, payload: user };
};

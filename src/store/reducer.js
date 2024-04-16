import {
  ADD_USER,
  COUNT,
  DELETE_ALL,
  DELETE_USER,
  EDIT_USER,
  HANDLE_CHANGE,
  RESET_USER,
  RESTORE_LIST,
  RESTORE_FLIST,
  SEARCH,
} from "./type";

const initialState = {
  count: 0,
  data: {
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "Female",
    number: "",
    marital: "",
    join: "Yes",
    contact: ["E-mail"],
  },
  list: [],
  fList: [],
  editKey: false,
  isEdit: false,
  listErr: "",
};

const reducer = (state = initialState, action) => {
  if (action.type === COUNT) {
    return { ...state, count: state.count + 2 };
  }

  if (action.type === HANDLE_CHANGE) {
    if (action.payload.target.name === "contact") {
      if (action.payload.target.checked) {
        return {
          ...state,
          data: {
            ...state.data,
            contact: [...state.data.contact, action.payload.target.value],
          },
        };
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            contact: state.data.contact.filter(
              (v) => v !== action.payload.target.value
            ),
          },
        };
      }
    } else {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.target.name]: action.payload.target.value,
        },
      };
    }
  }

  if (action.type === ADD_USER) {
    const duplicate =
      state.list.length &&
      state.list.filter((l) => {
        return JSON.stringify(l.number) === JSON.stringify(state.data.number);
      });
    if (!state.data.firstName.trim() || !state.data.lastName.trim()) {
      alert("Name should be filled");
    } else if (state.data.firstName.trim() === state.data.lastName.trim()) {
      alert("First Name and Last Name should be unique");
    } else if (!action.payload) {
      alert("Please provide valid phone number");
    } else if (state.isEdit) {
      if (JSON.stringify(state.data) === JSON.stringify(state.isEdit)) {
        alert("You didn't update anything");
      } else {
        const updateUser = state.list.map((l) => {
          if (l.id === state.isEdit.id) {
            return { ...l, ...state.data };
          }
          return l;
        });
        localStorage.setItem("list", JSON.stringify(updateUser));
        localStorage.setItem("fList", JSON.stringify(updateUser));
        return {
          ...state,
          data: initialState.data,
          list: updateUser,
          fList: updateUser,
          isEdit: false,
          editKey: false,
        };
      }
    } else if (duplicate.length & !state.isEdit) {
      return {...state, listErr: "User with this number already exist, Try to add new number"}
    } else {
      localStorage.setItem(
        "list",
        JSON.stringify([
          ...state.list,
          { ...state.data, id: new Date().getTime() },
        ])
      );
      localStorage.setItem(
        "fList",
        JSON.stringify([
          ...state.fList,
          { ...state.data, id: new Date().getTime() },
        ])
      );
      alert('USER ADDED SUCCESSFULLY...')
      return {
        ...state,
        list: [...state.list, { ...state.data, id: new Date().getTime() }],
        fList: [...state.fList, { ...state.data, id: new Date().getTime() }],
        data: { ...initialState.data },
        listErr: ''
      };
    }
  }

  if (action.type === RESET_USER) {
    return { ...state, data: initialState.data, editKey: null };
  }

  if (action.type === SEARCH) {
    const data = state.list.filter((l) => {
      return l.firstName.includes(action.payload);
    });
    return { ...state, fList: data };
  }

  if (action.type === DELETE_USER) {
    console.log("DELETE");
    if (state.editKey !== action.payload) {
      const deletedUser = state.list.filter((l) => l.id !== action.payload);
      localStorage.setItem("list", JSON.stringify(deletedUser));
      localStorage.setItem("fList", JSON.stringify(deletedUser));
      return { ...state, list: deletedUser, fList: deletedUser };
    } else {
      alert("You can't delete this user, as it is in edit mode");
    }
  }

  if (action.type === EDIT_USER) {
    return {
      ...state,
      data: action.payload,
      isEdit: action.payload,
      editKey: action.payload.id,
    };
  }

  if(action.type === DELETE_ALL) {
    localStorage.setItem("list", JSON.stringify([]));
    localStorage.setItem("fList", JSON.stringify([]));
    return initialState
  }

  if(action.type === RESTORE_LIST) {
    const a = {...state, list: action.payload};
    return {...state, list: action.payload}
  }

  if(action.type === RESTORE_FLIST) {
    const a = {...state, fList: action.payload};
    return {...state, fList: action.payload}
  }
  return state;
};

export default reducer;

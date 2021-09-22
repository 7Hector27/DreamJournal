const initialState = {
  data: { authenticated: false },
};
export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        data: {
          authenticated: action.payload.authenticated,
        },
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        data: {
          authenticated: false,
        },
      };
    default:
      return state;
  }
}

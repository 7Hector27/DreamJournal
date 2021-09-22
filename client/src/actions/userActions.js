import axios from 'axios';
export const userLogin = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/user/login', {
      email,
      password,
    });
    console.log(response);
    if (response.data.token) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          authenticated: true,
        },
      });
      localStorage.setItem('token', response.data.token);
    } else {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: {
          error: response.data.msg,
        },
      });
    }
  } catch (error) {}
};

export const userLogOut = () => (dispatch) => {
  dispatch({
    type: 'USER_LOGOUT',
  });
};

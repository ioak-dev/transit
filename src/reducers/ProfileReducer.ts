import { GET_PROFILE, SET_PROFILE } from '../actions/types';

const initialState = {
  theme: 'theme_dark',
  textSize: 'textsize_medium',
  themeColor: 'themecolor1',
  sidebar: true,
  // contextbar: false,
  hideSidebarOnDesktop: true,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_PROFILE:
      console.log('GET_PROFILE reducer');
      return {
        ...state,
      };
    case SET_PROFILE:
      console.log('SET_PROFILE reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

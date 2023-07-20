import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import AuthReducer from './reducers/AuthReducer';
import ProfileReducer from './reducers/ProfileReducer';
import UserReducer from './reducers/UserReducer';
import RoleReducer from './reducers/RoleReducer';
import SpaceReducer from './reducers/SpaceReducer';
import CompanyReducer from './reducers/CompanyReducer';
import EventReducer from './reducers/EventReducer';
import NoteReducer from './reducers/NoteReducer';
import TagReducer from './reducers/TagReducer';
import TrackReducer from './reducers/TrackReducer';
import ParticipantReducer from './reducers/ParticipantReducer';

const initialState = {};

const middleware = [thunk];

const store = configureStore(
  {
    reducer: {
      authorization: AuthReducer,
      profile: ProfileReducer,
      user: UserReducer,
      role: RoleReducer,
      company: CompanyReducer,
      space: SpaceReducer,
      event: EventReducer,
      track: TrackReducer,
      participant: ParticipantReducer,
      tag: TagReducer,
    }
  }
);
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware) // ,
//     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export default store;

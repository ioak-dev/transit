import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import UserReducer from './UserReducer';
import RoleReducer from './RoleReducer';
import SpaceReducer from './SpaceReducer';
import CompanyReducer from './CompanyReducer';
import EventReducer from './EventReducer';
import NoteReducer from './NoteReducer';
import TagReducer from './TagReducer';
import TrackReducer from './TrackReducer';
import ParticipantReducer from './ParticipantReducer';

export default combineReducers({
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
});

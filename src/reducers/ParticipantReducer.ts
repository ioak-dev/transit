/* eslint-disable no-case-declarations */
import { sortBy } from 'lodash';
import {
  PARTICIPANT_ITEMS_FETCH_AND_SET,
  PARTICIPANT_ITEMS_UPDATE,
  PARTICIPANT_ITEMS_APPEND,
  PARTICIPANT_ITEMS_DELETE,
} from '../actions/types';
import { mergeItems } from './Utils';

const initialState = {
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case PARTICIPANT_ITEMS_FETCH_AND_SET:
      console.log('PARTICIPANT_ITEMS_FETCH_AND_SET reducer');
      console.log(action);
      return {
        ...state,
        items: sortBy([...action.payload], (item) =>
          item.firstName.toLowerCase()
        ),
      };
    case PARTICIPANT_ITEMS_UPDATE:
      console.log('PARTICIPANT_ITEMS_UPDATE reducer');
      console.log(action);

      const _items: any = [...state.items];
      const index = _items.findIndex(
        (item: any) => item._id === action.payload._id
      );
      if (index > -1) {
        _items[index] = action.payload;
      }

      return {
        ...state,
        items: sortBy([..._items], (item) => item.firstName.toLowerCase()),
      };
    case PARTICIPANT_ITEMS_APPEND:
      console.log('PARTICIPANT_ITEMS_APPEND reducer');
      console.log(action);
      return {
        ...state,
        items: sortBy([...state.items, action.payload], (item) =>
          item.firstName.toLowerCase()
        ),
      };
    case PARTICIPANT_ITEMS_DELETE:
      console.log('PARTICIPANT_ITEMS_DELETE reducer');
      console.log(action);
      return {
        ...state,
        items: sortBy(
          state.items.filter((item: any) => !action.payload.includes(item._id)),
          (item: any) => item.firstName.toLowerCase()
        ),
      };
    default:
      return state;
  }
}

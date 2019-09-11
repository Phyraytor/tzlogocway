import * as types from './action-types';

export default function Chronology(state = {}, action) {

  switch(action.type) {

    case types.AUTHENTICATION:
      state.photos[state.thisPhoto].sort_by++;
      return {
        ...state,
        photos: [
          ...state.photos,
        ],
      };

    case types.DELETE_PHOTO:
      state.photos[state.thisPhoto].sort_by--;
      return {
        ...state,
        photos: [
          ...state.photos,
        ],
      };
    case types.ADD_PHOTO:
      state.photos[state.thisPhoto].sort_by++;
      return {
        ...state,
        photos: [
          ...state.photos,
        ],
      };

    case types.UPDATE_PHOTO:
      state.photos[state.thisPhoto].sort_by--;
      return {
        ...state,
        photos: [
          ...state.photos,
        ],
      };
    case types.GET_NOTIFY:
      state.photos[state.thisPhoto].sort_by++;
      return {
        ...state,
        photos: [
          ...state.photos,
        ],
      };

    case types.CLOSE_NOTIFY:
      state.photos[state.thisPhoto].sort_by--;
      return {
        ...state,
        photos: [
          ...state.photos,
        ],
      };
  }
  return state;
}

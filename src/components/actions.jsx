import * as types from './action-types';

export function deletePhoto(photo_id) {
  return {
    type: types.AUTHENTICATION,
    photo_id,
  }
}

export function showPhotos(photo_id) {
  return {
    type: types.DELETE_PHOTO,
    photo_id,
  }
}; 

export  function addPhoto(photo) {
  return {
    type: types.ADD_PHOTO,
    photo
  }
};

export  function updatePhoto(photo) {
  return {
    type: types.UPDATE_PHOTO,
    photo
  }
};
export  function getNotify(text) {
  return {
    type: types.GET_NOTIFY,
    text
  }
};
export  function closeNotify() {
  return {
    type: types.CLOSE_NOTIFY,
  }
};

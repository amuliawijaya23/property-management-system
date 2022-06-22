export const SET_PROPERTY_IMAGES = 'SET_PROPERTY_IMAGES';

export default function reducer(state, action) {
  switch (action.type) {
  
    case SET_PROPERTY_IMAGES:
      return {...state,
        images: action.value.images,
      };
      
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  };
};
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_PROPERTY = 'SET_PROPERTY';

export default function reducer(state, action) {
  switch (action.type) {
  
    case SET_APPLICATION_DATA:
      return {...state,
        properties: action.value.properties,
        agents: action.value.agents
      };
    
    case SET_PROPERTY:
      return {...state,
        properties: action.value.properties,
        property: action.value.property
      };
      
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  };
};
import {
  FETCH_EVENTS,
  FETCH_EVENT,
  SAVE_EVENT,
  GET_TITLE,
  UPDATE_TITLE
} from "../actions/types";

export default function(state = {}, action) {
  // console.log(state, action);
  switch (action.type) {
    case GET_TITLE:
      return state.title;
    case UPDATE_TITLE:
      return { ...state, title: action.payload };
    case FETCH_EVENTS:
      return { ...state, events: action.payload.data.events };
    case FETCH_EVENT:
      return { ...state, currentEvent: action.payload.data.content[0] };
    case SAVE_EVENT:
      return [...state, action.payload];
    default:
      return state;
  }
}

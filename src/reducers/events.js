import {
  FETCH_EVENTS,
  FETCH_EVENT,
  SAVE_EVENT,
  GET_TITLE,
  UPDATE_TITLE
} from "../actions/types";

export default function(state = {}, action) {
  console.log(state, action);
  switch (action.type) {
    case GET_TITLE:
      return state.title;
    case UPDATE_TITLE:
      return { ...state, title: action.payload };
    case SAVE_EVENT:
      return [...state, action.payload];
    case FETCH_EVENTS:
      const events = action.payload.data.map(event => event.name);
      return [...state, ...events];
    case FETCH_EVENT:
      const event = action.payload.data.map(event => event.name);
      return [...state, ...event];
    default:
      return state;
  }
}

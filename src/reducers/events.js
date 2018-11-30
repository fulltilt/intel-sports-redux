import {
  FETCH_EVENTS,
  FETCH_EVENT,
  SAVE_EVENT,
  UPDATE_TITLE
} from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case UPDATE_TITLE:
      return [...state, action.payload];
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

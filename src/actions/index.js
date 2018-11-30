import axios from "axios";
import {
  FETCH_EVENTS,
  FETCH_EVENT,
  SAVE_EVENT,
  UPDATE_TITLE
} from "actions/types";

export function saveEvent(event) {
  return {
    type: SAVE_EVENT,
    payload: event
  };
}

export function fetchEvents() {
  const response = axios.get(
    "https://c655cf7e-1f57-409c-be83-434b5fc016a7.mock.pstmn.io/events"
  );

  return {
    type: FETCH_EVENTS,
    payload: response
  };
}

export function fetchEvent(id) {
  const response = axios.get(`https://02044b06-719f-4061-b387-5e828bc2b9ed.mock.pstmn.io/v1/exp/nba/content/hmd?
  eventId=${id}`);

  return {
    type: FETCH_EVENT,
    payload: response
  };
}

export function updateTitle(title) {
  return {
    type: UPDATE_TITLE,
    payload: title
  };
}

import axios from "axios";

export function getEvents(league) {
  return axios
    .get("https://c655cf7e-1f57-409c-be83-434b5fc016a7.mock.pstmn.io/events")
    .then(res => res.data.events)
    .catch(err => Promise.reject(err));
}

export function getEvent(id) {
  return axios
    .get(
      `https://02044b06-719f-4061-b387-5e828bc2b9ed.mock.pstmn.io/v1/exp/nba/content/hmd?
    eventId=${id}`
    )
    .then(res => res.data.content[0])
    .catch(err => Promise.reject(err));
}

export function submitContent(properties) {
  let { tags, newEventId, category, isFeatured, contentType } = properties;
  let data = {
    eventId: newEventId,
    clipTime: {
      clipStartTime: "2018-04-11T09:52:00Z",
      clipEndTime: "2018-04-11T09:52:30Z"
    },
    category,
    categorySpecificMetadata: {},
    contentType,
    captionLine1: "GSW at HOU",
    captionLine2: "MAY 28, 2018",
    cameraLayoutUrl:
      "​https://config.sportscms.intel.com/vokegearvrapp/2018-NBA/Assets/imgs/layouts /UniqueLayoutCameraCourt4.png​",
    backgroundUrl:
      "​https://config.sportscms.intel.com/vokegearvrapp/2018-NBA/Assets/imgs/matchup -chips/GSWatHOU.jpg​",
    statType: "NBA",
    horizontalFOV: 180,
    verticalFOV: 60,
    isPublished: true,
    isFeatured,
    isUpcoming: false,
    stereoSupport: true,
    monoSupport: false,
    multicamSupport: false,
    tags: [tags.split(",")],
    isPremiumContent: true,
    multicamUrls: {
      high:
        "​http://nbavr.akamaized.net/599564/2018NBA/20180528WarriorsAtRockets/multicam/ master_highlight0.m3u8​",
      mid:
        "​http://nbavr.akamaized.net/599564/2018NBA/20180528WarriorsAtRockets/multicam/ master_highlight0.m3u8​",
      low:
        "​http://nbavr.akamaized.net/599564/2018NBA/20180528WarriorsAtRockets/multicam/ master_highlight0.m3u8​"
    }
  };
  return Promise.resolve("Success!");
  // return axios
  //   .post(
  //     "https://02044b06-719f-4061-b387-5e828bc2b9ed.mock.pstmn.io/v1/exp/nba/mam/hmd",
  //     data
  //   )
  //   .then(res => res.data)
  //   .catch(err => Promise.reject(err));
}

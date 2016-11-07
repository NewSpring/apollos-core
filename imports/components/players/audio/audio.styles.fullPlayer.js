import { StyleSheet } from "aphrodite/no-important";

export default StyleSheet.create({
  "player-flex": {
    display: "flex",
    display: "-webkit-flex", // eslint-disable-line
  },

  "player-container": {
    height: "100%",
    flexDirection: "column",
    WebkitFlexDirection: "column",
    WebkitAlignContent: "stretch",
    alignContent: "stretch",
  },

  "player-flex-one": {
    WebkitFlex: 1,
    flex: 1,
  },
});

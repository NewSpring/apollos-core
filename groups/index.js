
import { storeRoutes } from "../core/lib/store"

import { User } from "../core/client/layouts/global"
import { Home, Routes } from "./client/pages"

export default storeRoutes({
  path: "groups",
  component: User,
  // indexRoute: { component: Home },
  childRoutes: Routes,
  // onEnter: (_, replaceState) => replaceState(null, "/groups/finder")
})
// export default storeRoutes({
//   path: "profile",
//   getComponent(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, require("./../core/client/layouts/global/auth"))
//       }, "profile");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("profile");
//       cb(null, require("./../core/client/layouts/global/auth"));
//     }
//   },
//
//   getIndexRoute(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, {
//           component: require("./client/pages/home")
//         })
//       }, "profile");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("profile");
//       cb(null, {
//         component: require("./client/pages/home")
//       });
//     }
//   },
//
//   getChildRoutes(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, require("./client/routes"))
//       }, "profile");
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push("profile");
//       cb(null, require("./client/routes"));
//     }
//   }
// })

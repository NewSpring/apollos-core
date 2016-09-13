import { Meteor } from "meteor/meteor";
import Likes from "../collections/likes";

if (Meteor.isServer) {
  // must use function because arrow version doesn't like 'this'
  Meteor.publish("likes", function () {
    return Likes.find(
      {
        userId: this.userId,
      },
      {
        sort: {
          dateLiked: -1,
        },
      }
    );
  });

  Meteor.publish("recently-liked", () => {
    return Likes.find(
      {
        // userId: {
        //   $not: this.userId
        // }
      },
      {
        sort: {
          dateLiked: -1,
        },
        limit: 15,
      }
    );
  });
}

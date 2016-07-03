import { Component, PropTypes } from "react";
import { Link } from "react-router";

import Card from "apollos/dist/core/components/cards"
import Helpers from "/imports/helpers"

export default class FeedItem extends Component {

  static propTypes = {
    // item: PropTypes.object.isRequired
  }

  isSeriesItem = () => {
    return (
      this.props.item.channelName === "series_newspring" ||
        this.props.item.channelName === "sermons"
    )
  }

  getImage = (item) => {
    if (item.channelName === "sermons") {
      // if (item.content.images.length > 0) return Helpers.backgrounds.image(item);
      // const series = Collections.findOne({ entryId: item.collectionId });
      // if (series) return Helpers.backgrounds.image(series);
    }
    else {
      return Helpers.backgrounds.image(item)
    }
  }

  overlayStyles = (item) => {
    if (item.channelName === "sermons") {
      // const series = Collections.findOne({ entryId: item.collectionId });
      // if (series) return Helpers.styles.overlay(series);
    }
    else {
      return Helpers.styles.overlay(item)
    }
  }

  cardClasses = (item) => {
    let classes = []

    if (this.isSeriesItem()) {
      let collection;
      if (item.channelName === "sermons") {
        // collection = Collections.findOne({ entryId: item.collectionId });
      } else {
        collection = this.props.item;
      }

      // if (collection) {
      //   const collectionClass = Helpers.collections.classes(collection);
      //   if (collectionClass) {
      //     classes.push(Helpers.collections.classes(collection));
      //   }
      // }

      classes = classes.concat([
        "overlay--gradient",
        "rounded",
        "background--fill"
      ])
    } else {
      classes.push("rounded-top")
    }

    return classes
  }

  itemTheme = () => {
    let classes = [
      "card__item",
      "soft",
      "text-center",
      "soft-ends",
      "rounded-bottom"
    ];

    if (this.isSeriesItem()) {
      classes.push("overlay__item", "outlined--none");
    }
    return classes.join(" ")
  }

  h4Classes = () => {
    return [
      this.isSeriesItem() ? "text-light-primary" : "text-dark-primary",
      "capitalize",
    ].join(" ");
  }

  categoryClasses = () => {
    return this.isSeriesItem() ? "text-light-primary" : "text-dark-tertiary"
  }

  timeClasses = () => {
    let classes = ["text-right", "float-right"];
    if (this.isSeriesItem()) {
      classes.push("text-light-primary");
    }
    else {
      classes.push("text-dark-tertiary");
    }
    return classes.join(" ");
  }

  iconClasses = () => {
    let classes = `soft-half-right ${Helpers.categories.icon(this.props.item)} `;
    classes += this.isSeriesItem() ? "text-light-primary" : "text-dark-tertiary";
    return classes
  }


  render() {
    const item = this.props.item;

    return (
      <Card
        link={Helpers.content.links(item)}
        classes={this.cardClasses(item)}
        imageclasses={["rounded-top"]}
        image={{ url: this.getImage(item), ratio: "square", full: this.isSeriesItem() }}
        itemTheme={this.itemTheme()}
        linkAll={true}
      >
        <style>{this.overlayStyles(item)}</style>

        <div className="text-left">
          <h4 className={this.h4Classes()}>{item.title}</h4>
          <i className={this.iconClasses()}></i>
          <h7 className={this.categoryClasses()}>{Helpers.categories.name(item)}</h7>
          <h7 className={this.timeClasses()}>{Helpers.time.relative(item)}</h7>
        </div>
      </Card>
    )

  }
}

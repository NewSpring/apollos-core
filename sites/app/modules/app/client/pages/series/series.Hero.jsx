import { Component, PropTypes } from "react";

import { Video } from "app/client/components/players"
import Helpers from "app/client/helpers"

export default class SeriesHero extends Component {

  state = {
    playing: false
  }

  static propTypes = {
    series: PropTypes.object.isRequired
  }

  backgroundClasses = () => {
    return [
      "one-whole",
      "overlay--gradient",
      "ratio--square",
      "background--fill",
      Helpers.collections.classes(this.props.series)
    ].join(" ")
  }

  iconStyles = () => {
    return {
      position: "relative",
      top: "2px",
    }
  }

  play = () => {
    if (this.player) {
      this.player.show({play: true})
      this.setState({playing: true})
    } else {
      setTimeout(this.play, 250)
    }


  }

  stop = () => {
    if (this.player) {
      this.player.hide();
    }
    this.setState({playing: false})
  }

  ready = (player) => {
    this.player = player
  }

  button = () => {
    if (this.state.playing) {
      return (
        <button className="btn--light display-block one-whole" onClick={this.stop}>
          <i className="soft-half-right icon-close" style={this.iconStyles()}></i>
          Close The Trailer
        </button>
      )
    }

    return (
      <button className="btn--light display-block one-whole" onClick={this.play}>
        <i className="soft-half-right icon-play" style={this.iconStyles()}></i>
        Watch The Trailer
      </button>
    )
  }

  render() {

    const series = this.props.series;

    return (
      <section className="hard">
        <div className="one-whole ratio--square" style={{
            position: "absolute",
            zIndex: "10"
          }}>
          <div className="ratio__item">
            <Video
              id={series.content.ooyalaId}
              ref="video"
              success={this.ready}
              hide={true}
            />
          </div>
        </div>
        <div
          className={this.backgroundClasses()}
          style={Helpers.backgrounds.styles(series)}>
          <div className="overlay__item text-light-primary soft-sides push-top">
            {this.button()}
          </div>
        </div>
      </section>
    );
  }
}


// @flow

// $FlowMeteor
import { Meteor } from "meteor/meteor";
import { css } from "aphrodite";

import Forms from "../../../components/forms";
import Styles from "../../add-schedule/styles-css";

type IRenderAmountInput = {
  classes: string,
  state: Object,
  preFill: Function,
  format: Function,
  inputVal: string,
};

const RenderAmountInput = ({
  state,
  classes,
  format,
  preFill,
  inputVal,
}: IRenderAmountInput) => {
  if (state.fund) {
    return (
      <div className="display-block">
        <h3 className={`${classes} push-half-bottom push-half-right display-inline-block`}>
          with
        </h3>
        <Forms.Input
          id={state.id}
          name={state.fund || "secondary-account"}
          hideLabel
          type={Meteor.isCordova ? "text" : "tel"}
          classes={["soft-bottom", "input--active", "display-inline-block"]}
          inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${css(Styles["show-placeholder"])}`}
          placeholder="$0.00"
          format={format}
          defaultValue={preFill(state.id)}
          style={{ maxWidth: "150px" }}
          value={inputVal}
        />
      </div>
    );
  }
  return null;
};

type ILayout = {
  classes: string,
  accounts: Object,
  state: Object,
  preFill: Function,
  showInputs: Function,
  format: Function,
  selectVal: Function,
  inputVal: string,
}

const Layout = ({
  classes,
  accounts,
  state,
  preFill,
  showInputs,
  format,
  selectVal,
  inputVal,
}: ILayout) => (
  <div>
    <div className={`display-inline-block push-half-bottom h3 push-half-right ${classes}`}>
      and give to
    </div>

    <Forms.Select
      items={accounts}
      name="select-account"
      id={`${state.id}_select`}
      hideLabel
      classes={["soft-bottom", "display-inline-block", `${css(Styles.select)}`]}
      inputClasses={`${classes} outlined--dotted outlined--light h3 hard-top flush-bottom`}
      placeholder="select fund"
      onChange={showInputs}
      includeBlank
      deselect
      selected={selectVal}
    />

    <RenderAmountInput
      state={state}
      classes={classes}
      format={format}
      preFill={preFill}
      inputVal={inputVal}
    />
  </div>
);

export default Layout;

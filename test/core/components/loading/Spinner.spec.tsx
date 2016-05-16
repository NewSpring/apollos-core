
import * as React from "react";
import * as chai from "chai";
import { shallow, ShallowWrapper } from "enzyme";

declare function require(name: string);
const chaiEnzyme = require("chai-enzyme");
chai.use(chaiEnzyme()) // Note the invocation at the end
const { expect, assert } = chai;

import Spinner from "./../../../../src/core/components/loading/Spinner";


function hasRegexClass(wrapper: ShallowWrapper<any, any>, klass: RegExp): boolean {
  const html = wrapper.html();
  return html.match(klass).length > 0;
};

describe("<Spinner /> component", () => {

 it("has the correct classname", () => {
    const wrapper = shallow(<Spinner />);
    console.log(wrapper.html())
    expect(hasRegexClass(wrapper, /loader/)).to.equal(true);
  });

  it("can apply the theme", () => {
    const wrapper = shallow(<Spinner theme="foobar" />);
    expect(wrapper.hasClass("foobar")).to.equal(true);
  });

  it("can have a theme that overrides defaults", () => {
    const wrapper = shallow(<Spinner theme="foobar" />);
    expect(wrapper.hasClass("loader")).to.equal(false);
  });

  it("can have extra classes passed to it", () => {
    const wrapper = shallow(<Spinner classes={["foobar"]} />);
    expect(wrapper.hasClass("foobar")).to.equal(true);
    // expect(wrapper.hasClass("loader")).to.equal(true);
    expect(hasRegexClass(wrapper, /loader/)).to.equal(true);
  });

  it("can set independent styles", () => {
    const wrapper = shallow(<Spinner styles={{borderColor: "#fff"}} />);
    expect(wrapper).to.have.style("border-color", "#fff");
  });

});

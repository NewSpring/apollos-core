// @flow

import SectionHeader from "../../../components/sectionHeader";
import SmallButton from "../../../components/buttons/small";

import Activity from "./Activity";
import Schedules from "./Schedules";
import SavedPayments from "./SavedPayments";

const Layout = () => (
  <div className="soft-sides@lap-and-up soft-half-top@lap-and-up soft-bottom">
    <SectionHeader
      title="Activity"
      link={
        <SmallButton
          text="See All"
          linkUrl="/give/history"
          className="btn--dark-tertiary flush"
        />
      }
    />
    <Activity />

    <Schedules />

    <SavedPayments />

  </div>
);

export default Layout;

import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";

import {
  nav as navActions,
} from "../../../store";

import { avatar } from "../../../methods/files/browser";

import Layout from "./Layout";

import Menu from "./Menu";
import ChangePassword from "./ChangePassword";
import PersonalDetails from "./PersonalDetails";
import HomeAddress from "./HomeAddress";
import PaymentDetails from "./Payments";

const mapQueriesToProps = () => ({
  data: {
    query: gql`
      query GetPersonForSettings {
        person: currentPerson(cache: false) {
          firstName
          lastName
          nickName
          photo
          home {
            state
            city
          }
        }
      }
    `,
  },
});
@connect({ mapQueriesToProps })
class Template extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: {
      person: PropTypes.object.isRequired,
    },
    location: {
      pathname: PropTypes.string.isRequired,
    },
    children: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
  }

  onUpload = (e) => {
    const files = e.target.files;

    if (!Meteor.settings.public.rock) {
      return;
    }

    const data = new FormData();
    data.append("file", files[0]);

    const { baseURL, token, tokenName } = Meteor.settings.public.rock;

    fetch(`${baseURL}api/BinaryFiles/Upload?binaryFileTypeId=5`, {
      method: "POST",
      headers: { [tokenName]: token },
      body: data,
    })
      .then((response) => (response.json()))
      .then((id) => {
        avatar(id, () => {
          updateUser(Meteor.userId(), this.props.dispatch);
        });
      });

    const save = (url) => {
      this.setState({
        photo: url,
      });
    };

    for (const file in files) {
      const reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (() => (
        (event) => (
          save(event.target.result) // Render thumbnail
        )
      ))(files[file]);

      // Read in the image file as a data URL.
      reader.readAsDataURL(files[file]);

      break;
    }
  }

  render() {
    const { person } = this.props.data;

    let mobile = process.env.WEB;
    if (this.props.location.pathname.split("/").length > 3) {
      mobile = false;
    }

    return (
      <Layout person={person || {}} mobile={mobile} onUpload={this.onUpload}>
        {this.props.children}
      </Layout>
    );
  }
}


const Routes = [
  {
    path: "settings",
    component: Template,
    indexRoute: {
      component: Menu,
    },
    childRoutes: [
      { path: "change-password", component: ChangePassword },
      { path: "personal-details", component: PersonalDetails },
      { path: "home-address", component: HomeAddress },
      { path: "saved-accounts", component: PaymentDetails },
    ],
  },
];

export default {
  Template,
  Routes,
};

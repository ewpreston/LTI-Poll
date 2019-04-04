import React from "react";
import JSONTree from "react-json-tree";
import Button from "@material-ui/core/Button";

class LtiAdvView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createPoll = this.createPoll.bind(this);
  }

  componentDidMount() {
    fetch("jwtPayloadData")
      .then(result => result.json())
      .then(jwtPayload => {
        this.setState({
          header: jwtPayload.header,
          body: jwtPayload.body,
          returnUrl: jwtPayload.return_url,
          errorUrl: jwtPayload.error_url,
          verified: jwtPayload.verified,
          namesRoles: jwtPayload.names_roles,
          grading: jwtPayload.grading
        });
      });
  }

  createPoll() {
    alert("Insert create poll function here");
  }

  render() {
    const body = JSON.stringify(this.state.body);
    const verified = this.state.verified ? (
      <span className="verified">
        Verified
        <br />
      </span>
    ) : (
      <span className="notverified">
        Verify failed
        <br />
      </span>
    );

    return (
      <div>
        <div>
          <p>We have received your LTI launch. You can view the JSON below.</p>
          <span>What would you like to do?</span>
          <div>
            <Button
              variant={"outlined"}
              onClick={this.createPoll}
              color={"primary"}>
              Create Poll
            </Button>
          </div>
        </div>

        <br />
        <h4>Resource Launch</h4>
        {verified}

        <b>JWT Header</b>
        <JSONTree data={this.state.header} hideRoot={true} />

        <b>JWT Body</b>
        <JSONTree data={this.state.body} hideRoot={true} />
      </div>
    );
  }
}

export default LtiAdvView;

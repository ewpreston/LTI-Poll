import React from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

class LaunchEndpoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {request: {}};
    this.createPoll = this.createPoll.bind(this);
  }

  createPoll() {
    alert('Insert create poll function here');
  }


  render() {
    return (
      <div>
        <div className="row">
          <h2>Welcome to the LTI Polling Tool</h2>
        </div>

        <div className="row">
            <FormGroup>
              <Button onClick={this.createPoll}>Create Poll</Button>
            </FormGroup>
        </div>

        <div className="row">
          <h2>Your Polls</h2>
        </div>

        <div className="row">
          <h2>Your configuration</h2>

        </div>

        <div className="row">
          For the setup page go <a href="/setup">here</a>
        </div>
      </div>
    )
  }
}

module.exports = LaunchEndpoint;
import React from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

class LaunchEndpoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {config: {}, setupData: {}};
    this.createPoll = this.createPoll.bind(this);
  }

  componentDidMount() {
    fetch('config')
      .then(result => result.json())
      .then(config => {
        this.setState({config: config});
        });

    fetch('setupData')
      .then(result => result.json())
      .then(setupData => {
        this.setState({setupData: setupData});
      })
  }

  createPoll() {
    alert('Insert create poll function here');
  }

  render() {
    const baseUrl = this.state.config.provider_domain + (this.state.config.provider_port !== 'NA' ? ':' + this.state.config.provider_port : '');

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
          <p>LTI 1.3 Launch URL: {baseUrl}</p>
          <p>Blackboard Client ID: {this.state.setupData.applicationId}</p>

        </div>

        <div className="row">
          For the setup page go <a href="/setup">here</a>
        </div>
      </div>
    )
  }
}

module.exports = LaunchEndpoint;
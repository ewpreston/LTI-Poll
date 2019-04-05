import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {HashRouter} from "react-router-dom";

class LaunchEndpoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = { config: {}, setupData: {} };
  }

  componentDidMount() {
    fetch("config")
      .then(result => result.json())
      .then(config => {
        this.setState({ config: config });
      });

    fetch("setupData")
      .then(result => result.json())
      .then(setupData => {
        this.setState({ setupData: setupData });
      });
  }

  render() {
    const baseUrl =
      this.state.config.provider_domain +
      (this.state.config.provider_port !== "NA"
        ? ":" + this.state.config.provider_port
        : "");

    return (
      <div>
        <HashRouter>
          <Typography variant="h4" gutterBottom component="h2">
            Welcome to the LTI Polling Tool
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Your configuration
          </Typography>
          <p>LTI 1.3 Launch URL: {baseUrl}</p>
          <p>Blackboard Client ID: {this.state.setupData.applicationId}</p>
          <br />
          <div>
            <Button variant={"outlined"} color={"primary"} href={"/testRedis"}>
              Test Redis
            </Button>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default LaunchEndpoint;

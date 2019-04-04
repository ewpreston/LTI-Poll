import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Faker from "faker";
import React, {Component} from "react";
import SimpleSnackbar from "./snackbar";

let randomText = Faker.lorem.lines(25);
let randomGuid = Faker.random.uuid();
let randomHost = Faker.internet.url();

class SetupView extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("setupData")
      .then(result => result.json())
      .then(setupData => {
        if (setupData) {
          this.setState({
            privateKey: setupData.privateKey,
            tokenEndPoint: setupData.tokenEndPoint,
            issuer: setupData.issuer,
            applicationId: setupData.applicationId,
            devPortalHost: setupData.devPortalHost
          });
        }
      });
  }

  handleSubmit() {
    return <SimpleSnackbar />;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <form
          action="/saveSetup"
          method="post"
          encType="application/x-www-form-urlencoded"
          onSubmit={this.handleSubmit}
            >
          <Typography variant="h4" gutterBottom component="h2">
            LTI Advantage Settings
          </Typography>
          <br />
          <br />
          <TextField
            required
            label="Developer Portal URL"
            variant="outlined"
            placeholder="https://developer.blackboard.com"
            fullWidth={true}
            InputLabelProps={{
              shrink: true
            }}
            //value={this.state.devPortalHost}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <TextField
            required
            label="Application ID"
            variant="outlined"
            placeholder={randomGuid}
            fullWidth={true}
            InputLabelProps={{
              shrink: true
            }}
            //value={this.state.applicationId}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <TextField
            required
            label="OAuth2 Token End Point"
            variant="outlined"
            placeholder="https://token.com"
            fullWidth={true}
            InputLabelProps={{
              shrink: true
            }}
            //value={this.state.tokenEndPoint}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <TextField
            required
            label="Issuer"
            variant="outlined"
            placeholder="blackboard.com"
            fullWidth={true}
            InputLabelProps={{
              shrink: true
            }}
            //value={this.state.issuer}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <TextField
            required
            label="Private Key"
            rows="15"
            variant="outlined"
            multiline
            placeholder={randomText}
            fullWidth={true}
            InputLabelProps={{
              shrink: true
            }}
            //value={this.state.privateKey}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <Button variant="contained" color="secondary" onChange={this.handleSubmit}>
            Save
          </Button>
        </form>
      </div>
    );
  }
}

export default SetupView;

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Faker from "faker";
import React, {Component} from "react";

let randomText = Faker.lorem.lines(25);
let randomGuid = Faker.random.uuid();
let randomHost = Faker.internet.url();

class SetupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        applicationId: "",
        privateKey: "",
        devPortalHost: "",
        issuer: "",
        tokenEndPoint: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("setupData")
        .then(result => result.json())
        .then(result => {
          this.setState({
            privateKey: result.privateKey,
            applicationId: result.applicationId,
            devPortalHost: result.devPortalHost,
            issuer: result.issuer,
            tokenEndPoint: result.tokenEndPoint
          });
        })};

  handleSubmit(event) {
    console.log(event);
    let setupData = JSON.stringify(this.state);
    console.log("body", setupData);
    fetch('/saveSetup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodeURIComponent(this.state)
    })
        .then((result) => {
          //if(result.status === 200)
          //return <SimpleSnackbar/>
        });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
        <div>
          <Typography variant="display1" gutterBottom component="h2">
            LTI Advantage Settings
          </Typography>
          <br/>
          <TextField
              required
              label="Developer Portal URL"
              variant="outlined"
              placeholder="https://developer.blackboard.com"
              fullWidth={true}
              InputLabelProps={{
                shrink: true
              }}
              name={"devPortalHost"}
              value={this.state.devPortalHost || ""}
              onInput={this.handleChange}
          />
          <br/>
          <br/>
          <TextField
              required
              label="Application ID"
              variant="outlined"
              placeholder={randomGuid}
              fullWidth={true}
              InputLabelProps={{
                shrink: true
              }}
              name={"applicationId"}
              value={this.state.applicationId || ""}
              onInput={this.handleChange}
          />
          <br/>
          <br/>
          <TextField
              required
              label="OAuth2 Token End Point"
              variant="outlined"
              placeholder={randomHost}
              fullWidth={true}
              InputLabelProps={{
                shrink: true
              }}
              name={"tokenEndPoint"}
              value={this.state.tokenEndPoint || ""}
              onInput={this.handleChange}
          />
          <br/>
          <br/>
          <TextField
              required
              label="Issuer"
              variant="outlined"
              placeholder="blackboard.com"
              fullWidth={true}
              InputLabelProps={{
                shrink: true
              }}
              name={"issuer"}
              value={this.state.issuer || ""}
              onInput={this.handleChange}
          />
          <br/>
          <br/>
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
              name={"privateKey"}
              value={this.state.privateKey || ""}
              onInput={this.handleChange}
          />
          <br/>
          <br/>
          <Button id={"save_button"} variant="contained" color="secondary" onClick={this.handleSubmit}>
            Save
          </Button>
        </div>
    );
  }
}

export default SetupView;

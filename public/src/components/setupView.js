import React, { Component } from "react";
import { HashRouter } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SimpleSnackbar from "./snackbar";
import Faker from "faker";

let randomText = Faker.lorem.lines(25);
let randomGuid = Faker.random.uuid();

class SetupView extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('setupData')
      .then(result => result.json())
      .then((setupData) => {
        this.setState({
          privateKey: setupData.privateKey,
          tokenEndPoint: setupData.tokenEndPoint,
          issuer: setupData.issuer,
          applicationId: setupData.applicationId,
          devPortalHost: setupData.devPortalHost
        });
      });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = event => (<SimpleSnackbar classes={"close"}/>);

  render() {
    return(
    <div>
      <HashRouter>
      <Typography variant="h4" gutterBottom component="h2">
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
            shrink: true,
          }}
          value={this.state.devPortalHost}
          onChange={this.handleChange}
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
            shrink: true,
          }}
          value={this.state.applicationId}
          onChange={this.handleChange}
      />
      <br/>
      <br/>
      <TextField
          required
          label="OAuth2 Token End Point"
          variant="outlined"
          placeholder="https://token.com"
          fullWidth={true}
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.tokenEndPoint}
          onChange={this.handleChange}
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
            shrink: true,
          }}
          value={this.state.issuer}
          onChange={this.handleChange}
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
            shrink: true,
          }}
          value={this.state.privateKey}
          onChange={this.handleChange}
      />
      <br/>
      <br/>
      <Button
          variant="contained"
          color="secondary"
          onClick={this.handleSubmit}
      >
        Save
      </Button>
      </HashRouter>
    </div>
    )
  }
}

export default SetupView;

/**
 * <form action="/saveSetup" method="post" encType="application/x-www-form-urlencoded" onSubmit={this.handleSubmit}>
 <table>
 <tbody>
 <tr><td className="ci">Issuer</td><td className="ci"><input className="ci" type="text" name="issuer" value={this.state.issuer} onChange={this.handleChange} /></td></tr>
 <tr><td className="ci">OAuth2 token<br/>End Point</td><td className="ci"><input className="ci" type="text" name="tokenEndPoint" value={this.state.tokenEndPoint} onChange={this.handleChange} /></td></tr>
 <tr><td className="ci">Application Id</td><td className="ci"><input className="ci" type="text" name="applicationId" value={this.state.applicationId} onChange={this.handleChange} /></td></tr>
 <tr><td className="ci">Dev Portal Host</td><td className="ci"><input className="ci" type="text" name="devPortalHost" value={this.state.devPortalHost} onChange={this.handleChange} /></td></tr>
 <tr><td className="ci">Private Key</td><td className="ci"><textarea className="ci" cols="80" rows="30" name="privateKey" value={this.state.privateKey} onChange={this.handleChange} /></td></tr>
 </tbody>
 </table>
 <input type="submit" value="Submit" />
 </form>
 **/

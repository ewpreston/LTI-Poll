import React from "react";
import {Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import Radio from "react-bootstrap/es/Radio";


class PollSetup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pollId: '1A',
            question: 'Question',
            choices: ['Choice'],
            newChoice: '',
        };
        console.dir(`PollSetup constructor`);
    }

    componentDidMount() {
        console.dir(`componentDidMount`);
        // Get data from redis and populate state
        this.setState({
            question: '',
            choices: [
                    ],

        });
    }


    handleQuestionChange(event) {
        console.dir(`handleQuestionChange ${event.target.value}`);
        this.setState({
            question: event.target.value
        });
    }

    handleNewChoiceChange(event) {
        console.dir(`handleNewChoiceChange ${event.target.value}`);
        this.setState({
            newChoice: event.target.value
        });
        event.target.value = ''
    }


    addChoice(choices, nextChoice) {
        console.dir(`addChoice <${nextChoice}> ${nextChoice.length}`);

        // TODO Why is this not working?
        if (nextChoice !== undefined && nextChoice.length > 0) {
            choices.push(nextChoice);
            this.setState({
                choices: choices,
                newChoice: ''
            });
        } else {
            console.dir(`nextChoice is undefined or empty`);
        }
    }

    deleteChoice(e) {
        console.dir(`deleteChoice`);
        // https://stackoverflow.com/questions/36326612/delete-item-from-state-array-in-react
        // var array = [...this.state.choices]; // make a separate copy of the array
        // var index = array.indexOf(e.target.value)
        // if (index !== -1) {
        //     array.splice(index, 1);
        //     this.setState({people: array});
        // }
    }

    save() {
        console.dir(`save to redis`);
    }

    cancel() {
        console.dir(`cancel`);
    }

    render() {
        const { choices } = this.state;
        let container = [];
        choices.forEach((choice,index)=> {
            container.push(<Radio key={index} name="choiceOption" disabled={true}>
                {choice}
            </Radio>);
            /**
             * 1. All loop generated elements require a key
             * 2. only one parent element can be placed in Array
             * e.g. container.push(<div key={index}>
             val
             </div>
             <div>
             this will throw error
             </div>
             )
             **/
        });

        return (
            <div>
                <div><h3>Poll Question Setup</h3></div>
                <div>
                    <form action="pollDefine" method="POST">
                        <div>
                            <FormGroup controlId="question">
                                <ControlLabel>Question</ControlLabel>
                                <FormControl type="text" placeholder="Enter Question" value={this.state.question} onChange={this.handleQuestionChange.bind(this)}/>
                            </FormGroup>
                            <div id='container-div'>{container}</div>
                        </div>
                        <div>
                            <FormControl type="text" placeholder="Enter choice" value={this.state.newChoice} onChange={this.handleNewChoiceChange.bind(this)} />
                            <Button onClick={() => this.addChoice(this.state.choices, this.state.newChoice)}>Add Choice</Button>
                        </div>
                        <div>
                            <Button onClick={this.cancel}>Cancel</Button> <Button onClick={this.save}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

module.exports = PollSetup;
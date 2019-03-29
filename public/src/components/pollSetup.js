import React from "react";
import {Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import Radio from "react-bootstrap/es/Radio";


class PollSetup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pollId: '1A',
            question: '',
            choices: [],
        };
        console.dir(`PollSetup constructor`);
    }

    componentDidMount() {
        // Get data from redis and populate state
        this.setState({
            question: 'Question to be loaded from redis',
            choices: [  'Choice loaded from redis 1',
                        'Choice loaded from redis 2',
                        'Choice loaded from redis 3',
                        'Choice loaded from redis 4',
                        'Choice loaded from redis 5',
                        'Choice loaded from redis 6',
                        'Choice loaded from redis 7',
                        'Choice loaded from redis 8',
                        'Choice loaded from redis 9',
                        'Choice loaded from redis 10'
                    ],

        });
    }

    // handleResultChange(event) {
    //     this.setState({resultText: event.target.value});
    // }
    handleQuestionChange(e) {
        this.setState({
            question :getQuestionValue
        });
    }

    handleChoiceChange(e) {
        console.dir(`handleChoiceChange`);
    }


    addChoice() {
        console.dir(`addChoice`);

        // TODO Why is this not working?
        const { choices } = this.state;
        if (choices === undefined) {
            console.dir(`this.state.choices undefined`);
        } else {
            // let choicesClone = Object.assign({}, choices);
            // const questIndex = quesiton.length;
            choices.push({pollIdQ: 'Question x', pollIdA: [], pollIdR: []});
            // questions.push({pollIdQ: 'Question 1', pollIdA:['Answer 1', 'Answer 2'], pollIdR: [2]});
            this.setState({choices: choices});
        }
    }

    deleteChoice() {
        console.dir(`deleteChoice`);
    }

    save() {
        console.dir(`save`);
    }

    cancel() {
        console.dir(`cancel`);
    }

    render() {
        const { choices } = this.state;
        let container = [];
        // let questions = ['Question 1 asdfasd', 'Question 2 fdasewf', 'Question 3 asdfa'];
        // let questions = ['1', '2', '3'];
        choices.forEach((choice,index)=> {
            console.dir(`choice ${choice} ${index}`);
            // container.push(<div key={index} id={index}>
            //     {choice}
            // </div>);
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
        console.dir(`pre return`);

        return (
            <div>
                <div><h3>Poll Question Setup</h3></div>
                <div>
                    <form action="pollDefine" method="POST">
                        <div>
                            <FormGroup controlId="question">
                                <ControlLabel>Question</ControlLabel>
                                <FormControl type="text" placeholder="Enter Question" value={this.state.question} onChange={this.handleQuestionChange}/>
                            </FormGroup>
                            <div id='container-div'>{container}</div>
                        </div>
                        <div>
                            <Button onClick={this.addChoice}>Add Choice</Button>
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
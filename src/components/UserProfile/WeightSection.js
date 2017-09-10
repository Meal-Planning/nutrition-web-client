// -- Import core React tools
import React from 'react'

// -- GLOBAL VARIABLES

class WeightSection extends React.Component {
    constructor(props) {
        super(props);

        this.handleWeighInChange = this.handleWeighInChange.bind(this);
        this.submitWeight = this.submitWeight.bind(this);
    }

    handleWeighInChange(e) {
        let user = JSON.parse(JSON.stringify(this.props.user));

        if(this.weighedInToday) {
            user.body.weight.history[user.body.weight.history.length - 1].weight = e.target.value;
        }
        else {
            user.body.weight.history.push({
                date: new Date(),
                weight: e.target.value
            })
        }

        this.props.onUserChange(user);
    }

    submitWeight() {
        this.props.onSubmitWeight();
    }

    render() {
        var today = new Date()
        var lastWeighIn = new Date(this.props.user.body.weight.history[this.props.user.body.weight.history.length - 1].date);
        this.weighedInToday = today.toDateString() === lastWeighIn.toDateString();
        if(this.weighedInToday) {
            this.weighIn = this.props.user.body.weight.history[this.props.user.body.weight.history.length - 1].weight;
        }

        return (
            <div className="weightHistory">
                <h2>Weight History Section</h2>

                <p>* A graph will go here that will map out the user's weight history (how far back to we show?) *</p>
                <br/>

                <label htmlFor="weighIn">Weigh In:</label>
                <input id="weighIn" value={this.weighIn} onChange={this.handleWeighInChange}/><span>(lbs) </span>
                <button onClick={this.submitWeight} >Submit</button>
            </div>
        );
    }
}
export default WeightSection
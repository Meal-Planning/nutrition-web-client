// -- Import core React tools
import React from 'react'

// -- GLOBAL VARIABLES
let INTENSITY_LEVELS = ['Moderate', 'Difficult'];

class TargetSection extends React.Component {
    constructor(props) {
        super(props);

        this.handleUserWeightChange = this.handleUserWeightChange.bind(this);
        this.handleUserIntensityChange = this.handleUserIntensityChange.bind(this);
    }

    handleUserWeightChange(e) {
        let newUser = JSON.parse(JSON.stringify(this.props.user));

        newUser.body.weight.target = e.target.value;
        this.props.onUserChange(newUser);
    }

    handleUserIntensityChange(e) {
        let newUser = JSON.parse(JSON.stringify(this.props.user));

        newUser.body.weight.intensity = e.target.value;
        this.props.onUserChange(newUser);
    }

    render() {
        let intensityLevels = INTENSITY_LEVELS.map((intensity, index) => <option key={intensity} value={intensity}>{intensity}</option> );
        let weightChange = this.props.user.body.weight.target - this.props.user.body.weight.current;
        let weightChangeString = weightChange < 0 ? "lose " + Math.abs(weightChange) + "lbs at a " + this.props.user.body.weight.intensity + " intensity level we will need to..." :
                                    weightChange > 0 ? "gain " + Math.abs(weightChange) + "lbs at a " + this.props.user.body.weight.intensity + " intensity level we will need to..." :
                                    "maintain weight we will need to...";
        let builtParagraph = "In order to effectively " + weightChangeString + " *describe process*(how many phases, how long it will take, etc)."

        return (
            <div className="target">
                <h2>Target Section</h2>

                <label htmlFor="weight">Target Weight:</label>
                <input id="weight" value={this.props.user.body.weight.target} onChange={this.handleUserWeightChange}/>
                <span>lbs  </span>

                <label htmlFor="intensity">Weight Loss Intensity:</label>
                <select id="intensity" value={this.props.user.body.weight.intensity} onChange={this.handleUserIntensityChange}>
                    {intensityLevels}
                </select>
                <p>This will be the description of the weight change process. We will have to determine how we want to write this out but it will look something like this...</p>
                <p>{builtParagraph}</p>
            </div>
        );
    }
}
export default TargetSection
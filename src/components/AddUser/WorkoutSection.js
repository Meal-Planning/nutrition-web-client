// -- Import core React tools
import React from 'react'

// -- GLOBAL VARIABLES
let WORKOUT_LEVELS = ['None', 'Light', 'Moderate', 'Heavy'];

class WorkoutSection extends React.Component {
    constructor(props) {
        super(props);
    }

    handleWorkoutDaysChange(day, e) {
        let newUser = JSON.parse(JSON.stringify(this.props.user));

        newUser.nutrition.workoutDays[day] = e.target.value;
        this.props.onUserChange(newUser);
    }

    render() {
        const inputStyle={
            marginRight: '8px'
        }

        let workoutLevels = WORKOUT_LEVELS.map((workout, index) => <option key={workout} value={workout}>{workout}</option> );

        return (
            <div className="target">
                <h2>Workout Section</h2>

                <label htmlFor="monday">Monday:</label>
                <select id="monday" style={inputStyle} value={this.props.user.nutrition.workoutDays[0]} onChange={this.handleWorkoutDaysChange.bind(this, 0)}>
                    {workoutLevels}
                </select>

                <label htmlFor="tuesday">Tuesday:</label>
                <select id="tuesday" style={inputStyle} value={this.props.user.nutrition.workoutDays[1]} onChange={this.handleWorkoutDaysChange.bind(this, 1)}>
                    {workoutLevels}
                </select>

                <label htmlFor="wednesday">Wednesday:</label>
                <select id="wednesday" style={inputStyle} value={this.props.user.nutrition.workoutDays[2]} onChange={this.handleWorkoutDaysChange.bind(this, 2)}>
                    {workoutLevels}
                </select>

                <label htmlFor="thursday">Thursday:</label>
                <select id="thursday" style={inputStyle} value={this.props.user.nutrition.workoutDays[3]} onChange={this.handleWorkoutDaysChange.bind(this, 3)}>
                    {workoutLevels}
                </select>

                <label htmlFor="friday">Friday:</label>
                <select id="friday" style={inputStyle} value={this.props.user.nutrition.workoutDays[4]} onChange={this.handleWorkoutDaysChange.bind(this, 4)}>
                    {workoutLevels}
                </select>

                <label htmlFor="saturday">Saturday:</label>
                <select id="saturday" style={inputStyle} value={this.props.user.nutrition.workoutDays[5]} onChange={this.handleWorkoutDaysChange.bind(this, 5)}>
                    {workoutLevels}
                </select>

                <label htmlFor="sunday">Sunday:</label>
                <select id="sunday" style={inputStyle} value={this.props.user.nutrition.workoutDays[6]} onChange={this.handleWorkoutDaysChange.bind(this, 6)}>
                    {workoutLevels}
                </select>
                <br/>
                <span>*This should be a typical week of working out for you</span>
            </div>
        );
    }
}
export default WorkoutSection
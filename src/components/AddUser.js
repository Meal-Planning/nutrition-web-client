// -- Import core React tools
import React from 'react'
import { Redirect } from 'react-router';

// -- Import Nutrition Service
import { AddNewUser } from '../services/nutrition-service.js';

// -- Components
import UserInfoSection from "./AddUser/UserInfoSection";
import TargetSection from "./AddUser/TargetSection";
import WorkoutSection from "./AddUser/WorkoutSection";
import MealplanSection from "./AddUser/MealplanSection";

// -- GLOBAL VARIABLES
let GENDERS = ['Male', 'Female', 'X'];
let INTENSITY_LEVELS = ['Moderate', 'Difficult'];
let WORKOUT_LEVELS = ['None', 'Light', 'Moderate', 'Heavy'];
let DELIVERY_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                name: 'testing',
                phone: '',
                address: '',
                sex: GENDERS[0],
                birthDate: Date.Today,
                body: {
                    weight: {
                        current: 200,
                        target: 200,
                        intensity: INTENSITY_LEVELS[0],
                        history: []
                    },
                    height: 70,
                    fat_percent: {
                        current: 0,
                        target: 0,
                        history: []
                    }
                },
                food: {
                    allergies: [],
                    dislikes: []
                },
                meals: {
                    deliveryDay: DELIVERY_DAYS[0],
                    history: [],
                    ratings: []
                },
                nutrition: {
                    isocaloricValue: 0,
                    workoutDays: [WORKOUT_LEVELS[0], WORKOUT_LEVELS[0], WORKOUT_LEVELS[0], WORKOUT_LEVELS[0], WORKOUT_LEVELS[0], WORKOUT_LEVELS[0], WORKOUT_LEVELS[0]],
                    weeklyExercise: {
                        light: 0,
                        moderate: 0,
                        heavy: 0
                    },
                    cycles: []
                }
            },
            redirect: false
        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.saveNewRecipe = this.saveNewRecipe.bind(this);
    }

    // -- USER INFO SECTION
    handleUserChange(newUser) {
        this.setState({
            user: newUser
        });
    }

    // -- SAVE USER
    saveNewRecipe() {
        //push new user to service and go to profile page if successful, otherwise, alert the error and allow the user to fix it
        var self = this;

        // -- calculate weekly exercise based on workout days
        this.state.user.nutrition.workoutDays.forEach( function(workoutLevel) {
            // just keep a running tally of each of the 4 workout levels as you go through each day
            if (workoutLevel == 'Light') self.state.user.nutrition.weeklyExercise.light++;
            else if (workoutLevel == 'Moderate') self.state.user.nutrition.weeklyExercise.moderate++;
            else if (workoutLevel == 'Heavy') self.state.user.nutrition.weeklyExercise.heavy++;
        });

        AddNewUser(JSON.stringify(this.state.user)).then((res) => {
            if (res.ok)
            {
                // -- redirect user to user profile page if user saved successfully
                this.setState({redirect: true});
            }
        });
    }

    render() {
        if (this.state.redirect) {
            // -- redirect when User is saved successfully
            return <Redirect push to="/user-profile" />;
        }
        const addUserPageStyle={
            width: '100%'
        }
        const saveButtonStyle={
            float: 'right',
            margin: '16px'
        }
        return (
            <div className="AddUserPage" style={addUserPageStyle}>
                <h1>Add User Page</h1>
                <UserInfoSection
                    user={this.state.user}
                    onUserChange={this.handleUserChange} />
                <TargetSection
                    user={this.state.user}
                    onUserChange={this.handleUserChange} />
                <WorkoutSection
                    user={this.state.user}
                    onUserChange={this.handleUserChange} />
                <MealplanSection
                    user={this.state.user}
                    onUserChange={this.handleUserChange} />
                <button style={saveButtonStyle} onClick={this.saveNewRecipe} >Save</button>
            </div>
        );
    }
}
export default AddUser
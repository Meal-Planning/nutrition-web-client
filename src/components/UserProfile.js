// -- Import core React tools
import React from 'react'

// -- Import Nutrition Service
import { GetUser, GetUserMacros, UpdateUser } from '../services/nutrition-service.js';

// -- Components
import UserInfoSection from "./UserProfile/UserInfoSection";
import NutritionSection from "./UserProfile/NutritionSection";
import WeightSection from "./UserProfile/WeightSection";

// -- GLOBAL VARIABLES
let GENDERS = ['Male', 'Female', 'X'];
let DELIVERY_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            weeklyMacros: {}
        };

        // -- USER INFO SECTION

        // -- TARGET SECTION

        // -- WORKOUT SECTION
        this.handleUserChange = this.handleUserChange.bind(this);
        this.submitWeight = this.submitWeight.bind(this);

        if (this.props.match.params['email']) {
            //call service and return user
            this.loadUser(this.props.match.params['email']);
        }
    }

    loadUser(email) {
        GetUser(email).then((res) => {
            if (res.ok) {
                var user = res.user;
                GetUserMacros(email).then((res) => {
                    if (res.ok) {
                        this.setState({user: user, weeklyMacros: res.macros});
                    }
                });
            }
        });
    }

    // -- USER INFO SECTION

    // -- NUTRITION SECTION

    // -- WEIGH IN SECTION
    handleUserChange(user) {
        this.setState({
            user: user
        });
    }
    submitWeight() {
        UpdateUser(this.state.user.email, JSON.stringify(this.state.user)).then((res) => {
            if (res.ok) {
                alert('User updated!');
            }
            else {
                alert('User not updated.');
            }
        });
    }

    render() {
        const userProfilePageStyle={
            width: '100%'
        }

        var userInfoSection = <p>No user found with email: {this.props.match.params['email']}</p>;
        var nutritionSection = "";
        var weightSection = "";
        if (this.state.user.email) { 
            userInfoSection = <UserInfoSection user={this.state.user} />
            nutritionSection = <NutritionSection macros={this.state.weeklyMacros} />
            weightSection = <WeightSection user={this.state.user}
                                           onUserChange={this.handleUserChange}
                                           onSubmitWeight={this.submitWeight} />
        }

        return (
            <div className="UserProfilePage" style={userProfilePageStyle}>
                <h1>User Profile Page</h1>
                {userInfoSection}
                {nutritionSection}
                {weightSection}
            </div>
        );
    }
}
export default UserProfile
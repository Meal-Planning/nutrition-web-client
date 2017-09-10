// -- Import core React tools
import React from 'react'

// -- GLOBAL VARIABLES
let GENDERS = ['Male', 'Female', 'X'];
let FEET_VALUES = [9,8,7,6,5,4,3,2,1,0];
let INCHES_VALUES = [11,10,9,8,7,6,5,4,3,2,1,0];
let INTENSITY_LEVELS = ['Moderate', 'Difficult'];

class UserInfoSection extends React.Component {
    constructor(props) {
        super(props);
        this.heightInFeet = 0;
        this.heightInInches = 0;

        this.handleUserWeightChange = this.handleUserWeightChange.bind(this);
    }

    handleUserChange(prop, e) {
        let newUser = JSON.parse(JSON.stringify(this.props.user));

        newUser[prop] = e.target.value;
        this.props.onUserChange(newUser);
    }

    handleUserHeightChange(prop, e) {
        let newUser = JSON.parse(JSON.stringify(this.props.user));
        if (prop == 'feet') {
            newUser.body.height = (parseInt(e.target.value)*12) + parseInt(this.heightInInches);
        }
        else if (prop == 'inches') {
            newUser.body.height = (parseInt(this.heightInFeet)*12) + parseInt(e.target.value);
        }
        this.props.onUserChange(newUser);
    }

    handleUserWeightChange(e) {
        let newUser = JSON.parse(JSON.stringify(this.props.user));

        newUser.body.weight.current = e.target.value;
        this.props.onUserChange(newUser);
    }

    render() {
        let genders = GENDERS.map((gender, index) => <option key={gender} value={gender}>{gender}</option> );
        let feetValues = FEET_VALUES.map((value, index) => <option key={value} value={value}>{value}</option> );
        let inchesValues = INCHES_VALUES.map((value, index) => <option key={value} value={value}>{value}</option> );
        this.heightInFeet = Math.floor(this.props.user.body.height/12);
        this.heightInInches = this.props.user.body.height%12;

        this.props.user.birthDate = this.props.user.birthDate.split('T')[0];

        let intensityLevels = INTENSITY_LEVELS.map((intensity, index) => <option key={intensity} value={intensity}>{intensity}</option> );

        return (
            <div className="user-info">
                <h2>User Info Section</h2>

                <label htmlFor="name">Name</label>
                <input id="name" value={this.props.user.name} onChange={this.handleUserChange.bind(this, 'name')} disabled/>

                <label htmlFor="email">Email</label>
                <input id="email" value={this.props.user.email} onChange={this.handleUserChange.bind(this, 'email')} disabled/>

                <label htmlFor="phone">Phone</label>
                <input id="phone" value={this.props.user.phone} onChange={this.handleUserChange.bind(this, 'phone')} disabled/>
                <br/>

                <label htmlFor="address">Address</label>
                <input id="address" value={this.props.user.address} onChange={this.handleUserChange.bind(this, 'address')} disabled/>

                <label htmlFor="sex">Gender</label>
                <select id="sex" value={this.props.user.sex} onChange={this.handleUserChange.bind(this, 'sex')} disabled>
                    {genders}
                </select>
                <br/>

                <label htmlFor="heightFt">Height:</label>
                <select id="heightFt" value={this.heightInFeet} onChange={this.handleUserHeightChange.bind(this, 'feet')} disabled>
                    {feetValues}
                </select>
                <span>ft  </span>
                <select id="heightIn" value={this.heightInInches} onChange={this.handleUserHeightChange.bind(this, 'inches')} disabled>
                    {inchesValues}
                </select>
                <span>in  </span>

                <label htmlFor="weight">Weight:</label>
                <input id="weight" value={this.props.user.body.weight.current} onChange={this.handleUserWeightChange} disabled/>
                <span>lbs  </span>

                <label htmlFor="birthDate">Birthdate:</label>
                <input id="birthDate" type="date" value={this.props.user.birthDate} onChange={this.handleUserChange.bind(this, 'birthDate')} disabled/>
                <br/>
                <br/>

                <label htmlFor="weight">Target Weight:</label>
                <input id="weight" value={this.props.user.body.weight.target} onChange={this.handleUserWeightChange} disabled/>
                <span>lbs  </span>

                <label htmlFor="intensity">Weight Loss Intensity:</label>
                <select id="intensity" value={this.props.user.body.weight.intensity} onChange={this.handleUserIntensityChange} disabled>
                    {intensityLevels}
                </select>
            </div>
        );
    }
}
export default UserInfoSection
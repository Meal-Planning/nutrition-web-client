// -- Import core React tools
import React from 'react'
import { Link } from 'react-router-dom'

// -- Import Nutrition Service
import { GetUsers } from '../services/nutrition-service.js';

// -- Components

// -- GLOBAL VARIABLES


class UserIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        //call service and return users
        this.loadUsers();
    }

    loadUsers() {
        GetUsers().then((res) => {
            if (res.ok) {
                this.setState({users: res.users});
            }
        });
    }



    render() {
        const userIndexPageStyle={
            width: '100%'
        }

        let rows = this.state.users.map((user, index) => <li><Link to={"/user-profile/" + user.email}>{user.name}</Link></li> );

        return (
            <div className="UserIndexPage" style={userIndexPageStyle}>
                <h1>User Index Page</h1>
                <ul className="user-list">
                    {rows}
                </ul>
            </div>
        );
    }
}
export default UserIndex
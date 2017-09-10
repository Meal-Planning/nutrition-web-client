// -- Import core React tools
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// -- Components
import AddRecipe from "./components/AddRecipe";
import AddUser from "./components/AddUser";
import UserIndex from "./components/UserIndex";
import UserProfile from "./components/UserProfile";

const Home = () => (
    <div>
      <h2>Home</h2>
    </div>
)

/*const About = () => (
    <div>
      <h2>About</h2>
    </div>
)

const Topic = ({ match }) => (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
)

const Topics = ({ match }) => (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>
            Rendering with React
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>
            Components
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      <Route path={`${match.url}/:topicId`} component={Topic}/>
      <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
    </div>
)*/

const App = () => (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-recipe">Add Recipe</Link></li>
          <li><Link to="/add-user">Add User</Link></li>
          <li><Link to="/user-index">User Index</Link></li>
          {/* <li><Link to="/user-profile/cgduzan@gmail.com">User Profile</Link></li> */}
        </ul>

        <hr/>

        <Route exact path="/" component={Home}/>
        <Route path="/add-recipe" component={AddRecipe}/>
        <Route path="/add-user" component={AddUser}/>
        <Route path="/user-index" component={UserIndex}/>
        <Route path="/user-profile/:email" component={UserProfile}/>
      </div>
    </Router>
)
export default App
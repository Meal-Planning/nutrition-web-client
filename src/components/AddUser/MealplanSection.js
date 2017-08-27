// -- Import core React tools
import React from 'react'

// -- GLOBAL VARIABLES
let DELIVERY_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class MealplanSection extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeliveryDayChange = this.handleDeliveryDayChange.bind(this);
    }

    handleDeliveryDayChange(e) {
        let newUser = JSON.parse(JSON.stringify(this.props.user));

        newUser.meals.deliveryDay = e.target.value;
        this.props.onUserChange(newUser);
    }

    render() {
        let deliveryDays = DELIVERY_DAYS.map((day, index) => <option key={day} value={day}>{day}</option> );

        return (
            <div className="target">
                <h2>Target Section</h2>

                <label htmlFor="intensity">Mealplan Delivery Day:</label>
                <select id="intensity" value={this.props.user.meals.deliveryDay} onChange={this.handleDeliveryDayChange}>
                    {deliveryDays}
                </select>
            </div>
        );
    }
}
export default MealplanSection
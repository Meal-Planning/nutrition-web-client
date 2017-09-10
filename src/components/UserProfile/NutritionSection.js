// -- Import core React tools
import React from 'react'

// -- GLOBAL VARIABLES

class NutritionSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="nutrition">
                <h2>Nutrition Section</h2>

                <label htmlFor="calories">Daily Calories:</label>
                <input id="calories" value={this.props.macros.weeklyCalories} disabled/>
                <br/>
                <label htmlFor="protein">Protein:</label>
                <input id="protein" value={this.props.macros.weeklyProtein} disabled/>
                <span>(g) </span>
                <label htmlFor="carbs">Carbs:</label>
                <input id="carbs" value={this.props.macros.weeklyCarbs} disabled/>
                <span>(g) </span>
                <label htmlFor="fat">Fat:</label>
                <input id="fat" value={this.props.macros.weeklyFat} disabled/>
                <span>(g) </span>
            </div>
        );
    }
}
export default NutritionSection
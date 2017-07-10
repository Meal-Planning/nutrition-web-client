// -- Import core React tools
import React from 'react'

// -- GLOBAL VARIABLES
let MEASUREMENTS = ['Milliliters', 'Teaspoons', 'Tablespoons', 'Cups', 'Grams', 'Ounces', 'Pounds', 'Kilograms'];


class AddIngredientModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCostPriceChange = this.handleCostPriceChange.bind(this);
        this.handleCostUnitChange = this.handleCostUnitChange.bind(this);
        this.handleServingQuantityChange = this.handleServingQuantityChange.bind(this);
        this.handleServingUnitChange = this.handleServingUnitChange.bind(this);
        this.handleCalorieChange = this.handleCalorieChange.bind(this);
        this.handleProteinChange = this.handleProteinChange.bind(this);
        this.handleCarbChange = this.handleCarbChange.bind(this);
        this.handleFatChange = this.handleFatChange.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
        this.saveClick = this.saveClick.bind(this);

        this.state = {
            newIngredient: {
                name: '',
                //ingredientId: '',     ***** set this when 'Save' clicked
                cost: {
                    price: 0,
                    unit: MEASUREMENTS[0]
                },
                commonalityFactor: 0,
                /*measurements: {
                 calories: {
                 gram: Number,
                 teaspoon: Number,
                 whole: Number
                 },
                 protein: {
                 gram: Number,
                 teaspoon: Number,
                 whole: Number
                 },
                 carbs: {
                 gram: Number,
                 teaspoon: Number,
                 whole: Number
                 },
                 fat: {
                 gram: Number,
                 teaspoon: Number,
                 whole: Number
                 }
                 },*/
                servingSize: {
                    quantity: 0,
                    unit: MEASUREMENTS[0]
                },
                measurements: {
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0
                },
                allergies: [],
                tags: []
            }
        };
    }

    handleNameChange(e) {
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                name: e.target.value
            })
        });
    }

    handleCostPriceChange(e) {
        let newCost = JSON.parse(JSON.stringify(this.state.newIngredient.cost));
        newCost.price = e.target.value;
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                cost: newCost
            })
        });
    }

    handleCostUnitChange(e) {
        let newCost = JSON.parse(JSON.stringify(this.state.newIngredient.cost));
        newCost.unit = e.target.innerText;
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                cost: newCost
            })
        });
    }

    handleServingQuantityChange(e) {
        let newServingSize = JSON.parse(JSON.stringify(this.state.newIngredient.servingSize));
        newServingSize.quantity = e.target.value;
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                servingSize: newServingSize
            })
        });
    }

    handleServingUnitChange(e) {
        let newServingSize = JSON.parse(JSON.stringify(this.state.newIngredient.servingSize));
        newServingSize.unit = e.target.innerText;
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                servingSize: newServingSize
            })
        });
    }

    handleCalorieChange(e) {
        let newMeasurements = JSON.parse(JSON.stringify(this.state.newIngredient.measurements));
        newMeasurements.calories = e.target.value;
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                measurements: newMeasurements
            })
        });
    }

    handleProteinChange(e) {
        let newMeasurements = JSON.parse(JSON.stringify(this.state.newIngredient.measurements));
        newMeasurements.protein = e.target.value;
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                measurements: newMeasurements
            })
        });
    }

    handleCarbChange(e) {
        let newMeasurements = JSON.parse(JSON.stringify(this.state.newIngredient.measurements));
        newMeasurements.carbs = e.target.value;
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                measurements: newMeasurements
            })
        });
    }

    handleFatChange(e) {
        let newMeasurements = JSON.parse(JSON.stringify(this.state.newIngredient.measurements));
        newMeasurements.fat = e.target.value;
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                measurements: newMeasurements
            })
        });
    }

    cancelClick() {
        this.props.onCancel();
    }

    saveClick() {
        //create a ingredient object for service to handle properly
        var ingredient = {
            name: this.state.newIngredient.name,
            ingredientId: this.state.newIngredient.name.toLowerCase().replace(' ', '_').replace(',', '_'),
            cost: this.state.newIngredient.cost,
            commonalityFactor: this.state.newIngredient.commonalityFactor,
            measurements: {
                calories: {
                    gram: 0,
                    teaspoon: 0,
                    whole: 0
                },
                protein: {
                    gram: 0,
                    teaspoon: 0,
                    whole: 0
                },
                carbs: {
                    gram: 0,
                    teaspoon: 0,
                    whole: 0
                },
                fat: {
                    gram: 0,
                    teaspoon: 0,
                    whole: 0
                }
            },
            allergies: this.state.newIngredient.allergies,
            tags: this.state.newIngredient.tags
        };

        //return ingredient object
        this.props.onSave(ingredient);
    }

    render() {
        var units = [];
        MEASUREMENTS.forEach(function (measurement, index) {
            //units.push(<MenuItem value={measurement} primaryText={measurement} />);
            units.push(<option value={measurement}>{measurement}</option>);
        });
        return (
            <div className="add-ingredient-modal">
                <div>
                    <label for="name">Name</label>
                    <input id="name" value={this.state.newIngredient.name} onChange={this.handleNameChange}/>
                </div>
                <br/>
                <div>
                    <label for="cost">Cost</label>
                    <input id="cost" value={this.state.newIngredient.cost.price} onChange={this.handleCostPriceChange}/>
                    <span>per</span>
                    <select value={this.state.newIngredient.cost.unit} onChange={this.handleCostUnitChange}>
                        {units}
                    </select>
                </div>
                <br/>
                <div>
                    <label for="quantity">Serving Size</label>
                    <input id="quantity" value={this.state.newIngredient.servingSize.quantity} onChange={this.handleServingQuantityChange}/>
                    <select value={this.state.newIngredient.servingSize.unit} onChange={this.handleServingUnitChange}>
                        {units}
                    </select>
                </div>
                <div>
                    <label for="calories">Calories</label>
                    <input id="calories" value={this.state.newIngredient.measurements.calories} onChange={this.handleCalorieChange}/>

                    <label for="protein">Protein</label>
                    <input id="protein" value={this.state.newIngredient.measurements.protein} onChange={this.handleProteinChange}/>

                    <label for="carbs">Carbs</label>
                    <input id="carbs" value={this.state.newIngredient.measurements.carbs} onChange={this.handleCarbChange}/>

                    <label for="fat">Fats</label>
                    <input id="fat" value={this.state.newIngredient.measurements.fat} onChange={this.handleFatChange}/>
                </div>
                <button onClick={this.cancelClick}>Cancel</button>
                <button onClick={this.saveClick}>Save</button>
            </div>
        );
    }
}
export default AddIngredientModal
// -- Import core React tools
import React from 'react'

// -- GLOBAL VARIABLES
let MEASUREMENTS = ['Milliliters', 'Teaspoons', 'Tablespoons', 'Cups', 'Grams', 'Ounces', 'Pounds', 'Kilograms'];


class NutritionFact extends React.Component {
    constructor(props) {
        super(props);
        this.handleServingQuantityChange = this.handleServingQuantityChange.bind(this);
        this.handleServingUnitChange = this.handleServingUnitChange.bind(this);
        this.handleCalorieChange = this.handleCalorieChange.bind(this);
        this.handleProteinChange = this.handleProteinChange.bind(this);
        this.handleCarbChange = this.handleCarbChange.bind(this);
        this.handleFatChange = this.handleFatChange.bind(this);
        this.removeMeasurement = this.removeMeasurement.bind(this);
    }

    handleServingQuantityChange(e) {
        let newMeasurement = JSON.parse(JSON.stringify(this.props.measurement));
        newMeasurement.amount = e.target.value;
        this.props.handleMeasurementChange(newMeasurement, this.props.index);
    }

    handleServingUnitChange(e) {
        let newMeasurement = JSON.parse(JSON.stringify(this.props.measurement));
        newMeasurement.type = e.target.value;
        this.props.handleMeasurementChange(newMeasurement, this.props.index);
    }

    handleCalorieChange(e) {
        let newMeasurement = JSON.parse(JSON.stringify(this.props.measurement));
        newMeasurement.macros.calories = e.target.value;
        this.props.handleMeasurementChange(newMeasurement, this.props.index);
    }

    handleProteinChange(e) {
        let newMeasurement = JSON.parse(JSON.stringify(this.props.measurement));
        newMeasurement.macros.protein = e.target.value;
        this.props.handleMeasurementChange(newMeasurement, this.props.index);
    }

    handleCarbChange(e) {
        let newMeasurement = JSON.parse(JSON.stringify(this.props.measurement));
        newMeasurement.macros.carbs = e.target.value;
        this.props.handleMeasurementChange(newMeasurement, this.props.index);
    }

    handleFatChange(e) {
        let newMeasurement = JSON.parse(JSON.stringify(this.props.measurement));
        newMeasurement.macros.fat = e.target.value;
        this.props.handleMeasurementChange(newMeasurement, this.props.index);
    }

    removeMeasurement() {
        this.props.removeMeasurement(this.props.index);
    }

    render() {
        const measurementStyle = {
            marginTop: '10px'
        }
        let units = MEASUREMENTS.map((measurement, index) => <option key={measurement} value={measurement}>{measurement}</option> );
        return (
            <div style={measurementStyle}>
                <span>Serving Size: </span>
                <input id="cost" value={this.props.measurement.amount} onChange={this.handleServingQuantityChange} />
                <select value={this.props.measurement.type} onChange={this.handleServingUnitChange} >
                    {units}
                </select>
                <button onClick={this.removeMeasurement}>X</button><br/>
                <label htmlFor="calories">Calories </label>
                <input id="calories" value={this.props.measurement.macros.calories} onChange={this.handleCalorieChange} />
                <label htmlFor="protien">Protein </label>
                <input id="protien" value={this.props.measurement.macros.protein} onChange={this.handleProteinChange} />
                <label htmlFor="carbs">Carbs </label>
                <input id="carbs" value={this.props.measurement.macros.carbs} onChange={this.handleCarbChange} />
                <label htmlFor="fat">Fat </label>
                <input id="fat" value={this.props.measurement.macros.fat} onChange={this.handleFatChange} />
                <br/>
            </div>
        );
    }
}

class AddIngredientModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCommonalityFactorChange = this.handleCommonalityFactorChange.bind(this);
        this.handleCostPriceChange = this.handleCostPriceChange.bind(this);
        this.handleCostUnitChange = this.handleCostUnitChange.bind(this);
        this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
        this.handleAllergiesChange = this.handleAllergiesChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.addNutritionFact = this.addNutritionFact.bind(this);
        this.removeNutritionFact = this.removeNutritionFact.bind(this);
        this.cancelClick = this.cancelClick.bind(this);
        this.saveClick = this.saveClick.bind(this);

        this.state = {
            newIngredient: {
                name: '',
                cost: {
                    price: 0,
                    unit: MEASUREMENTS[0]
                },
                commonalityFactor: 1,
                "measurements": [
                    {
                        "type": MEASUREMENTS[0],
                        "amount": 0,
                        "macros": {
                            "calories": 0,
                            "protein": 0,
                            "carbs": 0,
                            "fat": 0
                        }
                    }
                ],
            },
            allergies: "",
            tags: ""
        };
    }

    handleNameChange(e) {
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                name: e.target.value
            })
        });
    }

    handleCommonalityFactorChange(e) {
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                commonalityFactor: e.target.value
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
        newCost.unit = e.target.value;
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                cost: newCost
            })
        });
    }

    handleMeasurementChange(measurement, index) {
        let newMeasurements = JSON.parse(JSON.stringify(this.state.newIngredient.measurements));
        newMeasurements[index] = measurement;
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                measurements: newMeasurements
            })
        });
    }

    handleAllergiesChange(e) {
        this.setState({allergies: e.target.value});
    }

    handleTagsChange(e) {
        this.setState({tags: e.target.value});
    }

    addNutritionFact() {
        let newMeasurements = JSON.parse(JSON.stringify(this.state.newIngredient.measurements));
        let newMeasurement = {
            "type": MEASUREMENTS[0],
            "amount": 0,
            "macros": {
                "calories": 0,
                "protein": 0,
                "carbs": 0,
                "fat": 0
            }
        };
        newMeasurements.push(newMeasurement);
        this.setState({
            newIngredient: Object.assign({}, this.state.newIngredient, {
                measurements: newMeasurements
            })
        });
    }

    removeNutritionFact(index) {
        let newMeasurements = JSON.parse(JSON.stringify(this.state.newIngredient.measurements));
        newMeasurements.splice(index,1);
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
        var ingredient = {
            name: this.state.newIngredient.name,
            ingredientId: this.state.newIngredient.name.toLowerCase().replace(' ', '_').replace(',', '_'),
            cost: this.state.newIngredient.cost,
            commonality: this.state.newIngredient.commonalityFactor,
            measurements: [], //this.state.newIngredient.measurements,
            allergies: [], //this.state.allergies.split(','),
            tags: [] //this.state.tags.split(',')
        };
        this.state.newIngredient.measurements.map((measurement, index) => ingredient.measurements.push(measurement));
        this.state.allergies.split(',').map((allergy, index) => ingredient.allergies.push(allergy));
        this.state.tags.split(',').map((tag, index) => ingredient.tags.push(tag));
        this.props.onSave(ingredient);
    }

    render() {
        const nutritionFactStyle = {
            marginLeft: '20px'
        };
        var commonalityRates = [1,2,3,4,5,6,7,8,9,10].map((rate, index) => <option key={rate} value={rate}>{rate}</option> );
        var units = MEASUREMENTS.map((measurement, index) => <option key={measurement} value={measurement}>{measurement}</option> );
        var nutritionFacts = this.state.newIngredient.measurements.map((measurement, index) => <NutritionFact key={index} index={index}
                                                                                                              measurement={measurement}
                                                                                                              handleMeasurementChange={this.handleMeasurementChange}
                                                                                                              removeMeasurement={this.removeNutritionFact} /> );
        return (
            <div className="add-ingredient-modal">
                <div>
                    <label htmlFor="name">Name </label>
                    <input id="name" value={this.state.newIngredient.name} onChange={this.handleNameChange}/>
                </div>
                <br/>
                <div>
                    <label>Commonality Factor: </label>
                    <select value={this.state.newIngredient.commonalityFactor} onChange={this.handleCommonalityFactorChange}>
                        {commonalityRates}
                    </select>
                    <span> (1-Common, 10-Rare)</span>
                </div>
                <br/>
                <div>
                    <label htmlFor="cost">Cost </label>
                    <input id="cost" value={this.state.newIngredient.cost.price} onChange={this.handleCostPriceChange}/>
                    <span>per</span>
                    <select value={this.state.newIngredient.cost.unit} onChange={this.handleCostUnitChange}>
                        {units}
                    </select>
                </div>
                <br/>
                <div>
                    <p>Nutrition</p>
                    <div style={nutritionFactStyle}>
                        {nutritionFacts}
                    </div>
                    <button onClick={this.addNutritionFact}>Add New +</button>
                </div>
                <br/>
                <div>
                    <label htmlFor="allegies">Allergies (comma separated) </label>
                    <textarea value={this.state.allergies} onChange={this.handleAllergiesChange}/>
                    <label htmlFor="tags">Tags (comma separated) </label>
                    <textarea value={this.state.tags} onChange={this.handleTagsChange}/>
                </div>
                <button onClick={this.cancelClick}>Cancel</button>
                <button onClick={this.saveClick}>Save</button>
            </div>
        );
    }
}
export default AddIngredientModal
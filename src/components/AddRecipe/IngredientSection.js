// -- Import core React tools
import React from 'react'
import Modal from 'react-modal'

// -- Import Nutrition Service
import { GetIngredients, AddNewIngredient } from '../../services/nutrition-service.js';

// -- Components
import AddIngredientModal from "./AddIngredientModal";

// -- GLOBAL VARIABLES
let MEASUREMENTS = ['Milliliters', 'Teaspoons', 'Tablespoons', 'Cups', 'Grams', 'Ounces', 'Pounds', 'Kilograms'];

// -- STYLES
const modalStyle = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};


class IngredientListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
        this.handleSectionChange = this.handleSectionChange.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    }

    handleQuantityChange(e) {
        let newIngredient = JSON.parse(JSON.stringify(this.props.ingredient));
        newIngredient.quantity = e.target.value;
        this.handleIngredientChange(newIngredient);
    }

    handleMeasurementChange(e) {
        let newIngredient = JSON.parse(JSON.stringify(this.props.ingredient));
        newIngredient.measurement = e.target.innerText;
        this.handleIngredientChange(newIngredient);
    }

    handleSectionChange(e) {
        let newIngredient = JSON.parse(JSON.stringify(this.props.ingredient));
        newIngredient.section = e.target.innerText;
        this.handleIngredientChange(newIngredient);
    }

    handleIngredientChange(ingredient) {
        this.props.onIngredientChange(ingredient);
    }

    handleDeleteIngredient() {
        this.props.onIngredientDeleted(this.props.ingredient.id);
    }

    render() {
        var measurementItems = [];
        var sectionItems = [];
        MEASUREMENTS.forEach(function (measurement, index) {
            //measurementItems.push(<MenuItem value={measurement} primaryText={measurement} />);
            measurementItems.push(<option value={measurement}>{measurement}</option>);
        });
        this.props.sections.forEach(function (section, index) {
            //sectionItems.push(<MenuItem value={section.id} primaryText={section.name} />);
            sectionItems.push(<option value={section.id}>{section.name}</option>);
        });
        return (
            <li className="ingredient-list-item">
                <button onClick={this.handleDeleteIngredient}>X</button>
                <span>{this.props.ingredient.name}</span>
                <input value={this.props.ingredient.quantity} onChange={this.handleQuantityChange}/>
                <select value={this.props.ingredient.measurement} onChange={this.handleMeasurementChange}>
                    {measurementItems}
                </select>
                <select value={this.props.ingredient.section} onChange={this.handleSectionChange}>
                    {sectionItems}
                </select>
            </li>
        );
        /*<FlatButton style={{flex: .25}} label="X" onClick={this.handleDeleteIngredient} />
        <p style={{flex: 1}} >{this.props.ingredient.name}</p>
        <TextField style={{flex: 1}} value={this.props.ingredient.quantity} onChange={this.handleQuantityChange} />
        <DropDownMenu style={{flex: 1}} value={this.props.ingredient.measurement} onChange={this.handleMeasurementChange}>
            {measurementItems}
        </DropDownMenu>
        <DropDownMenu style={{flex: 1}} value={this.props.ingredient.section} onChange={this.handleSectionChange}>
            {sectionItems}
        </DropDownMenu>*/
    }
}

class IngredientList extends React.Component {
    constructor(props) {
        super(props);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    }

    handleIngredientChange(ingredient) {
        this.props.onIngredientChange(ingredient);
    }

    handleDeleteIngredient(ingredientId) {
        this.props.onIngredientDeleted(ingredientId);
    }

    render() {
        var self = this;
        var rows = [];
        this.props.recipe.ingredients.forEach(function (ingredient, index) {
            rows.push(<IngredientListItem ingredient={ingredient}
                                          sections={self.props.recipe.ingredientSections}
                                          onIngredientChange={self.handleIngredientChange}
                                          onIngredientDeleted={self.handleDeleteIngredient} />)
        });
        return (
            <div className="ingredient-list-section">
                <h3>Ingredients List</h3>
                <ul className="ingredient-list">
                    {rows}
                </ul>
            </div>
        );
    }
}

class IngredientSearchItem extends React.Component {
    constructor(props) {
        super(props);
        this.addIngredient = this.addIngredient.bind(this);
    }

    addIngredient(e) {
        //add ingredient to ingredientList
        this.props.onIngredientAdded(this.props.ingredient);
    }

    render() {
        return (
            <li>
                <span>{this.props.ingredient.name}</span><button onClick={this.addIngredient}>{"+"}</button>
            </li>
        );
    }
}

class IngredientSearch extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.addNewIngredient = this.addNewIngredient.bind(this);
        this.cancelNewIngredient = this.cancelNewIngredient.bind(this);
        this.saveNewIngredient = this.saveNewIngredient.bind(this);

        this.state = {
            allIngredients: [],
            filteredIngredients: [],
            modalOpen: false,
            searchText: ''
        };

        this.loadIngredientSource();
    }

    loadIngredientSource() {
        GetIngredients().then((ingredients) => {
            this.setState({searchText: ''});

            this.setState({allIngredients: ingredients});

            //no filter on load
            this.setState({filteredIngredients: ingredients});
        });
    }

    handleSearchChange(e) {
        var searchText = e.target.value;
        var filteredList = [];
        if (!searchText || searchText.trim() === '') {
            // -- include all ingredients if list is empty
            filteredList = this.state.allIngredients;
        }
        else {
            // -- otherwise, filter list by search text
            this.state.allIngredients.forEach(function (ingredient, index) {
                if (ingredient.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                    filteredList.push(ingredient);
                }
            });
        }
        this.setState({filteredIngredients: filteredList, searchText: searchText});
    }

    addIngredient(value) {
        this.props.onIngredientAdded(value);
    }

    addNewIngredient(e) {
        // ***** clear newIngredient object in modal
        this.setState({modalOpen: true});
    }

    cancelNewIngredient() {
        this.setState({modalOpen: false});
    }

    saveNewIngredient(newIngredient) {
        // -- push new ingredient to service
        AddNewIngredient(JSON.stringify(newIngredient)).then((res) => {

            if (res.ok)
            {
                // -- append new ingredient to ingredient search list
                let newIngredients = JSON.parse(JSON.stringify(this.state.allIngredients));
                newIngredients.push(newIngredient);
                this.setState({
                    allIngredients: newIngredients,
                    filteredIngredients: newIngredients
                });
            }
            // -- reset search text
            this.setState({searchText: ''});
        });
        this.setState({modalOpen: false});
    }

    handleClose = () => {
        this.setState({modalOpen: false});
    };

    closeModal() {

    }

    render() {
        var self = this;        
        const ingredientSearchBox = {
            height: '200px',
            width: '250px',
            overflow: 'scroll'
        };
        var rows = [];
        this.state.filteredIngredients.forEach(function (ingredient, index) {
            rows.push(<IngredientSearchItem key={ingredient.ingredientId}
                                            index={index}
                                            ingredient={ingredient}
                                            onIngredientAdded={self.addIngredient} />);
        });
        return (
            <div className="ingredient-search-section">
                <h3>Ingredients Search</h3>
                <input type="search" placeholder="Search for ingredient..." value={this.state.searchText} onChange={this.handleSearchChange}/>
                <div style={ingredientSearchBox}>
                    <ul>
                        {rows}
                    </ul>
                </div>
                <button onClick={this.addNewIngredient}>Add New +</button>
                <Modal isOpen={this.state.modalOpen}
                       style={modalStyle}
                       contentLabel="Add Ingredient">
                    <AddIngredientModal onCancel={self.cancelNewIngredient} onSave={self.saveNewIngredient} />
                </Modal>
            </div>
        );
    }
}

class SectionListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleIngredientSectionChange = this.handleIngredientSectionChange.bind(this);
        this.handleDeleteIngredientSection = this.handleDeleteIngredientSection.bind(this);
    }

    handleIngredientSectionChange(e) {
        // ***** can't figure out why, but the cursor loses focus every time a section is updated *****
        let updatedSection = JSON.parse(JSON.stringify(this.props.section));
        updatedSection.name = e.target.value;
        updatedSection.id = updatedSection.name && updatedSection.name !== '' ? updatedSection.name.toLowerCase().replace(/ /g,"_") : new Date().getUTCMilliseconds(); //must give it a unique id
        this.props.onIngredientSectionChange(this.props.index, updatedSection);
    }

    handleDeleteIngredientSection(e) {
        this.props.onIngredientSectionDeleted(this.props.index);
    }

    render() {
        return (
            <li>
                <input value={this.props.section.name} onChange={this.handleIngredientSectionChange}/>
                <button onClick={this.handleDeleteIngredientSection}>X</button>
            </li>
        );
    }
}

class SectionTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleIngredientSectionChange = this.handleIngredientSectionChange.bind(this);
        this.handleNewIngredientSection = this.handleNewIngredientSection.bind(this);
        this.handleDeleteIngredientSection = this.handleDeleteIngredientSection.bind(this);
    }

    handleIngredientSectionChange(index, value) {
        this.props.onIngredientSectionChange(index, value);
    }

    handleNewIngredientSection(e) {
        this.props.onIngredientSectionAdded();
    }

    handleDeleteIngredientSection(index) {
        this.props.onIngredientSectionDeleted(index);
    }

    render() {
        var self = this;
        var rows = [];
        this.props.sections.forEach(function (section, index) {
            rows.push(<SectionListItem key={section.id}
                                       index={index}
                                       section={section}
                                       onIngredientSectionChange={self.handleIngredientSectionChange}
                                       onIngredientSectionDeleted={self.handleDeleteIngredientSection} />);
        });
        return (
            <div>
                <h3>Sections</h3>
                <ul className="sections-list">
                    {rows}
                </ul>
                <br />
                <button onClick={this.handleNewIngredientSection}>Add New +</button>
            </div>
        );
    }
}

class IngredientSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleIngredientSectionChange = this.handleIngredientSectionChange.bind(this);
        this.handleNewIngredientSection = this.handleNewIngredientSection.bind(this);
        this.handleDeleteIngredientSection = this.handleDeleteIngredientSection.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    }

    handleIngredientSectionChange(index, value) {
        this.props.onIngredientSectionChange(index, value);
    }

    handleNewIngredientSection(e) {
        this.props.onIngredientSectionAdded();
    }

    handleDeleteIngredientSection(index) {
        this.props.onIngredientSectionDeleted(index);
    }

    addIngredient(value) {
        this.props.onIngredientAdded(value);
    }

    handleIngredientChange(ingredient) {
        this.props.onIngredientChange(ingredient);
    }

    handleDeleteIngredient(ingredientId) {
        this.props.onIngredientDeleted(ingredientId);
    }

    render() {
        return (
            <div>
                <h2>Ingredients Section</h2>
                <SectionTable sections={this.props.recipe.ingredientSections}
                              onIngredientSectionChange={this.handleIngredientSectionChange}
                              onIngredientSectionAdded={this.handleNewIngredientSection}
                              onIngredientSectionDeleted={this.handleDeleteIngredientSection} />
                <div className="add-ingredients-section">
                    <IngredientSearch recipe={this.props.recipe}
                                      onIngredientAdded={this.addIngredient} />
                    <IngredientList recipe={this.props.recipe}
                                    onIngredientChange={this.handleIngredientChange}
                                    onIngredientDeleted={this.handleDeleteIngredient} />
                </div>
            </div>
        );
    }
}
export default IngredientSection
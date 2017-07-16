// -- Import core React tools
import React from 'react'

// -- Components
import DirectionSection from "./AddRecipe/DirectionSection";
import IngredientSection from "./AddRecipe/IngredientSection";
import NoteSection from "./AddRecipe/NoteSection";
import RecipeInfoSection from "./AddRecipe/RecipeInfoSection";

// -- GLOBAL VARIABLES
let MEASUREMENTS = ['Milliliters', 'Teaspoons', 'Tablespoons', 'Cups', 'Grams', 'Ounces', 'Pounds', 'Kilograms'];


class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                recipeId: '',
                name: '',
                url: '',
                time: {
                    active: 0,
                    total: 0
                },
                servings: 0,
                difficultyRating: 0,
                ingredientSections: [
                    {
                        name: 'Main',
                        id: 'main'
                    },
                    {
                        name: 'Second',
                        id: 'second'
                    }
                ],
                ingredients: [],
                directions: [''],
                notes: ['']
            }
        };

        // -- RECIPE INFO SECTION
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleServingsChange = this.handleServingsChange.bind(this);
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.handleActiveTimeChange = this.handleActiveTimeChange.bind(this);
        this.handleTotalTimeChange = this.handleTotalTimeChange.bind(this);

        // -- INGREDIENTS SECTION
        this.handleIngredientSectionChange = this.handleIngredientSectionChange.bind(this);
        this.handleNewIngredientSection = this.handleNewIngredientSection.bind(this);
        this.handleDeleteIngredientSection = this.handleDeleteIngredientSection.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);

        // -- DIRECTIONS SECTION
        this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
        this.handleNewDirection = this.handleNewDirection.bind(this);
        this.handleDeleteDirection = this.handleDeleteDirection.bind(this);

        // -- NOTES SECTION
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);

        // -- SAVE RECIPE
        this.saveNewRecipe = this.saveNewRecipe.bind(this);
    }

    // -- RECIPE INFO SECTION
    handleNameChange(name) {
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                name: name
            })
        });
    }
    handleURLChange(url) {
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                url: url
            })
        });
    }
    handleServingsChange(servings) {
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                servings: servings
            })
        });
    }
    handleDifficultyChange(difficultyRating) {
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                difficultyRating: difficultyRating
            })
        });
    }
    handleActiveTimeChange(activeTime) {
        let newTime = JSON.parse(JSON.stringify(this.state.recipe.time));
        newTime.active = activeTime;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                time: newTime
            })
        });
    }
    handleTotalTimeChange(totalTime) {
        let newTime = JSON.parse(JSON.stringify(this.state.recipe.time));
        newTime.total = totalTime;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                time: newTime
            })
        });
    }

    // -- INGREDIENTS SECTION
    handleIngredientSectionChange(index, ingredientSection) {
        let newIngredientSections = JSON.parse(JSON.stringify(this.state.recipe.ingredientSections));
        newIngredientSections[index] = ingredientSection;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                ingredientSections: newIngredientSections
            })
        });
    }
    handleNewIngredientSection() {
        let newIngredientsSections = JSON.parse(JSON.stringify(this.state.recipe.ingredientSections));
        newIngredientsSections.push({
            name: '',
            id: new Date().getUTCMilliseconds()
        });
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                ingredientSections: newIngredientsSections
            })
        });
    }
    handleDeleteIngredientSection(index) {
        let newIngredientsSections = JSON.parse(JSON.stringify(this.state.recipe.ingredientSections));
        newIngredientsSections.splice(index,1);
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                ingredientSections: newIngredientsSections
            })
        });
    }
    addIngredient(value) {
        var ingredient = {
            id: value.ingredientId,
            name: value.name,
            quantity: 0,
            measurement: MEASUREMENTS[0],
            section: this.state.recipe.ingredientSections[0].id
        };
        let newIngredients = JSON.parse(JSON.stringify(this.state.recipe.ingredients));
        newIngredients.push(ingredient);
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                ingredients: newIngredients
            })
        });
    }
    handleIngredientChange(ingredient) {
        let newIngredients = JSON.parse(JSON.stringify(this.state.recipe.ingredients));
        var index = this.state.recipe.ingredients.map((a) => a.id).indexOf(ingredient.id);
        newIngredients[index] = ingredient;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                ingredients: newIngredients
            })
        });
    }
    handleDeleteIngredient(ingredientId) {
        let newIngredients = JSON.parse(JSON.stringify(this.state.recipe.ingredients));
        var index = this.state.recipe.ingredients.map((a) => a.id).indexOf(ingredientId);
        newIngredients.splice(index,1);
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                ingredients: newIngredients
            })
        });
    }

    // -- DIRECTIONS SECTION
    handleDirectionsChange(index, direction) {
        let newDirections = JSON.parse(JSON.stringify(this.state.recipe.directions));
        newDirections[index] = direction;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                directions: newDirections
            })
        });
    }
    handleNewDirection() {
        let newDirections = JSON.parse(JSON.stringify(this.state.recipe.directions));
        newDirections.push('');
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                directions: newDirections
            })
        });
    }
    handleDeleteDirection(index) {
        let newDirections = JSON.parse(JSON.stringify(this.state.recipe.directions));
        newDirections.splice(index,1);
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                directions: newDirections
            })
        });
    }

    // -- NOTES SECTION
    handleNotesChange(index, note) {
        let newNotes = JSON.parse(JSON.stringify(this.state.recipe.notes));
        newNotes[index] = note;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                notes: newNotes
            })
        });
    }
    handleNewNote() {
        let newNotes = JSON.parse(JSON.stringify(this.state.recipe.notes));
        newNotes.push('');
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                notes: newNotes
            })
        });
    }
    handleDeleteNote(index) {
        let newNotes = JSON.parse(JSON.stringify(this.state.recipe.notes));
        newNotes.splice(index,1);
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                notes: newNotes
            })
        });
    }

    saveNewRecipe() {
        //push new recipe to service and reset page if successful, otherwise, alert the error and allow the user to fix it

        //may need to build out the custom JSON obejct for the recipe
        const jsonString = JSON.stringify(this.state.recipe);
        console.log(jsonString);


        /*AddRecipe(jsonString).then((newRecipe) => {
            if (Object.keys(newRecipe).length > 0)
            {
                //check that what is returned is valid, then clear out recipe page for new recipe
            }
        });*/
    }

    render() {
        const recipePageStyle={
            width: '100%'
        }
        const saveButtonStyle={
            float: 'right',
            margin: '16px'
        }
        return (
            <div className="NewRecipePage" style={recipePageStyle}>
                <h1>Add Recipe Page</h1>
                <RecipeInfoSection
                    recipe={this.state.recipe}
                    onNameChange={this.handleNameChange}
                    onURLChange={this.handleURLChange}
                    onServingsChange={this.handleServingsChange}
                    onDifficultyChange={this.handleDifficultyChange}
                    onActiveTimeChange={this.handleActiveTimeChange}
                    onTotalTimeChange={this.handleTotalTimeChange} />

                <IngredientSection
                    recipe={this.state.recipe}
                    onIngredientSectionChange={this.handleIngredientSectionChange}
                    onIngredientSectionAdded={this.handleNewIngredientSection}
                    onIngredientSectionDeleted={this.handleDeleteIngredientSection}
                    onIngredientAdded={this.addIngredient}
                    onIngredientChange={this.handleIngredientChange}
                    onIngredientDeleted={this.handleDeleteIngredient} />

                <DirectionSection
                    recipe={this.state.recipe}
                    onDirectionsChange={this.handleDirectionsChange}
                    onDirectionAdded={this.handleNewDirection}
                    onDirectionDeleted={this.handleDeleteDirection} />

                <NoteSection
                    recipe={this.state.recipe}
                    onNotesChange={this.handleNotesChange}
                    onNoteAdded={this.handleNewNote}
                    onNoteDeleted={this.handleDeleteNote} />

                <button style={saveButtonStyle} onClick={this.saveNewRecipe} >Save</button>
            </div>
        );
    }
}
export default AddRecipe
// -- Import core React tools
import React from 'react'

// -- Import Nutrition Service
//import { AddNewRecipe } from '../services/nutrition-service.js';

// -- Components
//import DirectionSection from "./AddRecipe/DirectionSection";

// -- GLOBAL VARIABLES
let GENDERS = ['Male', 'Female', 'X'];
let DELIVERY_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                email: '',
                name: '',
                phone: '',
                address: '',
                sex: GENDERS[0],
                birthDate: Date.Today,
                body: {
                    weight: {
                        current: 200,
                        target: 200,
                        history: []
                    },
                    height: 60,
                    fat_percent: {
                        current: 0,
                        target: 0,
                        history: []
                    }
                },
                food: {
                    allergies: [],
                    dislikes: []
                },
                meals: {
                    deliveryDay: DELIVERY_DAYS[0],
                    history: [],
                    ratings: []
                },
                nutrition: {
                    isocaloricValue: 0,
                    weeklyExercise: {
                        light: 0,
                        moderate: 0,
                        heavy: 0
                    },
                    cycles: []
                }
            }
        };

        // -- USER INFO SECTION
        this.handleNameChange = this.handleNameChange.bind(this);

        // -- TARGET SECTION
        this.handleIngredientSectionChange = this.handleIngredientSectionChange.bind(this);

        // -- WORKOUT SECTION
        this.handleDirectionsChange = this.handleDirectionsChange.bind(this);

        // -- MEALPLAN SECTION
        this.handleNotesChange = this.handleNotesChange.bind(this);

        // -- SAVE USER
        this.saveNewRecipe = this.saveNewRecipe.bind(this);
    }

    // -- USER INFO SECTION
    handleNameChange(name) {
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                name: name
            })
        });
    }

    // -- TARGET SECTION
    handleIngredientSectionChange(index, ingredientSection) {
        let newIngredientSections = JSON.parse(JSON.stringify(this.state.recipe.ingredientSections));
        newIngredientSections[index] = ingredientSection;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                ingredientSections: newIngredientSections
            })
        });
    }

    // -- WORKOUT SECTION
    handleDirectionsChange(index, direction) {
        let newDirections = JSON.parse(JSON.stringify(this.state.recipe.directions));
        newDirections[index] = direction;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                directions: newDirections
            })
        });
    }

    // -- MEALPLAN SECTION
    handleNotesChange(index, note) {
        let newNotes = JSON.parse(JSON.stringify(this.state.recipe.notes));
        newNotes[index] = note;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                notes: newNotes
            })
        });
    }

    // -- SAVE USER
    saveNewRecipe() {
        //push new recipe to service and reset page if successful, otherwise, alert the error and allow the user to fix it
        this.state.recipe.recipeId = this.state.recipe.name.toLowerCase().replace(' ', '_').replace(',', '_');

        // AddNewRecipe(JSON.stringify(this.state.recipe)).then((res) => {
        //     if (res.ok)
        //     {
        //         //***** what do we want to do if it's successful (or even if it's not)
        //     }
        // });
    }

    render() {
        const userProfilePageStyle={
            width: '100%'
        }
        const saveButtonStyle={
            float: 'right',
            margin: '16px'
        }

                // <RecipeInfoSection
                //     recipe={this.state.recipe}
                //     onNameChange={this.handleNameChange}
                //     onURLChange={this.handleURLChange}
                //     onServingsChange={this.handleServingsChange}
                //     onDifficultyChange={this.handleDifficultyChange}
                //     onActiveTimeChange={this.handleActiveTimeChange}
                //     onTotalTimeChange={this.handleTotalTimeChange} />

                // <IngredientSection
                //     recipe={this.state.recipe}
                //     onIngredientSectionChange={this.handleIngredientSectionChange}
                //     onIngredientSectionAdded={this.handleNewIngredientSection}
                //     onIngredientSectionDeleted={this.handleDeleteIngredientSection}
                //     onIngredientAdded={this.addIngredient}
                //     onIngredientChange={this.handleIngredientChange}
                //     onIngredientDeleted={this.handleDeleteIngredient} />

                // <DirectionSection
                //     recipe={this.state.recipe}
                //     onDirectionsChange={this.handleDirectionsChange}
                //     onDirectionAdded={this.handleNewDirection}
                //     onDirectionDeleted={this.handleDeleteDirection} />

                // <NoteSection
                //     recipe={this.state.recipe}
                //     onNotesChange={this.handleNotesChange}
                //     onNoteAdded={this.handleNewNote}
                //     onNoteDeleted={this.handleDeleteNote} />

                // <button style={saveButtonStyle} onClick={this.saveNewRecipe} >Save</button>
        return (
            <div className="UserProfilePage" style={userProfilePageStyle}>
                <h1>User Profile Page</h1>
            </div>
        );
    }
}
export default UserProfile
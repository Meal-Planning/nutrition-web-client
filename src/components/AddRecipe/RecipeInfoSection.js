// -- Import core React tools
import React from 'react'

class RecipeInfoSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleServingsChange = this.handleServingsChange.bind(this);
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.handleActiveTimeChange = this.handleActiveTimeChange.bind(this);
        this.handleTotalTimeChange = this.handleTotalTimeChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    handleURLChange(e) {
        this.props.onURLChange(e.target.value);
    }

    handleServingsChange(e) {
        this.props.onServingsChange(e.target.value);
    }

    handleDifficultyChange(e) {
        this.props.onDifficultyChange(e.target.value);
    }

    handleActiveTimeChange(e) {
        this.props.onActiveTimeChange(e.target.value);
    }

    handleTotalTimeChange(e) {
        this.props.onTotalTimeChange(e.target.value);
    }

    render() {
        return (
            <div className="recipe-info">
                <h2>Recipe Info Section</h2>

                <label for="name">Name</label>
                <input id="name" value={this.props.recipe.name} onChange={this.handleNameChange}/>

                <label for="url">URL</label>
                <input id="url" value={this.props.recipe.url} onChange={this.handleURLChange}/>
                <br/>

                <label for="servings">Servings</label>
                <input id="servings" value={this.props.recipe.servings} onChange={this.handleServingsChange}/>

                <label for="difficulty">Difficulty (0-10)</label>
                <input id="difficulty" value={this.props.recipe.difficultyRating} onChange={this.handleDifficultyChange}/>

                <label for="activeTime">Active Time</label>
                <input id="activeTime" value={this.props.recipe.time.active} onChange={this.handleActiveTimeChange}/>

                <label for="activeTotal">Total Time</label>
                <input id="activeTotal" value={this.props.recipe.time.total} onChange={this.handleTotalTimeChange}/>
            </div>
        );
    }
}
export default RecipeInfoSection
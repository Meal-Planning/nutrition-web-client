// -- Dev Data
import ingredients from '../dev-data/ingredients.json';
import recipes from '../dev-data/recipes.json';


export function GetIngredients() {
    return genericGet("/api/ingredient");
}

export function AddIngredient(newIngredient) {
    return genericPost("/api/ingredient", newIngredient);
}

export function AddRecipe(newRecipe) {
    return genericPost("/api/recipe", newRecipe);
}

//********** Helpers **********

function genericPost(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson;
    })
    .catch((error) => {
        console.error(error);
        return {};
    });
}

function genericGet(url) {
    return fetch('/api/ingredient')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
            return [];
        });
}
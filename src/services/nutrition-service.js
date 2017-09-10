// -- Dev Data
import ingredients from '../dev-data/ingredients.json';
import recipes from '../dev-data/recipes.json';


export function GetIngredients() {
    return genericGet("/api/ingredient");
}

export function AddNewIngredient(newIngredient) {
    return genericPost("/api/ingredient", newIngredient);
}

export function AddNewRecipe(newRecipe) {
    return genericPost("/api/recipe", newRecipe);
}

export function AddNewUser(newUser) {
    return genericPost("/api/user", newUser);
}

export function GetUsers() {
    return genericGet("/api/user");
}

export function GetUser(email) {
    return genericGet("/api/user/" + email);
}

export function UpdateUser(email, user) {
    return genericPut("/api/user/" + email, user);
}

export function GetUserMacros(email) {
    return genericGet("/api/user/" + email + "/macros");
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

function genericPut(url, body) {
    return fetch(url, {
        method: 'PUT',
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
    return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
            return {};
        });
}
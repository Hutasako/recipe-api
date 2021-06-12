// https://rapidapi.com/spoonacular/api/recipe-food-nutrition/
document.addEventListener("DOMContentLoaded", function(){

	const addIngredientBtn = document.getElementById("add-ingredient");
	const findRecipesBtn = document.getElementById("find-recipes");

	const ingredient = document.getElementById("ingredient");
	const myIngredients = document.getElementById("my-ingredients");
	const recipesContainer = document.getElementById("recipe-container");

	const recipeModalContainer = document.getElementById("recipe-modal");
	const recipeModalTitle = document.getElementById("recipe-title");
	const recipeModalBody = document.getElementById("recipe-body");
	const recipeModalURL = document.getElementById("recipe-url");
	
	const ingredientsList = [];

	const ingredientsContainer = document.createElement("ul");
	ingredientsContainer.classList.add("list-group");


	function getRecipes(ingredients){
		let joinedString = ingredients.join("%2C");
		console.log(`Sent ingredients: ${joinedString}`);
		fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${joinedString}&number=5&ignorePantry=true&ranking=1`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "d065a6d56cmsh177414c74052be8p1726dfjsn7ba97c54ee16",
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
			}
		})
		.then((response) => response.json())
		.then(response => {
			console.log(response);
			response.forEach(recipe => displayRecipes(recipe))
			// displayRecipes(response);
		})
		.catch(err => {
			console.error(err);
		});
	}

	function findRecipe(id){
		fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "d065a6d56cmsh177414c74052be8p1726dfjsn7ba97c54ee16",
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
		}
		})
		.then((response) => response.json())
		.then(response => {
			viewRecipe(response);
			console.log(response);
		})
		.catch(err => {
			console.error(err);
		});
	}

	function displayRecipes(recipes){
		let recipeCard = document.createElement("div");
		recipeCard.classList.add("card");
		recipeCard.style.width="18rem";
		recipeCard.innerHTML =
		`<img src="${recipes.image}" class="card-img-top" alt="${recipes.title}">
		<div class="card-body">
		  	<h5 class="card-title">${recipes.title}</h5>
			  <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#recipeModal" id="view-recipe" data-recipeID="${recipes.id}">
				Details
			</button>
		</div>`;
		// <btn id="view-recipe" class="btn btn-primary" data-recipeID="${recipes.id}" type="button" data-bs-toggle="modal" data-bs-target="#recipe-modal">View</btn>

		recipesContainer.appendChild(recipeCard);
	}

	function viewRecipe(recipe){
		recipeModalTitle.innerHTML = recipe.title;
		recipeModalBody.innerHTML = recipe.summary;
		recipeModalURL.href = `${recipe.sourceUrl}`;
		// recipeModalContainer.appendChild(recipeModal);
	}

	addIngredientBtn.addEventListener("click", function(e) {
		e.preventDefault();
		if (ingredient.value && !ingredientsList.includes(ingredient.value)){
			console.log(`Added ${ingredient.value}`);
			ingredientsList.push(ingredient.value);
			console.log(`Ingredients list: ${ingredientsList}`);

			const itemList = `<li class="list-group-item"><button type="button" class="btn-close"></button>${ingredient.value}</li>`
			ingredientsContainer.innerHTML += itemList;
			myIngredients.appendChild(ingredientsContainer);
			console.log(ingredientsContainer.innerHTML);
		}
	})

	findRecipesBtn.addEventListener("click", function(e) {
		e.preventDefault();
		if (ingredientsList){
			const recipeList = getRecipes(ingredientsList);
			// console.log(recipeList);
			// recipeList.forEach(recipe => displayRecipes(recipe))
		}
	})

	document.addEventListener("click", function(e) {
		e.preventDefault();
		if(e.target.id == "view-recipe"){
			console.log(`clicked; ${e.target.dataset.recipeid}`);
			findRecipe(e.target.dataset.recipeid);
		}
	})
	// getRecipe();
})
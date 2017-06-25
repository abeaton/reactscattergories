import _ from 'lodash';

export default class ScattergoriesRandomGenerator {
	constructor(numberOfRounds){
		this.categories = ScattergoriesRandomGenerator.assembleCategories(numberOfRounds);
		this.categoriesIndex = 0;
	}

	static maxNumberOfRounds(){
		return questions.size;
	}

	static assembleCategories(numberOfRounds){
		let categories = _.times(numberOfRounds, _.stubArray());
		const allCategories = ScattergoriesRandomGenerator.allCategories();

		const potentialCategoriesPerRound = allCategories.length / numberOfRounds;
		const categoriesPerRound = Math.min(12, potentialCategoriesPerRound);

		categories = categories.map(() => allCategories.splice(0, categoriesPerRound));

		return categories;
	}

	getCategoryIterator(){
		return {
			next: function() {
				return this.categoriesIndex < this.categories.length 
					? { value: this.categories[this.categoriesIndex++] }
					: { done: true }
			}.bind(this)
		};
	}

	static getLetter(){
		const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "W"];

		var randomIndex = ScattergoriesRandomGenerator.getRandomIndex(letters.length);

		return letters[randomIndex];
	}

	static getRandomIndex(length){
		return Math.floor((Math.random() * length));
	}

	static allCategories(){
		return _.shuffle(["A boy's name", "U.S. Cities", "Things that are cold", "School Supplies", "Pro Sports Teams", "Insects", 
			"Breakfast foods", "Furniture", "TV Shows", "Things that are found in the ocean", "Presidents", "Product Names",
			"Vegetables", "States", "Things you throw away", "Occupations", "Appliances", "Cartoon Characters", "Drinks",
			"Musical Groups", "Stores", "Trees", "Personality Traits", "Things at a football game"]);
	}
}
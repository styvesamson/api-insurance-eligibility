const Customer = require("../models/CustomerModel");
const { body,validationResult } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const utility = require("../helpers/utility");
const auth = require("../middlewares/jwt");

/**
 * Customer Calculate score .
 *
 * @param {number}      age
 * @param {number}      dependents
 * @param {number}      income
 * @param {string}      marital_status
 * @param {Array}      	risk_questions
 * @param {Object}      house
 * @param {Object}      vehicle
 *
 *
 * @param {string}      description
 * @param {string}      isbn
 *
 * @returns {Object}
 */
exports.customerScore = [
	auth,
	body("age", "The Age must be equal or greater than 0.").isInt({ min: 0}).escape(),

	body("dependents", "The number of dependents must be  equal or greater than 0)").isInt({ min: 0}).escape(),

	body("income", "The income must be equal or greater than 0)").isInt({ min: 0}).escape(),

	body("marital_status", "The Marital status must be \"single\" or \"married\")").matches(/^(single|married)$/).escape(),

	body("risk_questions", "The Risk answers must be an array with 3 booleans (only 0 and 1 are allowed))").isArray({min: 3, max: 3})
		.custom(a => {
			return a.every((e) => {
				if (0 >= Number(e) || Number(e) <= 1) {
					return true ;
				} else return false;
			});
		}),


	body("house", "The attribute ownership status should  can be \"owned\" or \"mortgaged\"")
		.custom(a => {
			if (a && "ownership_status" in a) {
				if (a.ownership_status === "owned" || a.ownership_status === "mortgaged") {
					return true;
				} else return false;

			} else return true;
		}),

	body("vehicle", "If you have a vehicle please provide a its manufacture year")
		.custom(a => {
			if (a && "year" in a) {
				const currentYear = new Date().getFullYear();
				// comparing year with age of the oldest and the most recent vehicule
				if (a.year === parseInt(a.year, 10) && (a.year >= 1885) && (a.year <= (currentYear + 1))) {
					return true;
				} else return false;
			} else return true;
		}),

	//sanitizeBody("*").escape(),

	(req, res) => {
		try {
			const errors = validationResult(req);
			var customer = new Customer(
				{ age: req.body.age,
					dependents: req.body.dependents,
					income: req.body.income,
					marital_status: req.body.marital_status,
					risk_questions: req.body.risk_questions,
					house: req.body.house,
					vehicle: req.body.vehicle,
					user: req.user,
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Starting  Ponctuation calculation

				// Score Base
				const  BaseScore = utility.baseScore(customer.risk_questions);

				let insurance = [
					{
						name: "auto",
						score: BaseScore,
						status: ""
					},
					{
						name: "disability",
						score: BaseScore,
						status: ""
					},
					{
						name: "home",
						score: BaseScore,
						status: ""
					},
					{
						name: "life",
						score: BaseScore,
						status: ""

					}
				];

				//If the user doesn’t have income, vehicles or houses,
				// she is ineligible for disability, auto, and home insurance, respectively.
				if(Number( customer.income) === 0) utility.updateStatus(insurance, "disability",  "ineligible");
				if(!customer.vehicle.year ) utility.updateStatus(insurance, "auto", "ineligible");
				if(!customer.house.ownership_status) utility.updateStatus(insurance, "home",  "ineligible");


				//If the user is over 60 years old, she is ineligible for disability and life insurance.
				if(customer.age > 60 ){
					utility.updateStatus(insurance, "disability",  "ineligible");
					utility.updateStatus(insurance, "life",  "ineligible");
				}


				//If the user is under 30 years old, deduct 2 risk points from all lines of insurance.
				if(customer.age < 30) utility.updateAllScore(insurance, 2);


				// If she is between 30 and 40 years old, deduct 1.
				if(customer.age >= 30 && customer.age <= 40) utility.updateAllScore(insurance, 1);


				//If her income is above $200k, deduct 1 risk point from all lines of insurance.
				if(customer.income >= 200000 ) utility.updateAllScore(insurance, 1);


				//If the user's house is mortgaged, add 1 risk point to her home score
				// and add 1 risk point to her disability score.

				if(customer.house.ownership_status === "mortgaged"){
					utility.updateScore(insurance, "home", 1, true);
					utility.updateScore(insurance, "disability", 1, true);
				}


				//If the user has dependents, add 1 risk point to both the disability and life scores.
				if(Number(customer.dependents) >  0){
					utility.updateScore(insurance, "disability", 1, true);
					utility.updateScore(insurance, "life", 1, true);
				}

				//If the user is married, add 1 risk point to the life score and remove 1 risk point from disability.
				if(customer.marital_status === "married"){
					utility.updateScore(insurance, "life", 1, true);
					utility.updateScore(insurance, "disability", 1);
				}

				// If the user's vehicle was produced in the last 5 years, add 1 risk point to that vehicle’s score.
				const currentYear = new Date().getFullYear();
				if(customer.vehicle.year < currentYear  && customer.vehicle.year >= (currentYear -5)){
					utility.updateScore(insurance, "auto", 1,true);
				}

				utility.scoreResult(insurance);

				const response = 	utility.formatResponse(insurance);

				console.log(response);


				return apiResponse.successResponseWithData(res,"Your risk profile is for each line of insurance :", response);
			}
		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

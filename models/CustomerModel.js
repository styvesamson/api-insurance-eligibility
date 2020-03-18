var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CustomerSchema = new mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	jobTitle:  String,
	telephone:  String,
	email: {type: String, required: true},
	address: String,
	living:  {type: Boolean, default: true},
	gender: {type: String, required:true},


	age:  { type: Number, required:true,  min: 0},
	dependents: {type: Number,  min: 0, default:0},
	house: {
		ownership_status: String
	},
	income: {type: Number, min:0},
	marital_status: String,
	risk_questions: [],
	vehicle: {
		year: Number
	},
	user: { type: Schema.ObjectId, ref: "User", required: true },
}, {timestamps: true});

// Virtual for user's full name
CustomerSchema
	.virtual("fullName")
	.get(function () {
		return this.firstName + " " + this.lastName;
	});

module.exports = mongoose.model("Customer", CustomerSchema);
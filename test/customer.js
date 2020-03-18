const { chai, server, should } = require("./testConfig");
const CustomerModel = require("../models/CustomerModel");

/**
 * Test cases to test all the customer APIs
 * Covered Routes:
 * (1) Login
 * (2) Score customer
 */

describe("Customer", () => {
	//Before each test we empty the database
	before((done) => { 
		CustomerModel.deleteMany({}, (err) => { 
			done();           
		});        
	});

	// Prepare data for testing
	const userTestData = {
		"password":"Test@123",
		"email":"yvestoupe@gmail.com"
	};

	// Prepare data for testing
	const testData = {
		"age": 65,
		"dependents": 2,
		"house": {"ownership_status": "mortgaged"},
		"income": 250000,
		"marital_status": "married",
		"risk_questions": [1,1, 1],
		"vehicle": {"year": 2021}
	};
	/*
  * Test the /POST route
  */
	describe("/POST Login", () => {
		it("it should do user Login for customer", (done) => {
			chai.request(server)
				.post("/api/auth/login")
				.send({"email": userTestData.email,"password": userTestData.password})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Login Success.");
					userTestData.token = res.body.data.token;
					done();
				});
		});
	});

	/*
  * Test the /POST route
  */
	describe("/POST Customer Score", () => {
		it("It should send validation error for  customer score", (done) => {
			chai.request(server)
				.post("/api/customer/get-score")
				.send()
				.set("Authorization", "Bearer "+ userTestData.token)
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});

	/*
  * Test the /POST route
  */
	describe("/POST Customer Store", () => {
		it("It should store customer", (done) => {
			chai.request(server)
				.post("/api/customer")
				.send(testData)
				.set("Authorization", "Bearer "+ userTestData.token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Test Customer Score  Success.");
					done();
				});
		});
	});
});
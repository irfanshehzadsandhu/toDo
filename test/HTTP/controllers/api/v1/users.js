const expect = require("chai").expect;
const sinon = require("sinon");
const faker = require("faker");
const usersController = require("../../../../../HTTP/controllers/api/v1/users");
const eventEmitter = require("../../../../../App/Infrastructure/utils/eventEmitter")

describe("Users Controller.", () => {
    it("Should send status 200 on user registration successfully.", async () => {
        const req = {
            body: {
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            }
        }

        const res = Object.create({});
        res.status = function (status) {
            console.log("Controller sent following status:", status);
            return this;
        }

        // res.json = function (obj) {
        //     console.log("Response in json is:", sinon.spy());
        // }
        res.json = sinon.spy()
        const mailerStub = sinon.stub(eventEmitter._events, "userIsRegistered").returns("Email Sent Successfully.");
        await usersController.create(req, res);
        expect(res.json.calledOnce).to.be.true;
    });
});
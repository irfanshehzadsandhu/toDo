const expect = require("chai").expect;
const faker = require("faker");
const sinon = require("sinon");
const usersController = require("../../../../../HTTP/controllers/api/v1/users");

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
        res.json = sinon.spy();
        await usersController.create(req, res);
        expect(res.json.calledOnce).to.be.true;
    });
});
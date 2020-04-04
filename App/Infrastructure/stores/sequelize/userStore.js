const User = require("../../models/sequelize/user");
const UserEntity = require("../../../Domain/entities/user");

class SequelizeUserStore {
	async add(user) {
		const newUser = await User.create(user)
		return UserEntity.createFromObject(newUser);
	}

	async findByUserID(userID) {
		const user = await User.findOne({ where: { userID: userID } });
		if (user) {
			return UserEntity.createFromObject(user);
		}
	}

	async findByEmail(email) {
		const user = await User.findOne({ where: { email: email } });
		if (user) {
			return UserEntity.createFromObject(user);
		}
	}

}
module.exports = SequelizeUserStore;

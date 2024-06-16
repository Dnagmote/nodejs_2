const userModel = require("./user.model");

class UserServices {
    // Create
    static async save(reqBody) {
        return userModel(reqBody).save();
    }

    // Fine one
    static async fineOne(query) {
        return userModel.findOne(query).lean();
    }

    // Create
    static async list(query) {
        return userModel.find(query).lean();
    }

    // Create
    static async update(query, reqBody) {
        return userModel.findOneAndUpdate(query, { $set: reqBody }, { new: true }).lean();
    }

    // Create
    static async delete(query) {
        return userModel.findOneAndDelete(query, { new: true });
    }
}

module.exports = UserServices;

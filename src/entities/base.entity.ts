export default class BaseEntity {
    protected modelName: any

    constructor(modelname) {
        this.modelName = modelname;
    }
    async findOne(condition) {
        return await this.modelName.findOne(condition)
    }
    async find(condition = {}) {
        return await this.modelName.find(condition)
    }
    async findPagination(condition = {}, pagination?) {
        return await this.modelName.find(condition).skip(pagination.skip).limit(pagination.limit)
    }
    async create(payload) {
        return await this.modelName.create(payload)
    }
    async findByIdAndRemove(id: string) {
        return await this.modelName.findByIdAndRemove(id)
    }
    async updateOne(condition, payload) {
        return await this.modelName.updateOne(condition, { $set: payload });
    }
}
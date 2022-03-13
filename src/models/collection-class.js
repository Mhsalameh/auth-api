"use strict";

class Collection {
  constructor(model) {
    this.model = model;
  }
  async createNewRecord(obj) {
    try {
      return await this.model.create(obj);
    } catch (error) {
      console.error(
        "error while creating new record for model:",
        this.model.name,
        error
      );
    }
  }

  async readRecord(id) {
    try {
      return id
        ? await this.model.findOne({ where: { id: id } })
        : await this.model.findAll();
    } catch (error) {
      console.error(
        "error while reading record(s) for model ",
        this.model.name
      );
    }
  }

  async deleteRecord(id) {
    try {
      await this.model.destroy({ where: { id: id } });
      return this.model.findOne({ where: { id: id } });
    } catch (error) {
      console.error("error while deleting record from model ", this.model.name);
    }
  }

  async updateRecord(id, obj) {
    try {
      await this.model.update(obj, { where: { id: id } });
      return this.model.findOne({ where: { id: id } });
    } catch (error) {
      console.error(
        `error while updating record with id: ${id} from model ${this.model.name}`
      );
    }
  }
}
module.exports = Collection;

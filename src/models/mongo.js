'use strict';

class Model {

  /** 
   * 
   * constructor set to schema
   * 
   * @param schema
   * @constructor
  */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   *
   * json schema takes the schema and turns it in to readable json
   *
   * @returns a json version of the schema
   */
  jsonSchema() {
    console.log(typeof this.schema.jsonSchema);
    return typeof this.schema.jsonSchema === 'function'
      ? this.schema.jsonSchema()
      : {};
  }

  /**
   *
   * gets the object you need
   *
   * @param {*} _id
   * @returns the found object
   */
  get(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }

  /**
   *
   * creates a record and saves it to the database
   *
   * @param {*} record
   * @returns the saved record
   */
  create(record) {
    console.log('r',record);
    let newRecord = new this.schema(record);
    console.log('n', newRecord);
    return newRecord.save();
  }

  /**
   *
   * update saves the new updated object to the database
   *
   * @param {*} _id
   * @param {*} record
   * @returns the updated record and id
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
   *
   * deletes the record in the databse by id
   *
   * @param {*} _id
   * @returns the deleted id
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;

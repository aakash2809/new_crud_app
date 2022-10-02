const itemModel = require('../models/item');

class ItemService {
    /**
     * @description calling model class method to add new item to schema
     * @method save is model class method
     * @param {*} itemData holds item detail
     * @returns callback function
     */
    addItem = async (itemData) => await itemModel.save(itemData, (error, data) => {
        (error) || data;
    })

    /**
     * @description get items
     * @method getAllItem is a model class method
     */
    getItems = (callback) => {
        itemModel.getItems(((error, data) => error ? callback(error, null): callback(null, data)))
    }

    /**
     * @description update a item by id
     * @method update is model class methodholds itemData
     * @param {*}itemData holds user input update data
     * @param {*} callback is for controller class methods
     * @returns callback
     */
    updateItem = (itemData, callback) => itemModel.update(itemData, (error, data) => ((error) ? callback(error, null) : callback(null, data)))

    /**
     * @description delete a item by its id
     * @param {*} itemData holds user input data
     * @param {*} callback is for controller class method
     * @method delete is models class method
     * @returns callback
     */
    deleteItem = (itemData, callback) => itemModel.delete(itemData, (error, data) => ((error) ? callback(error, null) : callback(null, data)))

}

module.exports = new ItemService();
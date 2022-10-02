const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
  },
  
},

{
  timestamps: true,
});

const Item = mongoose.model('Item', ItemSchema);

class ItemModel {
    /**
     * @description saving Item into buckets
     * @param {*} itemtData holds user input data
     * @param {*} callback is for service class method
     */
    save = async (itemtData, callback) => {
        const item = new Item(itemtData);
        await item.save((error, itemResult) => {
            error ? callback(error, null) : callback(null, itemResult);
        });
    }

    /**
     * @description get Items from database
     * @param {*} callback is for service class holds error and user
     */
    getItems = async (callback) => {
        try{
            let result = await Item.find({})
            callback(null, result);
        }catch(error){
            callback(error, null);
        }
    }
    
     /**
     * @description filter for search item
     * @param {*} callback is for service class holds error and user
     */
    searchItem = async (searchData, callback) => {
        try{ let {title} = searchData;
            let result = await Item.find({title: {$regex: title, $options: 'i'}})
            callback(null, result);
        }catch(error){
            callback(error, null);
        }
    }
    /**
     * @description update a item
     * @param {*} itemtData
     * @param {*} callback
     */
    update = (itemtData, callback) => {
        const { itemId, } = itemtData;
         Item.findByIdAndUpdate({ _id:itemId }, {title: itemtData.title}, { new: true }, (error, result) => {
            if (error) {
              return callback(error, null);;
            }
            return callback(null, result);;
          });
    }

    /**
     * @description delete a item
     * @param {*} itemtData
     * @param {*} callback
     * @returns data of remove method
     */
    delete = (itemtData, callback) => {
        Item.findByIdAndDelete({_id: itemtData.itemId}, (error, itemResult) => {
            error ? callback(error, null) : callback(null, itemResult);
        });
    }
}

module.exports = new ItemModel();
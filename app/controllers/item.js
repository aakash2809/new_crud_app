
const itemService = require('../services/item');

class ItemController {
    /**
     * @description add item to database
     * @param {*} request takes item detail in json formate
     * @param {*} response sends response from server
     */
   /**
     * @description add new item to 
     * @method addItem is a service class method
     * @param {req, res}
     */
    addItem = (req, res) => {
        try {
            const itemData = {
                title: req.body.title,
            };
             itemService.addItem(itemData)
                .then((data) => {
                    console.log('item added successfully !');
                    res.send({
                        status: 200,
                        message: 'item added successfully !',
                        data,
                    });
                })
                .catch((error) => {
                    console.log('Some error occurred while creating item', error);
                    res.send({
                        status: 500,
                        message: 'Some error occurred while creating item',
                    });
                });
        } catch (error) {
            console.log('Some error occurred while inserting a item');
            res.send({
                status: 500,
                message: `Some error occurred while inserting ${error}`,
            });
        }
    }
 
    /**
     * @description find all item in database
     * @method getItems is service class method
     * @param {*} req holds user input
     * @param {*} res sends responce with data coming from Database
     */
     getAllItems = (req, res) => {
        try {
            itemService.getItems((error, data) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: error.message,
                    });
                } if (data.length == 0) {
                    console.log('item not found');
                    return res.status(404).send({
                        success: false,
                        message: 'item not found',
                    });
                }
                console.log('Successfully retrieved items !');
                return res.status(200).send({
                    success: true,
                    message: 'Successfully retrieved items !',
                    data,
                });
            });
        } catch (error) {
            console.log('Some error occurred !');
            res.status(500).send({
                success: false,
                message: `Some error occurred !${error}`,
            });
        }
    }

    /**
     * @description update item in database
     * @method update is service class method
     * @param res is used to send the response
     */
     updateItemByItemId = (req, res) => {
        try {
            console.log('newdfdf')
            const itemData = {
                itemId:req.body.itemId,
                title: req.body.title,
            };
            itemService.updateItem(itemData, (error, data) => (
                error
                    ? (console.log(`Error updating item with id : ${req.body.itemId}`),
                        res.send({
                            status_code: 500,
                            message: `Error updating item with id : ${req.body.itemId}${error}`,
                        }))
                    : !data
                        ? (console.log(`item not found with id : ${req.body.itemId}${error}`),
                            res.send({
                                status_code: 400,
                                message: `item not found with id : ${req.body.itemId}${error}`,
                            }))
                        : console.log('item updated successfully !'),
                res.send({
                    status_code: 200,
                    message: 'item updated successfully !',
                    data,
                })
            ));
        } catch (error) {
            return (
                error.kind === 'ObjectId'
                    ? (console.log(`item not found with id ${error}${req.body.itemId}`),
                        res.send({
                            status_code: 404,
                            message: `item not found with id ${error}${req.body.itemId}`,
                        }))
                    : console.log(`Error updating item with id ${error}${req.body.itemId}`),
                res.send({
                    status_code: 500,
                    message: `Error updating item with id ${error}${req.body.itemId}`,
                })
            );
        }
    };

    /**
     * @description delet item with id
     * @method delete is service class method
     * @param response is used to send the response
     */
     deleteItem = (req, res) => {
        try {
            const itemData = {
                itemId: req.body.itemId,
            };
            itemService.deleteItem(itemData, (error, data) => (
                error
                    ? (console.log(`item not found with id ${req.body.itemId}`),
                        res.send({
                            status_code: 200,
                            message: `item not found with id ${req.body.itemId}`,
                        }))
                    : console.log('item deleted successfully!'),
                res.send({
                    status_code: 200,
                    message: 'item deleted successfully!',
                })
            ));
        } catch (error) {
            return (
                error.kind === 'ObjectId' || error.title === 'NotFound'
                    ? (console.log(`could not found  with id${req.body.itemId}`),
                        res.send({
                            status_code: 404,
                            message: `item not found with id ${req.body.itemId}`,
                        }))
                    : console.log(`Could not item with id ${req.body.itemId}`),
                res.send({
                    status_code: 500,
                    message: `Could not delete item with id ${req.body.itemId}`,
                })
            );
        }
    }

  }
  
  module.exports = new ItemController();
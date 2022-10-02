const { addItem, getAllItems, updateItemByItemId, deleteItem } = require('./controllers/item');

class Routes {
  routeToController = (app) => {
    // Create a new item
    app.post('/add/item', addItem);
    // Retrieve all item
    app.get('/all/items', getAllItems);
    //delete item
    app.delete('/delete/item', deleteItem);
    // Update a item detail with item Id
    app.put('/update/item', updateItemByItemId);
  }
}

module.exports = new Routes();

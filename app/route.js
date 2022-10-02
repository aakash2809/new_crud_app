const { addItem,seachItem, getAllItems, updateItemByItemId, deleteItem } = require('./controllers/item');

class Routes {
  routeToController = (app) => {
    // Create a new item
    app.post('/add/item', addItem);
      // Search a new item
      app.post('/search/item', seachItem);
    // Retrieve all item
    app.get('/all/items', getAllItems);
    //delete item
    app.delete('/delete/item', deleteItem);
    // Update a item detail with item Id
    app.put('/update/item', updateItemByItemId);
  }
}

module.exports = new Routes();

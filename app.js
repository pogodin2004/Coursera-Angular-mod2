(function () {
    'use strict';

//Modules
    angular.module('ShoppingListCheckoff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.toBuyItems();

        toBuy.buyToBought = function (itemIndex) {
            ShoppingListCheckOffService.buyToBought(itemIndex);
        }
    }


    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.boughtItems();
    }


    function ShoppingListCheckOffService() {
        var service = this;
        var toBuy = [];
        var alreadyBought = [];

        service.buyToBought = function (itemIndex) {
            alreadyBought.push(toBuy[itemIndex]);
            toBuy.splice(itemIndex, 1);
        }
        service.addItem = function (itemName, itemQuantity) {
            var item = {
                name: itemName,
                quantity: itemQuantity
            }
            toBuy.push(item);
        }

        var totalItems = [
            {"name": "Cookies", "quantity": 10},
            {"name": "Chips", "quantity": 5},
            {"name": "Sprite", "quantity": 3},
            {"name": "Beer", "quantity": 50},
             {"name": "More Beer", "quantity": 50},
        ];

        for (var i = 0; i < totalItems.length; i++) {
            service.addItem(totalItems[i].name, totalItems[i].quantity);
        }

        service.toBuyItems = function () {
            return toBuy;
        }

        service.boughtItems = function () {
            return alreadyBought;
        }
    }

})();

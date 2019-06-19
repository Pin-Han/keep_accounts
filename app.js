//Budget Conteoller

var budgetController = (function () {
    var Expense = function (id, description, value) {
        console.log(this);
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Income = function (id, description, value) {
        console.log(this);
        this.id = id;
        this.description = description;
        this.value = value;
    }
    // var allExpenses = [];
    // var allIncomes = [];
    // var totalExpenses = 0;
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    return {
        addItem: function (type, des, val) {
            var newItem;
            if (type === 'exp') {
                newItem = new Expense(id, des, val);

            }
        }
    }
})();
//UI controller
var UIController = (function () {

    var DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
    };
    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDescription).value,
                value: document.querySelector(DOMstring.inputValue).value,
            }
            // var type = document.querySelector(".add__type").value;
            // // type -> will be either inc or exp 
            // var description = document.querySelector(".add__description").value;
            // var value = docutment.querySelector(".add__value").value;
        },
        getDOMstring: function () {
            //把DOMstring傳出去
            return DOMstring;
        }
    }
})();

//Global App Controller
var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstring();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                // which是對於比較舊型的brower
                ctrlAddItem();
            }
        });
    }
    var ctrlAddItem = function () {
        //1.Get the field input data

        var input = UICtrl.getinput();

        //2.Add the item to the budget controller 

        //3.Add the item to the UI

        //4.Calculate the budget

        //5.Display the budget on the UI 
    };
    return {
        init: function () {
            console.log("application has started.");
            setupEventListeners();
        }
    }



})(budgetController, UIController);

controller.init();
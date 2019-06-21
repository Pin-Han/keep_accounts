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
            var newItem, ID;
            //create new ID
            console.log(type, des, val, data.allItems);
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].ID + 1;
                console.log(ID);
            } else {
                ID = 0;
            }
            //create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            //push it into our data structure
            data.allItems[type].push(newItem);
            //return the new element
            return newItem;
        },
        tessting: function () {
            console.log(data);
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
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',

    };
    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstring.inputValue).value),
                //parsefloat 把字串變成數字
            }
            // var type = document.querySelector(".add__type").value;
            // // type -> will be either inc or exp 
            // var description = document.querySelector(".add__description").value;
            // var value = docutment.querySelector(".add__value").value;
        },
        addListItem: function (obj, type) {
            //create HTML string with placeholder text
            var html, newHtml, element;
            //如果改成雙引號 將會與class=後面的雙引號變成一對
            console.log(obj);
            if (type === 'inc') {
                element = DOMstring.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {
                element = DOMstring.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                // html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            //replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstring.inputDescription + ', ' + DOMstring.inputValue); //類似Css的選擇器
            // console.log(fields);
            //由於fields不是一個陣列 ，透過array.prototype.slice.call 轉成陣列型態
            fieldsArr = Array.prototype.slice.call(fields);
            // console.log(fieldsArr);
            fieldsArr.forEach(function (current, index, array) {
                console.log(current, current.value, index, array);
                current.value = "";
            });
            fieldsArr[0].focus(); //fieldArr[0] 為輸入描述的欄位 .focus 為focus在輸入的欄位上
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
    };
    var updatedBudget = function () {
        //1.Calculate the budget

        //2.return the budget

        //3.Display the budget on the UI 
    };
    var ctrlAddItem = function () {
        var input, newItem
        //1.Get the field input data

        input = UICtrl.getinput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //isNaN=>判斷是否不是數字 如果是數字 就是false ;不是數字回傳 true
            //2.Add the item to the budget controller 

            newItem = budgetCtrl.addItem(input.type, input.description, input.value)
            //3.Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4.Clear the fields
            UICtrl.clearFields();

            //5.Calculate update budget
            updatedBudget();
        }


    };
    return {
        init: function () {
            console.log("application has started.");
            setupEventListeners();
        }
    }



})(budgetController, UIController);

controller.init();
/**********************************************
* BUDGET CONTROLLER
**********************************************/
var budgetController = (function() {
    
    var Expense = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
        this.percent = -1;
    };
    
    Expense.prototype.calcPercentage = function(totIncome) {
        if (totIncome > 0) {
            this.percent = Math.round((this.value / totIncome) * 100);
        } else {
            this.percent = -1;
        }
    };
    
    Expense.prototype.getPercentage = function() {
        return this.percent;
    };
    
    var Income = function(id, desc, value) {
        this.id = id;
        this.desc = desc;
        this.value = value;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        
        totals: {
            exp: 0,
            inc: 0
        },
        
        budget: 0,
        
        percentage: -1
    };
    
    var calcTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(item) {
            sum += Number(item.value);
        });
        data.totals[type] = sum;
    };
    
    return {
        addItem: function(type, desc, value) {
            var newItem, ID;
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;   
            } else {
                ID = 1;
            }
            
            // Create new instance of constructor object based on Type
            if (type === 'exp') {
                newItem = new Expense(ID, desc, value);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, value);
            }
            
            // Push new object instance to data object property arrays
            data.allItems[type].push(newItem);
            
            // Return new element
            return newItem;
        },
        
        deleteItem: function(type, id) {
            var ids, index;
            
            ids = data.allItems[type].map(function(item) {
                return item.id;
            });
            
            index = ids.indexOf(id);
            
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        
        calcBudget: function() {
            // Calculate total incomes and expenses
            calcTotal('exp');
            calcTotal('inc');
            
            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // Calculate the percentage of income spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
        },
        
        calcPercentages: function() {
            data.allItems.exp.forEach(function(item) {
                item.calcPercentage(data.totals.inc); 
            });
        },
        
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(item) {
                return item.getPercentage(); 
            });
            return allPerc;
        },
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percent: data.percentage
            };
        }
    };
    
})();

/**********************************************
* UI CONTROLLER
**********************************************/
var uiController = (function() {
    
    var domStrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPerc: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
    var formatNumber = function(num, type) {
            var numSplit, int, dec;
            num = Math.abs(num);
            num = num.toFixed(2);
            numSplit = num.split('.');
            int = numSplit[0];
            if (int.length > 3) {
                int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            }
            dec = numSplit[1];
            type === 'exp' ? sign = '-' : sign = '+';
            
            return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
        };
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(domStrings.inputType).value, // selected: string
                desc: document.querySelector(domStrings.inputDesc).value, // input: string
                value: document.querySelector(domStrings.inputValue).value // input: number
            };
        },
        
        addListItem: function(obj, type) {
            var html, newHTML, element;
            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = domStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = domStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                console.log('not a recognized type value');
            }
            
            // Replace placeholder text with data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%desc%', obj.desc);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));
            
            // insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },
        
        deleteListItem: function(itemID) {
            var item = document.getElementById(itemID);   
            item.parentNode.removeChild(item);
        },
        
        clearFields: function() {
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(domStrings.inputDesc + ', ' + domStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(item, index, array) {
                item.value = "";
            });
            
            fieldsArr[0].focus();
        },
        
        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(domStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(domStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(domStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if (obj.percent > 0) {
                document.querySelector(domStrings.percentageLabel).textContent = obj.percent + '%';
            } else {
                document.querySelector(domStrings.percentageLabel).textContent = '---';
            }
        },
        
        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(domStrings.expensesPerc);
            var nodeListForEach = function(list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };
            
            nodeListForEach(fields, function(item, index) {
                if (percentages[index] > 0) {
                    item.textContent = percentages[index] + '%';
                } else {
                    item.textContent = '--';
                }
            });
        },
        
        displayMonth: function() {
            var now, month, year;
            now = new Date();
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(domStrings.dateLabel).textContent = year;
        },
        
        getDomStrings: function() {
            return domStrings;
        }
    };
    
})();

/**********************************************
* GLOBAL APP CONTROLLER
**********************************************/
var appController = (function(budgetCtrl, uiCtrl) {
    
    var setupEventListeners = function() {
        var dom = uiCtrl.getDomStrings();
        document.querySelector(dom.inputBtn).addEventListener('click', appCtrlAddItem);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                appCtrlAddItem();
            }
        });
        
        document.querySelector(dom.container).addEventListener('click', ctrlDelItem);
        
        console.log('Event Listerners activated');
    };
    
    var updateBudget = function() {
        // Calculate the budget
        budgetCtrl.calcBudget();
        
        // Return the budget
        var budget = budgetCtrl.getBudget();
        
        // Display the budget on the UI
        uiCtrl.displayBudget(budget);
    };
    
    var updatePercentages = function() {
        // Calculate percentages
        budgetCtrl.calcPercentages();
        
        // Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        
        // Update the UI with new percentages
        uiCtrl.displayPercentages(percentages);
    };
    
    var appCtrlAddItem = function() {
        var input, newItem;
        
        // Get input data
        input = uiCtrl.getInput();
        
        if (input.desc.trim() !== '' && !isNaN(input.value) && input.value > 0) {
            // Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.desc, input.value);

            // Add the item to the UI
            uiCtrl.addListItem(newItem, input.type);

            // Clear Fields
            uiCtrl.clearFields();

            // Calculate and Update Budget
            updateBudget();
            
            // Caluclate and update percentages
            updatePercentages();
        }
    };
    
    var ctrlDelItem = function(event) {
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // Delete Item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            // Delete Item from UI
            uiCtrl.deleteListItem(itemID);
            
            // Update and show new budget
            updateBudget();
            
            // Caluclate and update percentages
            updatePercentages();
        }
    };
    
    return {
        init: function() {
            console.log('application has started');
            uiCtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percent: -1
            });
            setupEventListeners();
            uiCtrl.displayMonth();
        }
    };
      
})(budgetController, uiController);

appController.init();
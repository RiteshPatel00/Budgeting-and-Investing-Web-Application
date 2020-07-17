//BUDGET MOODULE
var budgetController = (function(){

   var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
   };

   var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
   };

   var calculateTotal = function(type){

        var sum = 0;
        data.allItems[type].forEach(function(element){
            sum += element.value;
        });

        data.totals[type] = sum;


     
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
        percentageOfIncome: -1
    }




    return{
        addItem: function(type, des, val){

            var newItem, ID;

            //Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length-1].id + 1
            }
            else{
                ID = 0
            }



            //Create either and Expense or Income object
            if(type === 'exp'){
                newItem = new Expense(ID, des, val)
            }

            else if(type === 'inc'){
                newItem = new Income(ID,des, val)
            }

            //Push it into our data structure
            data.allItems[type].push(newItem);
            return newItem;

        },

        deleteItem: function(type, id) {
            
            var ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index, 1)
            }


        },

        calculateBudget: function(){

            // Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income that was spent
            if(data.totals.inc > 0){
                data.percentageOfIncome = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else{
                data.percentage = -1
            }

        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                percentage: data.percentageOfIncome
            };
        },


        testing: function(){
            console.log(data)
        }
    }





})();




//UI MODULE
var UIController = (function(){

    //In order to avoid repeating strings
    var DOMStrings = {
        inputButton: '.add__btn',
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue:'.add__value',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetValue:'.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'

    }

    return{
        getInput: function(){

            return{
                // Either Income or Expense
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },


        addListItem: function(obj, type){

            var html, newHtmlString, element;

            // 1. Create HTML string with placeholder text

            if(type === 'inc'){
                element = DOMStrings.incomeContainer
                html = `<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix">
                <div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline">
                </i></button></div></div></div>`;
            }


            else if (type === 'exp'){
                element = DOMStrings.expenseContainer
                html = `<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix">
                <div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
            }



            // 2. Then replace placeholder text with actual data
            
            newHtmlString = html.replace('%id%', obj.id)
            newHtmlString = newHtmlString.replace('%description%', obj.description)
            newHtmlString = newHtmlString.replace('%value%', obj.value)


            // 3. Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtmlString)


        },


        clearInputFields: function(){

            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + 
            DOMStrings.inputValue); 

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(current, index, array){
                current.value = "";
            });


            fieldsArray[0].focus();

        },

        displayBudget: function(obj){

            document.querySelector(DOMStrings.budgetValue).textContent = obj.budget
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalIncome
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExpenses

            if(obj.percentage > 0){
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%'
            }
            else{
                document.querySelector(DOMStrings.percentageLabel).textContent = '----'
            }


        },

        getDOMStrings: function(){
            return DOMStrings;
        }

    };

})();


//GLOBAL MODULE
var controller = (function(budget, UI){

    var setEventListeners = function(){

        var DOMStrings = UIController.getDOMStrings();

        document.querySelector(DOMStrings.inputButton).addEventListener('click', controlAddItem);

        document.addEventListener('keypress', function(event){

            if (event.keyCode === 13 || event.which === 13) {
                controlAddItem();
            }

        });

        document.querySelector(DOMStrings.container).addEventListener('click', controlDeleteItem);


    };


    var controlDeleteItem = function(event){

        var elementID, splitID, type, id;

        elementID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (elementID){

            splitID = elementID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);
            
            // Delete item from data structure
            budgetController.deleteItem(type, id);

            // Delete item from UI

            // Update and show the new budgt


        }

    };


    var updateBudget = function(){
                
        // Calculate the budget
        budgetController.calculateBudget()

        // Return the budget
        var budget = budgetController.getBudget()


        // Display the budget on UI
        UIController.displayBudget(budget)

    }



    var controlAddItem = function(){
        var input, newItem;

        // Get the field input data
        input = UI.getInput();

        // Description should not be empty and amount should be a number
        if(input.description.trim().length !== 0 && !isNaN(input.value) && input.value > 0){

            // Add the item to the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);
            
            // Add the item to the UI
            UIController.addListItem(newItem, input.type);

            // Clear the input fields
            UIController.clearInputFields();

            // Calculate and update the budget
            updateBudget();
        };

        
    };


    return {
        init: function(){
            console.log("started")
            setEventListeners();
        }
    };

})(budgetController, UIController);


controller.init();



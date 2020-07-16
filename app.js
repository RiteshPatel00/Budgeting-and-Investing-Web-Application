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



   var data = {
        allItems: {
            exp: [],
            inc: []
        },

        totals: {
            exp: 0,
            inc: 0
        }
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
        expenseContainer: '.expenses__list'
    }

    return{
        getInput: function(){

            return{
                // Either Income or Expenses
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },


        addListItem: function(obj, type){

            var html, newHtmlString, element;

            // 1. Create HTML string with placeholder text

            if(type === 'inc'){
                element = DOMStrings.incomeContainer
                html = `<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix">
                <div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline">
                </i></button></div></div></div>`;
                console.log(html)
            }


            else if (type === 'exp'){
                element = DOMStrings.expenseContainer
                html = `<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix">
                <div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`
            }



            // 2. Then replace placeholder text with actual data
            
            newHtmlString = html.replace('%id%', obj.id)
            newHtmlString = newHtmlString.replace('%description%', obj.description)
            newHtmlString = newHtmlString.replace('%value%', obj.value)


            // 3. Insert the HTML into the DOM
            console.log(typeof(newHtmlString))
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

    };





    var controlAddItem = function(){
        var input, newItem;

        // 1. Get the field input data
        input = UI.getInput();

        // 2. Add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value)
        
        // 3. Add the item to the UI
        UIController.addListItem(newItem, input.type)

        // 4. Clear the input fields
        UIController.clearInputFields();
        
        // 5. Calculate the budget 

        // 6. Display the budget on UI

        
    }

    return {
        init: function(){
            console.log("started")
            setEventListeners();
        }
    };

})(budgetController, UIController);


controller.init();
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
        inputValue:'.add__value'
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

        // 4. Calculate the budget 

        // 5. Display the budget on UI

        
    }

    return {
        init: function(){
            console.log("started")
            setEventListeners();
        }
    };

})(budgetController, UIController);


controller.init();
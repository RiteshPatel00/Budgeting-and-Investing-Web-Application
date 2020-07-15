//BUDGET MOODULE
var budgetController = (function(){

   //Code

})()



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
        // 1. Get the field input data
        var input = UI.getInput();
        console.log(input);
        console.log("working");

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget 

        // 5. Display the budget on UI

        
    }

    return {
        init: function(){
            setEventListeners();
        }
    };

})(budgetController, UIController);



controller.init();


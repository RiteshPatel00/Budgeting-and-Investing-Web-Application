//BUDGET MOODULE
var budgetController = (function(){

   //Code

})()



//UI MODULE
var UIController = (function(){

    //Code

})();

//GLOBAL MODULE
var controller = (function(budget, UI){


    var controlAddItem = function(){
        // 1. Get the field input data

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget 

        // 5. Display the budget on UI

        console.log("working")
    }


    document.querySelector('.add__btn').addEventListener('click', controlAddItem);


    document.addEventListener('keypress', function(event){

        if (event.keyCode === 13 || event.which === 13) {
            controlAddItem();
        }

    })





})(budgetController, UIController);






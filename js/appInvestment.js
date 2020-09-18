//INVESTMENT MOODULE
var investmentController = (function(){




   var data = {
        totalInvestmentValue: 0,
        totalInterest: 0
    }




    return{

        calculateTotal : function(inital, regularAddition, rate, 
                                 compoundFrequency, years){

            var inital, regularAddition, rate, compoundFrequency, years, total, monthlyContributions;

            inital = parseFloat(inital);
            regularAddition = parseFloat(regularAddition)
            rate = parseFloat(rate) / 100
            years = years

            switch(compoundFrequency){

                case "month":
                    compoundFrequency = 12
                    break;

                case "quarter":
                    compoundFrequency = 4
                    break;

                case "half-year":
                    compoundFrequency = 2
                    break;

                case "year":
                    compoundFrequency = 1
                    break;
            }


            total = inital * Math.pow((1 + (rate) / compoundFrequency), years * compoundFrequency)

            if(typeof(regularAddition) == "number" && regularAddition != 0){
                monthlyContributions = ((regularAddition * Math.pow((1 + (rate) / 12), years * 12)) - regularAddition) / ((rate) / 12)

            }

            else{
                monthlyContributions = 0;
            }
        
            data.totalInvestmentValue = total + monthlyContributions;

            var deposited = inital + (years * 12 * regularAddition)

            data.totalInterest = total + monthlyContributions - deposited;

            console.log(data.totalInterest);
            console.log(data.totalInvestmentValue);
            console.log(inital)
            console.log(regularAddition)
            console.log(rate)
            console.log(compoundFrequency)
            console.log(total)



     
   },




        getInvestment: function(){
            return {
                overall: data.totalInvestmentValue,
                interest: data.totalInterest
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
        // additionFrequency: '.add__addition',
        compoundFrequency: '.add__compounded',
        initalAmount: '.inital__investment',
        yearsToGrow: '.years__grow',
        regularAddition: '.regular__addition',
        interestRate: '.interest__rate',
        totalInvestmentLabel: '.investment__total--value',
        totalInterestAccumulatedLabel: '.investment__interest--value'


    }

    var formatNumber = function(number){

        var number, sign;

        number = Math.abs(number);
        number = number.toFixed(2);

        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        refinedNumber = numberWithCommas(number);


        return refinedNumber;


    }

    return{
        getInput: function(){

            return{

                inital: document.querySelector(DOMStrings.initalAmount).value,
                regularAddition: document.querySelector(DOMStrings.regularAddition).value,
                // additionFrequency: document.querySelector(DOMStrings.additionFrequency).value,
                rate: document.querySelector(DOMStrings.interestRate).value,
                compoundFrequency: document.querySelector(DOMStrings.compoundFrequency).value,
                years: document.querySelector(DOMStrings.yearsToGrow).value
            };
        },




        displayInvestment: function(obj){

            document.querySelector(DOMStrings.totalInvestmentLabel).textContent = formatNumber(obj.overall); 
            document.querySelector(DOMStrings.totalInterestAccumulatedLabel).textContent = formatNumber(obj.interest);


        },


        getDOMStrings: function(){
            return DOMStrings;
        }

    };

})();


//GLOBAL MODULE
var controller = (function(investment, UI){

    var setEventListeners = function(){

        var DOMStrings = UIController.getDOMStrings();

        document.querySelector(DOMStrings.inputButton).addEventListener('click', calculate);

        document.addEventListener('keypress', function(event){

            if (event.keyCode === 13 || event.which === 13) {
                calculate();
            }

        });


    };



    var calculate = function(){
        var input;

        input = UI.getInput();
                
        // Calculate the total returns
        if(input.inital > 0 && input.regularAddition >= 0 && input.regularAddition !== "" && 
            input.rate > 0 && input.years >= 1 && input.years <= 100){

            investmentController.calculateTotal(input.inital, input.regularAddition,
                                                input.rate, input.compoundFrequency, input.years)

            // Return the total
            var investment = investmentController.getInvestment()

            // Display the investment and interest earned on UI
            UIController.displayInvestment(investment)

        }


    }




    return {
        init: function(){
            setEventListeners();
        }
    };

})(investmentController, UIController);


controller.init();



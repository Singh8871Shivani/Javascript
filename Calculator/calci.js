const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let output="";
const splCharArray = ['%', '/', '*', '-', '+', '='];


// Define function to calculate based on button clicked
const calculate = (btnval) => {
    if( btnval === '=' && output != "")
    {   // if output has %, replace with /100 before evaluating
        output = eval( output.replace('%', '/100'));
    }
    else if( btnval === 'AC')
    output = "";
    else if( btnval === 'DEL')
    output = output.toString().slice(0,-1);
    else {
        // if output is empty and button is specialChars then return
        if( output === "" && splCharArray.includes(btnval) )
        return;

        output += btnval;
    }
    display.value = output;
};

// Add event listener to buttons, call calculate() on click
buttons.forEach( (button) => {
    // Button click listener calls calculate() with dataset value as argument
    button.addEventListener('click', (event) => 
    calculate(event.target.dataset.value));
}

);

const p = new Promise(function(resolve, reject) {
setTimeout( function() {
    console.log("I am inside promise");
}, 4000);
reject("Error h bhaiya")});

console.log('Pehla');

const previousOperationText = document.querySelector("#previus-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("button");

class Calculator{
    // se eu nao to maluco é o def __init__ do python, um metodo construtor
    constructor(previousOperationText, currentOperationText){
        // valores impressos na tela
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        // valores digitados no momento 
        this.currentOperation = ""  ;
    }
    // adiciona os na tela
    addDigit(digit){
        if (digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }
        this.currentOperation = digit;
        this.updateUpscreen();
    }
    // Process all calculator operations
    proceessOperation(operation){
        // Get current and previus value
        let operationValue ;
        const previous = +this.previousOperationText.innerText;
        const current = +this.currentOperation.innerText;
        switch(operation){
            case "+":
                operationValue = previous + current
                this.updateUpscreen(operationValue, operation, current, previous)

                break;
            default:
                return;
        }
    }
    // chage values of calculator screen
    updateUpscreen(operationValue = null, 
        operation = null, 
        current = null, 
        previous = null){
        console.log(operationValue, operation, current, previous)
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        } else{
            // check if value is zero
        }
        

    }

}
const calc = new Calculator(previousOperationText, currentOperationText);
//  adivando os eventos

buttons.forEach( (btn) => {
    btn.addEventListener("click", (e) => {
        // o target vai me dizer quem esta chamando o evento
        const value = e.target.innerText;
        //  o operador de mais serve para tentar conver o valor em numero
        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        }
        else{
            calc.proceessOperation(value)

        }
    })
})
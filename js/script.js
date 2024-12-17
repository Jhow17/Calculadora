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
        if (this.currentOperationText.innerText === "" && operation !== "C"){
            // Change Operation
            if(previousOperationText !== ""){
                this.changeOperation(operation);
            }
            return;
        }

        // Get current and previus value
        let operationValue ;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){

            case ":":
                operationValue = previous / current;
                this.updateUpscreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateUpscreen(operationValue, operation, current, previous);
                break;
            case "x":
                operationValue = previous * current;
                this.updateUpscreen(operationValue, operation, current, previous);
                break;
            case "+":
                operationValue = previous + current;
                this.updateUpscreen(operationValue, operation, current, previous);
                break;
            case "DEL": 
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperator();
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
            // check if value is zero if it is jus add current value
            if (previous === 0){
                operationValue = current
            }
            if (operation === "="){
                this.currentOperationText.innerText = `${operationValue}`;
                this.previousOperationText.innerText = "";
            }
            else{
            // Add current value to previus
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = '';
            }

        }

    }
    changeOperation(operation){
        const mathOperations = ["x",':','+','-']
        if(!mathOperations.includes(operation)){
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation

    }
    // delete the last digit
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }
    processClearCurrentOperation(){
        this.currentOperationText.innerText = ""
    }
    processClearOperation(){
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }
    processEqualOperator() {
        const operation = this.previousOperationText.innerText.split(" ")[1];
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;
    
        let operationValue;
    
        switch(operation) {
            case "+":
                operationValue = previous + current;
                break;
            case "-":
                operationValue = previous - current;
                break;
            case "x":
                operationValue = previous * current;
                break;
            case ":":
                operationValue = previous / current;
                break;
            default:
                return;
        }
    
        this.updateUpscreen(operationValue, "="); // Atualiza a tela com o resultado
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
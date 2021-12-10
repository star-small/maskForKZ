document.addEventListener("DOMContentLoaded", function(){
    let PhoneInputs = document.querySelectorAll("input[data-tel-input]");
    let mobileOperatorCodes = [777, 727, 700, 708, 705, 776, 701, 702, 775, 778, 707, 747, 771, 772]

    let isEqualArr = function(val, arr) {
        flag = false;
        for (i=0; i < arr.length; i++) {
            if (arr[i]==val) {
                console.log("true")
                flag = true;
                break;
            } else flag = false;
        }
        return flag;
    }

    let getInputNumberValue = function(input) {
        return input.value.replace(/\D/g, "");
    } 

    let onPhoneInput = function(event){
        let input = event.target;
        let inputNumbersValue = getInputNumberValue(input);
        let FormatedInputValue = "";
        
        if (!inputNumbersValue) {
            return input.value = "";
        }
        
        if (["7", "8"].indexOf(inputNumbersValue[0]) > -1){
            // KZ numbers
            let firstSymbol = (inputNumbersValue[0] == "7") ? "+" : "";
            if (inputNumbersValue[0] == "7" && isEqualArr(inputNumbersValue, mobileOperatorCodes)) inputNumbersValue = "7" + inputNumbersValue;
            if (inputNumbersValue[0] == "7" && inputNumbersValue.length > 3 && !isEqualArr(inputNumbersValue.slice(1, 4), mobileOperatorCodes)) inputNumbersValue = "7" + inputNumbersValue; 
            // Formating
            if (inputNumbersValue.length > 3) {
                FormatedInputValue += firstSymbol + inputNumbersValue[0] + " (" + inputNumbersValue.substring(1, 4);
                input.value = FormatedInputValue;
            } 
            if (inputNumbersValue.length >= 5) {
                FormatedInputValue += ") " + inputNumbersValue.substring(4, 7);
                input.value = FormatedInputValue;
            }
            if (inputNumbersValue.length >= 8) {
                FormatedInputValue += "-" + inputNumbersValue.substring(7, 9);
                input.value = FormatedInputValue;
            }
            if (inputNumbersValue.length >= 10) {
                FormatedInputValue += "-" + inputNumbersValue.substring(9, 11);
                input.value = FormatedInputValue;
            }
        } else {
            // Other numbers
            input.value = "+" + inputNumbersValue.substring(0, 16);
        } 
    }

    let onKeyPhoneDown = function(event) {
        let input = event.target;
        if (event.keyCode == 8 && getInputNumberValue(input).length == 1) input.value = "";
        if (event.keyCode == 8 && getInputNumberValue(input) == "7777") input.value = "";
    }

    for(i=0; i < PhoneInputs.length; i++) {
        let input = PhoneInputs[i];
        input.addEventListener("input", onPhoneInput);
        input.addEventListener("keydown", onKeyPhoneDown)
    }

});

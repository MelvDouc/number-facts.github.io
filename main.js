const fact = document.getElementById("fact"),
    factText = document.getElementById("factText"),
    numberInput = document.getElementById("numberInput");

// Old way
const getFactAjax = () => {
    let number = numberInput.value;
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://numbersapi.com/${number}`);
    xhr.onload = function() {
        if(this.status == 200 && number != "") {
            fact.classList.remove("d-none");
            factText.innerText = this.responseText;
        } else {
            fact.classList.add("d-none");
            factText.innerText = "";
        }
        // The value of an <input type='number'> is treated as an empty string if it's not a number.
        if(number == "") numberInput.value = "";
    }
    xhr.send();
}

// New way
const getFactFetch = () => {
    let number = numberInput.value;

    fetch(`http://numbersapi.com/${number}`)
    .then(response => response.text())
    .then(data => {
        if(number != "") {
            fact.classList.remove("d-none");
            factText.innerText = data;
        } else {
            fact.classList.add("d-none");
            factText.innerText = "";
            numberInput.value = "";
        }
    })
}

// numberInput.addEventListener("input", getFactAjax);
numberInput.addEventListener("input", getFactFetch);
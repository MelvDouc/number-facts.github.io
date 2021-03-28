const fact = document.getElementById("fact"),
    factText = document.getElementById("factText"),
    numberInput = document.getElementById("numberInput"),
    randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
const getFactFetch = (e) => {
    if(e.keyCode === 13) {
        let number = numberInput.value,
            categories = ["year", "math", "trivia"],
            cat = categories[randomInt(0, categories.length-1)]
        
        if(!number) {
            fact.style.display = "none";
            factText.innerText = "";
            numberInput.value = "";
            return;
        }
        fetch(`http://numbersapi.com/${number}/${cat}`)
        .then(response => response.text())
        .then(data => {
            fact.style.display = "block";
            factText.innerText = data;
        })    
    }
}

// numberInput.addEventListener("keyup", getFactAjax);
numberInput.addEventListener("keyup", getFactFetch);
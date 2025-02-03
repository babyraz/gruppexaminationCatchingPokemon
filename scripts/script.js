const log = (msg) => console.log(msg);

// I denna fil skriver ni all er kod
prepGame()

function prepGame(){
    let startClick = document.getElementById('submitBtn');
    startClick.addEventListener("click",  function(){
        validateForm()
            
    });
}


function validateForm(){
    validateName();
        
    


    //validateAge();
    //validateGender();
}


function validateName (){
    let namn = document.getElementById('nick').value.length;
    if (namn <5) {
        alert('Användarnamnet får inte understiga 5 bokstäver');
        return false;
    }
    else if(namn >10){
        alert('Användarnamnet får inte överstiga 10 bokstäver');
        return false;
    }
    else {
        return true;
    }
}
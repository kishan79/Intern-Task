let validColumnData = {
    "name": { valid: false },
    "email": { valid: false },
    "dob": { valid: false},
    "gender": { valid: false}
};
var invalidColumnCount = 4;


//validation for Name
function onBlurName(that) {
    const val = that.value;
    var val2 = val.replace(/\s+/, ' ');    // removing extra space
    var val3 = val2.trim();   // removing first and last space if availble

    if (val3.length < 3 || val3.length > 21){ 
        document.getElementById('nameerror').innerHTML="Length Should be between 3 to 20 letters";
        document.getElementById('nameerror').style.display="block";
        validColumnData['name'].valid = false

    }else  if (!(/^[a-zA-Z ]+$/).test(val3)) {
        
        document.getElementById('nameerror').innerHTML="Invalid Character";
        document.getElementById('nameerror').style.display="block";
        validColumnData['name'].valid = false
    }else{
        document.getElementById('nameerror').innerHTML="";
        document.getElementById('nameerror').style.display="none";
        validColumnData['name'].valid = true;
    }
    computerValidColumnCount();
}

//validation for Phone Number
function onBlurMobile(that) {
    const val = that.value;
    if ((/^([6-9])([0-9]){9}$/).test(val)) {
        document.getElementById('phoneerror').innerHTML="";
        document.getElementById('phoneerror').style.display="none";
    }else if(!val){
        document.getElementById('phoneerror').innerHTML="";
        document.getElementById('phoneerror').style.display="none";
    }else{
        document.getElementById('phoneerror').innerHTML="Invalid Phone Number";
        document.getElementById('phoneerror').style.display="block";
    }
}


//validation for Email
function onBlurEmail(that) {
    const val = that.value;
    if ((/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(val)){
        document.getElementById('emailerror').innerHTML = "";
        document.getElementById('emailerror').style.display="none";
        validColumnData['email'].valid = true;
    }else{
        validColumnData['email'].valid = false;
        document.getElementById('emailerror').innerHTML = "Invalid Email";
        document.getElementById('emailerror').style.display="block";
    }
    computerValidColumnCount();
}


//validation for Bio
function onBlurBio(that){
    const val = that.value;
    var num = val.split(/\s+/).length;
    if(num>61){      //bio should not be of more than 60 words

        document.getElementById('bioerror').innerHTML = "Should not contain more than 60 words";
        document.getElementById('bioerror').style.display="block";
        document.getElementById('submitbtn').disabled = true;
    }else{
        document.getElementById('bioerror').innerHTML = "";
        document.getElementById('bioerror').style.display="none";
    }
}


//validation for Date of Birth
function onBlurdob(that){
    const val = that.value;
    if(!val){
        validColumnData['dob'].valid = false;
    }else{
        validColumnData['dob'].valid = true;
    }
    computerValidColumnCount();
}


//validation for Gender
function onBlurGender(that){
    if(document.getElementById('male').checked || document.getElementById('female').checked){
        validColumnData['gender'].valid = true;
    }
    computerValidColumnCount();
}

//counting no of invalid fields in form
function computerValidColumnCount(){
    var invalid = 0;
    for(var a in validColumnData )
        if(!validColumnData[a].valid) 
            invalid++;   
    invalidColumnCount = invalid;
}

//evaluating the encounted errors
function onValidInputEnableButton(that,columnName){
    if(invalidColumnCount < 1) return;
    else {
        computerValidColumnCount();
        if(columnName == 'name'){
            onBlurName(that);
        }else if(columnName == 'email'){
            onBlurEmail(that);
        }else if(columnName == 'dob'){
            onBlurdob(that);
        }else if(columnName == 'gender'){
            onBlurGender(that);
        }

    
        //if validation in all the field is true then submit button is enabled
        if(invalidColumnCount == 0){
            document.getElementById('submitbtn').disabled = false;
        }
        
    }
}


document.getElementById('myForm').addEventListener('submit', saveData);

//getting the data from the form and storing it to localstorage
function saveData(e) {

    var nameval = document.getElementById('name').value;
    var phoneval = document.getElementById('phone').value;
    var emailval = document.getElementById('email').value;
    var bioval = document.getElementById('bio').value;
    var dobval = document.getElementById('dob').value;
    var genderval;

    if (document.getElementById('male').checked) {
        genderval = document.getElementById('male').value;
    }
    else if (document.getElementById('female').checked) {
        genderval = document.getElementById('female').value;
    }

    var info = {
        name: nameval,
        phone: phoneval,
        email: emailval,
        bio: bioval,
        dob: dobval,
        gender: genderval
    }

    if (localStorage.getItem('inform') === null) {
        var inform = [];
        inform.push(info);
        localStorage.setItem('inform', JSON.stringify(inform));
        
    } else {

        var inform = JSON.parse(localStorage.getItem('inform'));

        inform.push(info);
        localStorage.setItem('inform', JSON.stringify(inform));
        
    }
    location.reload(true);

    fetchData();

    e.preventDefault();
}


//fetching the stored data from the localstorage and displaying it 
function fetchData() {

    var inform = JSON.parse(localStorage.getItem('inform'));

    var informOutputs = document.getElementById('informOutput');

    informOutputs.innerHTML = '';
    for (var i = 0; i < inform.length; i++) {
        var name = inform[i].name;
        var phone = inform[i].phone;
        var email = inform[i].email;
        var bio = inform[i].bio;
        var dob = inform[i].dob;
        var gender = inform[i].gender;

        informOutputs.innerHTML += 
        `<div class="card card-body bg-light my-2">
            <p class="my-0"><b>Name:</b> ${name} </p>
            <p class="my-0"><b>Phone:</b>  ${phone} </p>
            <p class="my-0"><b>Email:</b>  ${email} </p>
            <p class="my-0"><b>Bio:</b>  ${bio} </p>
            <p class="my-0"><b>Date of Birth:</b> ${dob} </p>
            <p class="my-0"><b>Gender: </b> ${gender} </p>
        </div>`;

    }

}



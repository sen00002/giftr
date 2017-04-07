'use strict';
// It will prevent or throw  errors, when relatively
var pplList = new Array();
// new variable created as it can hold more than one value at a time
var ideaList = new Array();
// new variable created as it can hold more than one value at a time
var navigatePerson;
// Variable created
var giftList;
// another variable created
var localStorageKey = "giftr-sen00002";
// key used for the single localStorage Object
document.addEventListener('deviceready', onDeviceReady);

window.addEventListener('push', function(ev){
    // a window created and a function is added 
    let contentDiv = ev.currentTarget.document.querySelector(".content")
    // content class is targeted for this content
    let id = contentDiv.id;
    console.log("Content Div ID " + id);
    
    // Switch statement is used to know on which page the user is
    switch(id){
        case "index":
            // index page is there
            let buttonSave = document.getElementById("savebtn");
            // creating a button which will call the data by Id and will a save button is created
            buttonSave.addEventListener("click", savePerson);
            //by clicking the button it will save the identity of the person
            console.log("Clicked Save Button" + buttonSave);
            //It will display the that the button is clicked
            
            let cancelButton = document.getElementById("cancelbtn");
            //cancel button is created to cancel all the data which is called
            cancelButton.addEventListener("click", cancelModal);
            // by clicking on the button it will cancel the modal which is created
            console.log("Clicked Cancel Button" + cancelButton);
            // Display all the list of the Poeple
            displayPeopleList();
            // then it will display back the list of all the people on the index menu
            break;
            // it will halt keep the screen there only
            
        case "gifts":
            // now the case will be gifts
            let saveGifts = document.getElementById("saveGiftButton");
            // new button is created to save gifts and will call the data saved by Id
            saveGifts.addEventListener("click", saveGift);
            //it will save gifts by clicking on it
            console.log("Save Gift button is clicked " + saveGifts);
            //It will dislay if the gift is saved in console panel
            
            let cancelGifts = document.getElementById("cancelGiftButton");
            //This button will cancel the gifts data 
            cancelGifts.addEventListener("click", cancelGiftModal);
            //it will cancel the gift modal which is created
            determinePerson();
            //will save the data of a person which is cancelled
            break;
            // If nothing happenes from above switch statement then display list of people
        default:
            displayPeopleList();
            //it will display the list of people
    }
    
});

function onDeviceReady(){
    // a new function created
     let buttonSave = document.getElementById("savebtn");
    // creating a savebutton and we will get the data by id
            buttonSave.addEventListener("click", savePerson);
    //saving a button by attaching a handler with the help of addeventlistener
            console.log("Clicked Save Button" + buttonSave);
    //console.log will help us in Writing into the browser console and will display in browser
            
    let cancelButton = document.getElementById("cancelbtn");
    //The getElementById() method returns the element that has the ID attribute with the specified value
            cancelButton.addEventListener("click", cancelModal);
    //cancel button is attached to the file if it is clicked it will cancel the modal
            console.log("Clicked Cancel Button" + cancelButton);
            // Display all the list of the Poeple
            displayPeopleList();
}



// a new function is created to save a person details

function savePerson(){
    // a save function is created
    let saveName = document.getElementById("nameField").value;
    //it will return the specified value which is entered in the nameField
    console.log("Save Name " + saveName);
    //It will display that the name is saved in browser console
    
    let saveDate = document.getElementById("dateField").value;
    //It will return the specified date entered
    console.log("Date Saved " + saveDate);
    // It will help displaying in console window of the browser
    
    if(navigatePerson == 0){
        // if condition is created it will be applicable on the person using it
        let currentTime = new Date().getTime / 1000;
        // by this we will get new date and get time in seconds as 1s = 1000ms, usually it is in milliseconds
        console.log("Current Time is " + currentTime);
        //it will display current dare and time in console window
        
        let person = {
            // new object is created
            id: currentTime,
            // it will get the current time by id 
            name: saveName,
            // it will display the name we entered
            dob: saveDate,
            // it will display the saved date on dob
            ideas: new Array()
            // it will display the idea entered as an array
        };
        
        pplList.push(person);
        // it will add the list of people in end of the array
  }
    else{
       for(let i = 0; i < pplList.length; i++){
           if(pplList[i].id == navigatePerson){
               pplList[i].name = saveName;
               pplList[i].dob = saveDate;
               
           }// YEH SAMJH NHI AAYA**********************************************
       }
    }
    
    navigatePerson = 0;
    // will atrget current person
    setLocalStorage();
    // setting local storage 
    cancelModal();
    //will cancel the modal
    displayPeopleList();
    //display the list of the people
 }

function displayPeopleList(){
    // a new function is created which will show the list of th people
    getLocalStorage();
    // it will store the data in local storage
    
    let list = document.getElementById("contact-list");
    // the list will be shown up as the names we have entered
    list.innerHTML = "";
    //It will return the html data
    console.log("The list of contact is " + list);
    // it will display the data in the console window of the browser 
    
    for(let i = 0; i < pplList.length; i++){
        // a for loop is created by which the length of the list will be increased
        let li = document.createElement("li");
        // the create element will create an exact node 
        li.className = "table-view-cell";
        //the list of the class will be named as table-view-cell
        li.setAttribute("dataId", pplList[i].id);
        //The setAttribute() method adds the specified attribute to an element, and gives it the specified value if it already exists it will change the value
        console.log("li " + li);
        // console will display all the data 
        
        let span = document.createElement("span");
        //The <span> tag is used to group inline-elements in a document.
        span.className = "name";
        //This will return an Array of all the elements with that classname.
        
        let listName = document.createElement("a");
        //  it will create an element in the document and store it in "a"
        listName.textContent = pplList[i].name;
        // It will display the name of the pople in the list
        listName.href = "#personModal"
        //it will link the names in the list with #personal modal
        console.log("Name " + listName);
        // it will display in the browser window of the console under list name
        listName.setAttribute("data-name", pplList[i].name);
        // it will set the attribute and display as an html content
        listName.setAttribute("data-dob", pplList[i].dob);
        // it will display the data of dob as an html content in the list
        
        let spanDate = document.createElement("span");
        // the date will come inline in the document
        spanDate.className = "dob";
        // it will display the date with the names which will displayed un the same line
        spanDate.textContent = moment(pplList[i].dob).format("MMMM DD");
        // it will display the date in the list and date will be formated as above written
        
        let listDate = document.createElement("a");
        // it will create an element with the specified name listDate
        listDate.className = "navigate-right pull-right";
        //the date will be displayed to the right side of the screen
        listDate.href = "gifts.html";
        //the date will be linked the page to gifts.html
        
        span.appendChild(listName);
        //it will move it's current postion the new postion
        listDate.appendChild(spanDate);
        // Appened Name
        li.appendChild(span);
        // Appened Date
        li.appendChild(listDate);
        //it will mark the date as a child tag
        list.appendChild(li);
        //it will take it from the parent chlid
        console.log
        listName.addEventListener("touchstart", editButton);
        listDate.addEventListener("touchstart", pageSwitch);
        // all the data will be displayed in the console window of the browser and it will allow to make changes in the data and we would be able to change the page 
    }
}

function setLocalStorage(){
    // function local storage is being set
    console.log("The key is " + localStorageKey);
    // it will display the key of local storage in the console window
    localStorage.setItem(localStorageKey, JSON.stringify(pplList));
    // it will set items in local storage and will convert into human readable form
    console.log("People are set in the localStorage");
    // it will display that people are successfully added to the local storage
}
function getLocalStorage(){
    // we will take data from local storage with the help of this function
    console.log("The key is " + localStorageKey);
    //again it will display the local storage key
    let getItem = localStorage.getItem(localStorageKey);
    // we would be able to store in the local storage key
    console.log("Get " + getItem);
    // it will display as the item is being taken
    pplList = JSON.parse(getItem);
    //it will become a javascript object
    console.log("List of People from LocalStorage " + pplList);
    // it will display the list of the people in the console window
}
function cancelModal(){
    // it will cancel the modal which is created
      var end = new CustomEvent('touchend', {
          // end variable will cancel the event which is created
        bubbles: true,
        cancelable: true
          // yeh nhi samjh laga****************************************
    });
    console.log("End " + end);
    //it will display that it has beem cancelled in the console window
    var dispatchEvent = document.querySelector("a#xButton");
    //The querySelector() method only returns the first element that matches the specified selectors and make it separate from the main event
    dispatchEvent.dispatchEvent(end);
    // it will end the event and make it separated
    console.log("Dispatch Event" + dispatchEvent);
    // it will display in the console window of the browser
}


function editButton(ev){
   //Edit Person 

   navigatePerson = ev.target.parentElement.parentElement.attributes.dataId.nodeValue;
    // it will target the current person and it will call the data by values
    console.log("Edit Person " + navigatePerson);
    // it will display all the data in thre console window of the browser
    document.getElementById("nameField").value = ev.target.dataset.name;
    //it will change the name entered of the data of the person which we have opened
    document.getElementById("dateField").value = ev.target.dataset.dob;
    // we would be able to chnage the date
}
function pageSwitch(ev){
    // funtion switch will help in chnaging the pages
    console.dir(ev);
    // at first it will take a copy the object before logging it as they are potentially same
    giftList = ev.target.parentElement.attributes.dataId.nodeValue;
    //It will target the gift list and call the data by Id
}
function determinePerson(){
    // it will help in the list of the people 
    for(var i = 0; i < pplList.length; i++){
        if(giftList == pplList[i].id){
            ideaList = pplList[i].ideas;
            console.log("List of Idea " + ideaList);
            // yeh samjh nhi aaya**********************************************
            
            document.getElementById("addName").textContent = pplList[i].name;
            document.getElementById("giftTitle").textContent = 
                pplList[i].name;
            console.log("Title " + pplList[i].name);
            break;
        }
    }
    displayGiftList();
}
function saveGift(){
    let savedGifts = document.getElementById("giftField").value;
    // value that we entered in the gift field will be stored in the gift field
    console.log("Save gifts " + savedGifts);
    let savedStore = document.getElementById("storeField").value;
    // same with store
    console.log("Saved Store " + savedStore);
    let savedUrl = document.getElementById("urlField").value;
    // same with url
    console.log("Saved URL " + savedUrl);
    let costSaved = document.getElementById("costField").value;
    // same with the cost
    console.log("Cost Saved " + costSaved);
    
    let currentTime = new Date().getDate() / 1000;
    
    let giftIdea = {
        idea: savedGifts,
        at: savedStore,
        url: savedUrl,
        cost: costSaved,
        id: currentTime
    }
    console.log("Gift Idea " + giftIdea);
    
    ideaList.push(giftIdea);
    console.log("List of Ideas " + ideaList);
    
    saveToContact();
    document.getElementById("giftField").value = "";
    document.getElementById("storeField").value = "";
    document.getElementById("urlField").value = "";
    document.getElementById("costField").value = "";
    
   cancelGiftModal();
    
    displayGiftList();
}
function displayGiftList(){
    let listOfGift = document.getElementById("gift-list");
    listOfGift.innerHTML = "";
    
    for(var i = 0; i < ideaList.length;i++){
        let li = document.createElement("li");
        li.className = "table-view-cell media";
        li.setAttribute("dataId", ideaList[i].id);
        console.log("Li" + li);
        let span = document.createElement("span");
        span.className = "pull-right icon icon-trash midline";
        console.log("Trash Icon " + span);
        let div = document.createElement("div");
        div.className = "media-body";
        div.textContent = ideaList[i].idea;
        
        
        if(ideaList[i].at != ""){
            let location = document.createElement("p");
            location.textContent = ideaList[i].at;
            div.appendChild(location);
            console.log("Location " + location.textContent);
        }
        if(ideaList[i].url != ""){
            let url = document.createElement("p");
            url.textContent = ideaList[i].url;
            div.appendChild(url);
            console.log("URL " + url.textContent)
        }
        if(ideaList[i].url != ""){
            let cost = document.createElement("p");
            cost.textContent = ideaList[i].cost;
            div.appendChild(cost);
        }
        li.appendChild(span);
        li.appendChild(div);
        listOfGift.appendChild(li);
        
    }
}
function cancelGiftModal(){
    var end = new CustomEvent('touchend', {
        bubbles: true,
        cancelable: true
    });
    console.log("End " + end);
    var dispatchEvent = document.querySelector("a#xGiftButton");
    dispatchEvent.dispatchEvent(end);
    console.log("Dispatch Event" + dispatchEvent);
}
function saveToContact(){
    for(var i = 0; i < pplList.length; i++){
        if(giftList == pplList[i].id){
            console.log("People List " + pplList[i].id);
            pplList[i].ideas = ideaList;
             console.log("People List " + pplList[i].id);
            console.log("The length " + pplList.length);
        }
    }
    setLocalStorage();
}






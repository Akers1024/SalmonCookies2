'use strict'

var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];


var salmonCookieTable = document.getElementById("Monster");
var newStoreForm = document.getElementById("Mash");
var cookiesSoldEachHour = [];
var cookieShops = [];
var totalCookiesPerHour = [];


function Salmon(location, minCrust, maxCrust, avgCookies) {  //making contructor function 
  this.location = location;       
  this.minCrust = minCrust;
  this.maxCrust = maxCrust;
  this.avgCookies = avgCookies;
  this.customersEachHour = [];
  this.totalCookiesPerDay = 0;

  this.calcCustomersEachHour = function() {
    for(var i = 0; i < hours.length; i++) {
      this.customersEachHour.push((Math.random() * (this.maxCrust - this.minCrust + 1)) + this.minCrust);
    }
  };

  this.cookiesSoldEachHour = [];               //Math Being MADE!!!  
  this.calcCookiesSoldEachHour = function() {
    this.calcCustomersEachHour();
    for(var i = 0; i < hours.length; i++) {
      this.cookiesSoldEachHour.push(Math.ceil(this.customersEachHour[i] * this.avgCookies));  // ceil function returns the smallest integer greater than or equal to a given number.
      this.totalCookiesPerDay += this.cookiesSoldEachHour[i];  //adding all random numbers together.

      //console.log(this.totalCookiesPerDay, ': cookie tots');
    }
  };

  //this.totalCookiesPerDay = 0;
  cookieShops.unshift(this);

  this.render = function() {    //creating  render function 
    var trEl = document.createElement('tr');   //creating table row 
    var tdEl = document.createElement('td');   //creating table data
    tdEl.textContent = this.location;      // telling what to data to put in the rows
    trEl.appendChild(tdEl);                   //putting that data in the table Row (tr)
    for(var i = 0; i < hours.length; i++) {   //Making a for loop on hows many times to go through
      tdEl = document.createElement('td');    //creating table data 
      tdEl.textContent = this.cookiesSoldEachHour[i];  // adding the math to the table 
      trEl.appendChild(tdEl);                           //telling where to put the math 
    }
    tdEl = document.createElement('td');           //creating table data 
    tdEl.textContent = this.totalCookiesPerDay;    //adding the 
    trEl.appendChild(tdEl);                         //telling where I want data
    salmonCookieTable.appendChild(trEl);             //Te;iing where i want data 
  };
  this.calcCookiesSoldEachHour();                    //calling function 
  
};


/*new Salmon('1st and Pike', 23, 65, 6.3);   //creating new data for contructor function on line 13. this will make the rows
new Salmon('SeaTac', 3, 24, 1.2);
new Salmon('Seattle Center', 11, 24, 3.7);
new Salmon('Capitol Hill', 20, 38, 2.3);
new Salmon('Alki', 2, 16, 4.6);
*/


function makeHeaderRow() {             //creating header function   
  var trEl = document.createElement('tr');   //creating table row 
  var thEl = document.createElement('th');   //creating table header
  thEl.textContent = '';                     // telling what to add the that cell
  trEl.appendChild(thEl);                    //putting it in the first cell of header/

  for(var i = 0; i < hours.length; i++) {  //creating for loop for hours opened on header telling how many times to make 
    thEl = document.createElement('th');      //creating table header
    thEl.textContent = hours[i];   //telling what data to put in table header (takes date from array 'hours' line 4)
    trEl.appendChild(thEl);          //puts data in table header
  }
  thEl = document.createElement('th');      //create new header
  thEl.textContent = 'Daily Location Totals';  // Telling what data I want in that cell
  trEl.appendChild(thEl);                     //puting that data in the cell


  salmonCookieTable.appendChild(trEl);                //telling where to put this data this case its the table monster in html

}

function renderTable() {
  makeHeaderRow();

  for(var i = 0; i < cookieShops.length; i++) {
    cookieShops[i].render();
  }
  makeFooterRow();
}




//function salmonRows() {               
//   for(var i = 0; i < cookieShops.length; i++) {    //looping through the array letting how amytimes to create rows
//     cookieShops[i].render();            //
//   }
// };

//makeHeaderRow();                //calling header
//salmonRows();  //calling rows

function submitForm(event){
  event.preventDefault();
  var locationNames = event.target.location.value;
  var minCust = parseInt(event.target.minCrust.value);
  var maxCust = parseInt(event.target.maxCrust.value);
  var avgCookie = parseInt(event.target.avgCookies.value);
  
 var newSalmonShop = new Salmon (locationNames, minCust, maxCust, avgCookie);

 event.target.location.value = null;
 event.target.minCrust.value = null;
 event.target.maxCrust.value = null;
 event.target.avgCookies.value = null;

document.getElementById('footer').remove();
newSalmonShop.render();
makeFooterRow();
  //cookieShops[cookieShops.length - 1].render();
};

//newStoreForm.addEventListener('submit', submitForm);




function makeFooterRow(){     /// nested FOR loop
  var total = 0;  //make so this doesnt keep going 
  var allTotal = 0;
  var trEl = document.createElement('tr');  //creating table row 
  var tdEl = document.createElement('td');   
  tdEl.textContent = 'Total For All Locations';
  var trEl = document.createElement('tr');
  trEl.setAttribute('id', 'footer');
  trEl.appendChild(tdEl);
  for(var i = 0; i < hours.length; i++){  //loop over all cells 
    //console.log(total);
    for(var j = 0; j < cookieShops.length; j++){   //loop over cookie shops
      total += cookieShops[j].cookiesSoldEachHour[i];   //+= making new value
      //console.log(total);
    }
    tdEl = document.createElement('td');
    tdEl.textContent = total;
    trEl.appendChild(tdEl);
    allTotal += total;
    total = 0;
  }
  tdEl = document.createElement('td');
  tdEl.textContent = allTotal;
  trEl.appendChild(tdEl);


  salmonCookieTable.appendChild(trEl);
};




new Salmon('1st and Pike', 23, 65, 6.3);   //creating new data for contructor function on line 13. this will make the rows
new Salmon('SeaTac', 3, 24, 1.2);
new Salmon('Seattle Center', 11, 24, 3.7);
new Salmon('Capitol Hill', 20, 38, 2.3);
new Salmon('Alki', 2, 16, 4.6);


renderTable();
//makeFooterRow();
newStoreForm.addEventListener('submit', submitForm);

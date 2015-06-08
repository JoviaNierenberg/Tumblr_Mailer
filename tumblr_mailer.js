var fs = require('fs');
var ejs = require('ejs');

var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync('email_template.ejs', 'utf8');

// create csv parse function
function csvParse(inputCsv) {
	var arr = inputCsv.split("\n");
	var columns = arr.shift().split(","); // has value firstName,lastName,numMonthsSinceContact,emailAddress
	var csv_data = []
	// create contact template
	var contactTemplate = {};
	var val = "";
	for (var i = 0; i < columns.length; i++) {
		val = columns[i]
		contactTemplate[val] = "";
	};

	// make each contact into an object and push to csv_data array
	arr.forEach(function(eachContact){
		var eachContact = eachContact.split(",");
		var contactObj = {};
		for (var i = 0; i < eachContact.length; i++) {
			contactObj[contactTemplate[i]] = eachContact[i];
		}
		csv_data.push(eachContact);
	})
	return csv_data;	
}

var friendList = csvParse(csvFile);

friendList.forEach(function(row){

    var firstName = row["firstName"];
    var numMonthsSinceContact = row["numMonthsSinceContact"];
    var customizedTemplate = ejs.render(emailTemplate, { firstName: firstName,  
                  numMonthsSinceContact: numMonthsSinceContact
                });

    // we make a copy of the emailTemplate variable to a new variable to ensure
       // we don't edit the original template text since we'll need to us it for 
       // multiple emails

    // var templateCopy = emailTemplate;

    // // use .replace to replace FIRST_NAME and NUM_MONTHS_SINCE_CONTACT with firstName and  monthsSinceLastContact  
    // templateCopy = templateCopy.replace(/FIRST_NAME/gi,
    // firstName).replace(/NUM_MONTHS_SINCE_CONTACT/gi, numMonthsSinceContact);

    console.log(customizedTemplate);


})

csvParse(csvFile);
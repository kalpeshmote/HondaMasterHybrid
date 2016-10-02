

//this function is used to check if input is empty or not
function isEmpty(val){
	return !val;
}

function createUuid()
{
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 32; i++){
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;

}

function sendEmail(){
	var toAddress="anjali.gupta@lntinfotech.com";
//	krithikav@lntecc.com
//	karan.balkar@gmail.com

	var path2 = "/sdcard/attachment.txt";
	var attachments = [path2];
	var attachmentsData=[['file1','data1']];

	window.plugins.emailComposer.showEmailComposerWithCallback(function(result){
		console.log("Email result"+result);},"DPR App","",[toAddress],[],[],false,attachments,attachmentsData);

//	window.plugins.emailComposer.showEmailComposerWithCallback(function(result){console.log(result);},"DPR App",data,[toAddress],[],[],false,false,false);
}


function writeJsonFile(data){

//	write to sd card
	var fileName = 'attachment.txt';    // your file name         
	window.resolveLocalFileSystemURL( cordova.file.externalRootDirectory, function( directoryEntry ) {
		directoryEntry.getFile(fileName, { create: true }, function( fileEntry ) {
			fileEntry.createWriter( function( fileWriter ) {
				fileWriter.onwriteend = function( result ) {
					console.log( 'done writing file...........' );
					sendEmail();
				};
				fileWriter.onerror = function( error ) {
					console.log( error );
				};
				fileWriter.write( data );
			}, function( error ) { console.log( error ); } );
		}, function( error ) { console.log( error ); } );
	}, function( error ) { console.log( error ); } );
}

function isWhole(n) {
	return /^\d+$/.test(n);
}


Array.prototype.contains = function(v) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] === v) return true;
	}
	return false;
};

Array.prototype.removeValue = function(name, value){
	var array = $.map(this, function(v,i){
		return v[name] === value ? null : v;
	});
	this.length = 0; //clear original array
	this.push.apply(this, array); //push all elements except the one we want to delete
}



function collectDataFromGrid(){

	if(isFormUpdate){

		var selectedGridvalue=$("#GridID").val().replace(/["']/g, "");

		for(var l=0;l<checkedActivitiesArray.length;l++){
			
			var sectionIDToShow="Section"+checkedActivitiesArray[l]+"Grid"+selectedGridvalue;

			/*$('#'+sectionIDToShow+' input#DateID').each(function() {
				arrDates.push($(this).val());
			});*/

			$('#'+sectionIDToShow+' input#QuantityID').each(function() {
				arrQuantities.push($(this).val());
			});

			$('#'+sectionIDToShow+' textarea#RemarksID').each(function() {
				arrRemarks.push($(this).val());
			});

			$('#'+sectionIDToShow+' input#ManpowerID').each(function() {
				arrManpower.push($(this).val());
			});

			$('#'+sectionIDToShow+' span#UnitOfMeasurementID').each(function() {
				arrUnitOfMeasurements.push($(this).html());
			});
		}

	}else{
		
		/*$('input#DateID').each(function() {
			arrDates.push($(this).val());
		});*/


		$('input#QuantityID').each(function() {
			arrQuantities.push($(this).val());
		});

		$('textarea#RemarksID').each(function() {
			arrRemarks.push($(this).val());
		});

		$('input#ManpowerID').each(function() {
			arrManpower.push($(this).val());
		});

		$('span#UnitOfMeasurementID').each(function() {
			arrUnitOfMeasurements.push($(this).html());
		});

	}




	var selectedGrid =$("#GridID").val().replace(/["']/g, "");

	var rccTypeDropdwn;
	//if(isFormUpdate){
	rccTypeDropdwn = $("#SelectRCCTypeID option:selected").val();

	if(rccTypeDropdwn == undefined){
		rccTypeDropdwn = $("#RCCTypeID option:selected").val();
	}
	//}else{
	// rccTypeDropdwn = $("#SelectRCCTypeID option:selected").val();
	//}


	var length;
	var finalObj = {};
	//alert("collection emailDataArr"+JSON.stringify(emailDataArr));
	if(isFormUpdate){

		//update form
		if(emailDataArr!=undefined && emailDataArr.length > 0){
			for(var i=0;i < emailDataArr.length;i++){
				var gridNameWithoutQuotes = emailDataArr[i].Grid.replace(/["']/g, "");
				if(gridNameWithoutQuotes == selectedGrid){
					emailDataArr.splice(i, 1);	
					//alert("splice called");
					break;
				}
			}
		}

		
		
		//length=checkedActivitiesArray.length;
		length= $('#myCarouselGrid .item').length;	
		//alert("length "+length);
		gridArray=[];
		for(var i=0;i < length-1;i++ ){
			var dataObj = {};
			//if(gridArray.length > 0 ){
			//alert("value of i"+i);
			//alert(JSON.stringify(gridArray) + "checkedActivitiesArray"+checkedActivitiesArray);
			//alert("index "+JSON.stringify(gridArray[gridArray.length-1]) + " " +checkedActivitiesArray[i-1]);

			/*if(gridArray[gridArray.length-1].Activities.indexOf(checkedActivitiesArray[i-1]) > -1){
					alert("called" +gridArray);
					findAndRemove(gridArray, 'Activities', checkedActivitiesArray[i-1]);
				}
				dataObj["Activities"]= checkedActivitiesArray[i-1];
				dataObj["Quantity"] = arrQuantities[i-1];
				dataObj["Remarks"] = arrRemarks[i-1];
				dataObj["Manpower"] = arrManpower[i-1];
				dataObj["UnitOfMeasurement"] = arrUnitOfMeasurements[i-1];  
				if(checkedActivitiesArray[i-1]=='RCC'){
					dataObj["RCC"]=rccTypeDropdwn;          
				}


				gridArray.push(dataObj);*/



			//}else{
			//alert('#Section'+checkedActivitiesArray[i]);
			var value =$('div#Section'+checkedActivitiesArray[i]).text();
			//var value=$('div#gridnumID').text();
			//var gridvalue=$("#GridID option:selected").val();
			dataObj["Grid"]= selectedGrid.replace(/["']/g, "");  //gridvalue;
			dataObj["Activities"]= checkedActivitiesArray[i];
			//alert("checkedActivitiesArray "+checkedActivitiesArray[i]+" Quantity "+ arrQuantities[i]);
			dataObj["Quantity"] = arrQuantities[i]+" "+arrUnitOfMeasurements[i];
			dataObj["Remarks"] = arrRemarks[i];
			dataObj["Manpower"] = arrManpower[i];
			if(checkedActivitiesArray[i]=='RCC'){
				dataObj["RCC"]=rccTypeDropdwn;          
			}
			gridArray.push(dataObj);
			gridArray = arrUnique(gridArray);
			//}

		}

		//alert("final" +JSON.stringify(gridArray));


	}
	else{

		//new form
		length= $('#myCarousel .item').length;

		gridArray=[];
		
		//alert("before email data array"+JSON.stringify(emailDataArr) + "length" +emailDataArr.length+ "selectedGrid"+selectedGrid);
		if(emailDataArr!=undefined && emailDataArr.length > 0 && emailDataArr[emailDataArr.length-1].Grid == selectedGrid){
			
			//alert("called splice");
			var index = emailDataArr.indexOf(emailDataArr[emailDataArr.length-1]);
			emailDataArr.splice(index, 1);		
		}
		
		//alert("after splice"+JSON.stringify(emailDataArr) + "length" +emailDataArr.length);
		
		for(var i=0;i < length-1;i++ ){
			var dataObj={}; 
			//alert(JSON.stringify(checkedActivitiesArray));
			
			dataObj["Grid"]= selectedGrid.replace(/["']/g, "");  //gridvalue;
			dataObj["Activities"]= checkedActivitiesArray[i];
			dataObj["Quantity"] = arrQuantities[i]+" "+arrUnitOfMeasurements[i];
			dataObj["Remarks"] = arrRemarks[i];
			dataObj["Manpower"] = arrManpower[i];
			if(checkedActivitiesArray[i]=='RCC')
			{
				dataObj["RCC"]=rccTypeDropdwn;

			}

			gridArray.push(dataObj);

		}

	


	}

	//alert("length of sections:"+length);
	//alert("number of activities" +checkedActivitiesArray.length);
	//alert("inside collect checkedActivitiesArray" +JSON.stringify(checkedActivitiesArray));

	/*for(var i=0;i < length-1;i++ ){
		if(isFormUpdate){
			alert("grid array" +JSON.stringify(gridArray) + "checkedActivitiesArray" +checkedActivitiesArray);
			var dataObj = {};
			if(gridArray.length > 0 ){
				alert("value of i"+i);
				alert(JSON.stringify(gridArray[gridArray.length-1]['Activities'])+" index "+gridArray[gridArray.length-1].Activities.indexOf(checkedActivitiesArray[i-1]));
				if(gridArray[gridArray.length-1].Activities.indexOf(checkedActivitiesArray[i-1]) > -1){
					//alert("called" +gridArray);
					findAndRemove(gridArray, 'Activities', checkedActivitiesArray[i-1]);

				}
				dataObj["Activities"]= checkedActivitiesArray[i-1];
				dataObj["Quantity"] = arrQuantities[i-1];
				dataObj["Remarks"] = arrRemarks[i-1];
				dataObj["Manpower"] = arrManpower[i-1];
				dataObj["UnitOfMeasurement"] = arrUnitOfMeasurements[i-1];  
				if(checkedActivitiesArray[i-1]=='RCC'){
					dataObj["RCC"]=rccTypeDropdwn;          
				}
				gridArray.push(dataObj);
			}else{
				dataObj["Activities"]= checkedActivitiesArray[i];
				dataObj["Quantity"] = arrQuantities[i];
				dataObj["Remarks"] = arrRemarks[i];
				dataObj["Manpower"] = arrManpower[i];
				dataObj["UnitOfMeasurement"] = arrUnitOfMeasurements[i];              
				if(checkedActivitiesArray[i]=='RCC'){
					dataObj["RCC"]=rccTypeDropdwn;          
				}
				gridArray.push(dataObj);
			}



		}else{

			//new form
			var dataObj={}; 
			dataObj["Activities"]= checkedActivitiesArray[i];
			dataObj["Quantity"] = arrQuantities[i];
			dataObj["Remarks"] = arrRemarks[i];
			dataObj["Manpower"] = arrManpower[i];
			dataObj["UnitOfMeasurement"] = arrUnitOfMeasurements[i]; 
			if(checkedActivitiesArray[i]=='RCC')
			{
				dataObj["RCC"]=rccTypeDropdwn;

			}

			gridArray.push(dataObj);
		}

	}//end for loop
	 */


	//assign date for the first time only
	if(selectedDate == null){
		selectedDate = $("#DateID").val();  
	}

	finalObj["Date"]= selectedDate;
	finalObj["Grid"]= selectedGrid.replace(/["']/g, "");
	finalObj["Data"] = gridArray;

	//alert("initial email data array"+JSON.stringify(emailDataArr) + "length" +emailDataArr.length);

	//logic to reorder and group activities in same grids 
	/*	if(isFormUpdate && emailDataArr!=undefined && emailDataArr.length > 0){
		for(var i=0;i < emailDataArr.length;i++){
			//alert("checkone"+emailDataArr[i].Grid+" selectedGrid "+selectedGrid );
			if(emailDataArr[i].Grid == selectedGrid+"'"){
				var data = emailDataArr[i].Data;
				for(var j=0;j<data.length;j++){
					//alert("checktwo"+data[j].Activities + " " +gridArray[j].Activities );
					if(gridArray[j]!=undefined && data[j].Activities == gridArray[j].Activities && gridArray.length>1){
						//alert("remove"+ "" +data[j] + " j value" +j);
						//findAndRemove(emailDataArr, "Activities", data[j].Activities);
						var index = emailDataArr.indexOf(emailDataArr[j]);
						//alert("index" +index);
						if (index > -1) {
							emailDataArr.splice(index-1, 1);
						}
					}else{		

						var index = emailDataArr.indexOf(emailDataArr[j]);
						//alert(JSON.stringify(emailDataArr) + " " +emailDataArr[j]);
						//alert("called else" +index);
						emailDataArr.splice(index-1, 1);		
					}
				}
			}
		}
	}
	 */

	emailDataArr.push(finalObj);

	emailDataArr = arrUnique(emailDataArr);

	//alert("after email data array"+JSON.stringify(emailDataArr) + "length" +emailDataArr.length);

	arrQuantities=[];
	arrRemarks=[];
	arrManpower=[];
	arrDates=[];
	arrUnitOfMeasurements=[];
	//checkedActivitiesArray=[];


	console.log("finalObj json"+JSON.stringify(finalObj));

}

//function to find and remove particular json object from array
function findAndRemove(array, property, value) {
	array.forEach(function(result, index) {
		if(result[property] === value) {
			//Remove from array
			array.splice(index, 1);
		}    
	});
}

//here checkedActivitiesarray is not cleared as it will be for updated form
function clearAllSectionFields(){
	gridArray=[];
	arrQuantities=[];
	arrRemarks=[];
	arrManpower=[];
	arrDates=[];
	arrUnitOfMeasurements=[];
}

//this is only for a fresh form as all data has to be cleared
function createFreshForm(){

	emailDataArr=[];
	gridArray=[];
	arrQuantities=[];
	arrRemarks=[];
	arrManpower=[];
	arrDates=[];
	arrUnitOfMeasurements=[];
	checkedActivitiesArray=[];
	checkedActivitiesArray2=[];
	//reset form update
	isFormUpdate = false;
	
	//reset form update section
	isFormUpdateSection = false;

	//reset the grid Added flag 
	isGridAdded = false;
	
	//reset the grid edit flag
	isGridEdited = false;
	
	
	selectedGridOnChange=null;
}


//function to remove duplicate json object values from json array
function arrUnique(arr) {
	var cleaned = [];
	arr.forEach(function(itm) {
		var unique = true;
		cleaned.forEach(function(itm2) {
			if (_.isEqual(itm, itm2)) unique = false;
		});
		if (unique)  cleaned.push(itm);
	});
	return cleaned;
}
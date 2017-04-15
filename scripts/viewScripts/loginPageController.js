vacationHouseExchangeApp.controller('loginPageController', ['$scope','$rootScope', '$location', '$window', 'vacationHouseExchangeAppService', function ($scope,$rootScope, $location, $window, vacationHouseExchangeAppService ) {

	/****
	* Added by Nidhi 
	* Role: forgot Password
	***/
	$scope.forgetPassword=function(){
		
		bootbox.prompt({
		title: "Forgot Password",
		message: "Enter email id :",
		inputType: 'email',
		callback: function (result) {
			var data={
				"emailId": result	
			}
			vacationHouseExchangeAppService.callVHEServer("forgotPassword",data, function(result){
				if(result['statusCode'] == 0){
					bootbox.alert(result['RESPONSE_STATUS']);
					
					
				}else{
					bootbox.alert(result['FAILURE_REASON']);
					
				}
				

			},function(error){
				bootbox.alert("Could not connect to server!");
			});
		}
	});
		
	};
	
	
	/***Ends***/

	$scope.registerWithUs=function(){
		$location.path('registration_page');
	};
	
	/****
	* Added by Nidhi 
	* Role: validate user
	***/
	
	$scope.login=function(){
	//	$location.path("viewHouses");
		var success=false;
		if($("#emailId").val() == null || $("#emailId").val() == "" || $("#emailId").hasClass('error')){
			bootbox.alert("Please enter valid Email-id");
			return;
		}
		if($("#password").val() == null || $("#password").val() == ""){
			bootbox.alert("Please enter password");
			return;
		}
		var encryptedPassWord = NGCommonUtilities.encryptData($("#password").val());
		var data={
				"emailId": $("#emailId").val(),
				"password" : encryptedPassWord
		}
		vacationHouseExchangeAppService.callVHEServer("userendpoints/login",data, function(result){
			if(result['statusCode'] == 0){
				if(loggedInUser == ""){
					loggedInUser= $("#emailId").val();
				}
				
				//success=true;
				$location.path("viewHouses");
				$scope.$apply();
			}else{
				bootbox.alert("There was some error logging in. Please try again!")
			}
			},function(error){
				bootbox.alert("Could not connect to server!");
			});
			
	};



}]);

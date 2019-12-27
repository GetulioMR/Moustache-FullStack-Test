/**
 * FRAMEWORK - VALIDATORS
 */
APP.Validators = (function ($, Private, Public) {
	
	'use strict';

	Public.isChecked = function (input) {

		return input.checked;
	};

	Public.isPDF = function (file) {

		return file.indexOf('.pdf') > -1 ? true : false;
	};

	Public.isNumber = function (number) {

		return number && !isNaN(number) ? true : false;
	};

	Public.isZipcode = function (zipcode) {

		var
			regex = /0{8}|1{8}|2{8}|3{8}|4{8}|5{8}|6{8}7{8}|8{8}|9{8}/g;

		zipcode = zipcode.replace(/\D/g, '');

		return zipcode && zipcode.length === 8 && !regex.test(zipcode) ? true : false;
	};

	Public.isRequired = function (value) {
 
		return value ? true : false;
	};

	Public.isFacebookBrowser = function () {

		var
			ua = navigator.userAgent || navigator.vendor || window.opera;
		
		return (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1 || ua.indexOf('Instagram') > -1);
	};

	Public.isLegalAge = function (birthdate) {

		var
			legalAge    = 18,
			today       = new Date(),
			birthDate   = new Date(birthdate),
			age         = today.getFullYear() - birthDate.getFullYear(),
			month       = today.getMonth() - birthDate.getMonth();

		if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
			
			age--;
		}
 
		return isNaN(age) || (age < legalAge) ? false : true;
	};

	Public.isCNPJ = function (cnpj) {

		var
			regex   = /0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}7{14}|8{14}|9{14}/g,
			i       = 0,
			length  = 0,
			numbers = 0,
			digits  = 0,
			sum     = 0,
			pos     = 0,
			result  = 0;
		 
		cnpj = cnpj.replace(/[^\d]+/g,'');
	 
		if(!cnpj || cnpj.length !== 14) {
			
			return false;
		}
		

		if (regex.test(cnpj)) {
			
			return false;
		}

		length  = cnpj.length - 2;
		numbers = cnpj.substring(0, length);
		digits  = cnpj.substring(length);
		sum     = 0;
		pos     = length - 7;
		
		for (i = length; i >= 1; i--) {
		  
			sum += numbers.charAt(length - i) * pos--;
			
			if (pos < 2) {
			
				pos = 9;
			}
		}

		result = sum % 11 < 2 ? 0 : 11 - sum % 11;

		
		if (result !== parseInt(digits.charAt(0))) {

			return false;
		}
			 
		length  = length + 1;
		numbers = cnpj.substring(0, length);
		sum     = 0;
		pos     = length - 7;
		
		for (i = length; i >= 1; i--) {
		  
			sum += numbers.charAt(length - i) * pos--;
		  
			if (pos < 2) {

				pos = 9;
			}
		}

		result = sum % 11 < 2 ? 0 : 11 - sum % 11;

		if (result !== parseInt(digits.charAt(1))) {

			return false;
		}
			   
		return true;
	};

	Public.isBrazilianState = function (state) {

		var
			current	= null,
			uf 		= {
				'AC': 'Acre',
				'AL': 'Alagoas',
				'AP': 'Amapá',
				'AM': 'Amazonas',
				'BA': 'Bahia',
				'CE': 'Ceará',
				'DF': 'Distrito Federal',
				'ES': 'Espírito Santo',
				'GO': 'Goiás',
				'MA': 'Maranhão',
				'MT': 'Mato Grosso',
				'MS': 'Mato Grosso do Sul',
				'MG': 'Minas Gerais',
				'PA': 'Pará',
				'PB': 'Paraíba',
				'PR': 'Paraná',
				'PE': 'Pernambuco',
				'PI': 'Piauí',
				'RJ': 'Rio de Janeiro',
				'RN': 'Rio Grande do Norte',
				'RS': 'Rio Grande do Sul',
				'RO': 'Rondônia',
				'RR': 'Roraima',
				'SC': 'Santa Catarina',
				'SP': 'São Paulo',
				'SE': 'Sergipe',
				'TO': 'Tocantins'
			};

		for (current in uf) {

		  	if (state === current) {

		  		return true;
		  	}
		}

		return false;
	};

	Public.isDate = function (date) {

		var
			regex   = /\d{2}\/\d{2}\/\d{4}/g,
			day     = null,
			month   = null,
			year    = null;

		if (date && regex.test(date)) {

			date    = date.split('/');
			day     = parseInt(date[0]);
			month   = parseInt(date[1]) - 1;
			year    = parseInt(date[2]);
			date    = new Date();

			date.setFullYear(year, month, day);

			if ((date.getFullYear() === year) && (date.getMonth() === month) && (date.getDate() === day)) {

				return true;
			}
		}

		return false;
	};

	Public.isEmail = function (email) {

		var
			regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return regex.test(email) ? true : false;
	};

	Public.isPhone = function (phone) {

		var
			length = 0;

		phone 	= phone.replace(/\D/g, '');
		length 	= phone.length;

		return (length === 10 || length === 11) && !phone.slice(-8).match(/\b(\d)\1+\b/g) ? true : false;
	};

	Public.isGeneric = function (value) {

		return value ? true : false;
	};

	Public.isName = function (name) {

		return name.length > 2 ? true : false;
	};

	Public.isCPF = function (cpf) {

		var
			regex   = /0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}7{11}|8{11}|9{11}/g,
			i       = 0,
			sum     = 0,
			rest    = 0;
		
		cpf = cpf.replace(/\D/g, '');

		if(!cpf || cpf.length !== 11) {
			
			return false;
		}
	  
		if (regex.test(cpf)) {
			
			return false;
		}

		for (i = 0; i < 9; i++) {
		
			sum = sum + parseInt(cpf.substring(i, i + 1)) * (10 - i);
		}
	  
		rest = (sum * 10) % 11;
	   
		if ((rest === 10) || (rest === 11)) {

			rest = 0;
		}

		if (rest !== parseInt(cpf.substring(9, 10))) {

			return false;
		}
	   
		sum = 0;

		for (i = 0; i < 10; i++) {

			sum = sum + parseInt(cpf.substring(i, i + 1)) * (11 - i);
		}
		
		rest = (sum * 10) % 11;
	   
		if ((rest === 10) || (rest === 11)) {

			rest = 0;
		}

		if (rest !== parseInt(cpf.substring(10, 11))) {

			return false;
		}

		return true;
	};

	Public.isValidDate = function(birthdate){
		
		if(parseInt(birthdate.substring(6,10)) < 1900){
			return false;
		}
		
		return true;
	};

	Public.isNumberValid = function(number){

		return number > 0 ? true : false;
	};

	Public.validateCardNumber = function(cardNumbers){
		var value, numbers = [];

		value = cardNumbers.replace(/\.+/g,'');

		if(!Public.isNumberValid(value)){
			return false;
		}
		
		if(value.length < 14 || value.length > 16){
			return false;
		}

		numbers = Public.returnCardNumbersMatrix(value);

		return Public.isSequenceCardNumbers(numbers);
	};

	Public.returnCardNumbersMatrix = function(cardNumbers){
		var numbers = [], x = 0;

		while(x <= cardNumbers.length){
			
			if(x === 0){
				numbers.push(cardNumbers.substring(x, 1));
				x = 2;
				
			}else{
				numbers.push(cardNumbers.substring(x, (x -1)));
				x++;
			}
		}

		return numbers;
	};

	Public.isSequenceCardNumbers = function(cardNumbers){
		var count = 0;

		for (var i = 0; i < cardNumbers.length; i++) {

			if (cardNumbers[i] === cardNumbers[0]) {
				count++;
			}
		}

		if(count >= 14){
			return false;
		}

		return true;
	};

	Public.validateCardValidity = function (date){
		var monthUser, yearUser, currentDate, currentYear, currentMonth;

		currentDate		= new Date();
		currentMonth	= currentDate.getMonth() + 1;
		currentYear		= parseInt(currentDate.getFullYear().toString().substring(2));
		
		monthUser 		= parseInt(date.substring(0,2));
		yearUser		= parseInt(date.substring(6,3));

		if(monthUser < 1 || monthUser > 12){
			return false;
		}
		if(monthUser < currentMonth && yearUser <= currentYear){
			return false;
		}
		if(monthUser > currentMonth && yearUser < currentYear){
			return false;
		}
		if(monthUser === currentMonth && yearUser < currentYear){
			return false;
		}

		return true;
	};

	return Public;

}(jQuery, {}, {}));
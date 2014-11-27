//Form Validation Script
//Credit Card/ Checkout Related Checks
var shiftValue = 1;
//Cipher Function
function Cipher(str){
	console.log('cipherutil.js: Cipher() called with arg: '+str);
	var shiftedString ='',c;
	for(var i=0;i<str.length;i++){
		c = str.charCodeAt(i);
		c += shiftValue;
		shiftedString += String.fromCharCode(c);
	}
	console.log('cipherutil.js: shiftedString : '+shiftedString);
	var cipheredString = '@@ciphered@@' + shiftedString;
	console.log('cipherutil.js: ciphered string: '+cipheredString);
	return cipheredString;
};

//Decipher Function
function Decipher (str) {
	console.log('cipherutil.js: Decipher() called with arg: '+str);
	var shiftedString ='',c;
	str = str.substring(12);
    console.log('cipherutil.js: str after removing cipher signature: '+str);
	for(var i=0;i<str.length;i++){
		c = str.charCodeAt(i);
		c -= shiftValue;
		shiftedString += String.fromCharCode(c);
	}
	console.log('cipherutil.js: Deciphered String: '+shiftedString)
	return shiftedString;
};

//IsCiphered Function
function isCipher(str){
	console.log('cipherutil.js: isCipher() called with arg: '+str);
	if(str.indexOf('@@ciphered@@') == 0){
		console.log('cipherutil.js: isCipher() returned 1');
		return 1;
	}
	console.log('cipherutil.js: isCipher() returned 0');
	return 0;
};

module.exports.Cipher = Cipher;
module.exports.Decipher = Decipher;
module.exports.isCipher = isCipher;
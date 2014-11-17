//Cipher Function
function Cipher(str){
	var str = str + 'a';
	return str;
};

//Decipher Function
function Decipher (str) {
	str = str.substring(0, str.length - 1);
	return str;
}

//IsCiphered Function
function isCipher(str){
	if(str.lastIndexOf('a') == str.length - 1){
		return 1;
	}
	return 0;
}
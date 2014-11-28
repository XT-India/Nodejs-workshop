exports.uppercase = function(req,res){
	var cipherUtil = require('./cipherUtil');
       var str = req.body.caesarText;
       console.log('Server: received str from client: '+str);
       var decipheredStr,wasCiphered = 0;
       //console.log("Server: is ciphered: "+cipherUtil.isCipher(str));
       if(cipherUtil.isCipher(str) == 1){
       		console.log('Server: calling decipher function...');
                     decipheredStr = cipherUtil.Decipher(str);
       		wasCiphered = 1;
       		console.log('Server: Deciphered Str: '+decipheredStr);
       }
       else{
       		console.log('Server: request string is not ciphered!!');
                     decipheredStr = str;
       }
       //processing the deciphered string
       console.log('Server: giving str for processing: '+decipheredStr)
       var processedStr = uppercaseFunc(decipheredStr);
       var responseStr = '';
       console.log('Server: str after processing: '+processedStr);
       //check if it was ciphered
       if(wasCiphered == 1){
       	//ciphering the processed str
                     console.log('Server: response before ciphering: '+processedStr);
       		responseStr = cipherUtil.Cipher(processedStr);
                     console.log('Server: response after ciphering: '+responseStr);
       }
       else
       {
              console.log('Server: skipping ciphering of response!!');
       }
       console.log('Response being sent: '+responseStr);
       res.render('uppercase', { 'responseStr' : responseStr});
};

 var uppercaseFunc=function(str){
	var upperStr = str.toUpperCase();
	return upperStr;
};
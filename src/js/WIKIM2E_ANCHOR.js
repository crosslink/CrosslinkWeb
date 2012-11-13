
function anchorNews(article) {
	//console.log("got to anchorNews");
	newCon = [];
	
	article = article.replace(/\r\n|\r|\n/, " ");

	var WordsToAnchor = article.split(" ");
	var found;
	var WordsMax = WordsToAnchor.length;
	for (var i = 0; i < WordsMax; i++) {

		var tmpWord1 = "";
		var tmpWord2 = "";
		var tmpWord3 = "";
		var tmpWord4 = "";
		if ((i + 3) < WordsMax) {
			tmpWord4 = WordsToAnchor[i] + " " + WordsToAnchor[i + 1] + " "
					+ WordsToAnchor[i + 2] + " " + WordsToAnchor[i + 3];
			// remove punctuation
			tmpWord4 = tmpWord4.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
			// remove ""
			tmpWord4 = tmpWord4.replace(/\,/g, "");
			
		}

		if ((i + 2) < WordsMax) {
			tmpWord3 = WordsToAnchor[i] + " " + WordsToAnchor[i + 1] + " "
					+ WordsToAnchor[i + 2];
			// remove punctuation
			tmpWord3 = tmpWord3.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
			// remove ""
			tmpWord3 = tmpWord3.replace(/\,/g, "");
		
		}

		if ((i + 1) < WordsMax) {
			tmpWord2 = WordsToAnchor[i] + " " + WordsToAnchor[i + 1];
			
			// remove punctuation
			tmpWord2 = tmpWord2.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
			// remove ""
			tmpWord2 = tmpWord2.replace(/\,/g, "");

		
		}

		tmpWord1 = WordsToAnchor[i];
		// remove punctuation
		tmpWord1 = tmpWord1.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
		// remove ""
		tmpWord1 = tmpWord1.replace(/\,/g, "");
		

		found = false;
		// Find four words & if found, replace
		var replacedTmpWord4 = tmpWord4;
		//console.log(tmpWord4);
		if (tmpWord4 != "") {

			replacedTmpWord4 = replaceWord(tmpWord4);
			if (replacedTmpWord4 != "") {
				// add 3 to point position
				i = i + 3;
				// pointing that word has been found and replaced
				found = true;

			}
		}

		var replacedTmpWord3 = tmpWord3;
		if ((tmpWord3 != "") && (replacedTmpWord4 == "")) {

			replacedTmpWord3 = replaceWord(tmpWord3);
			if (replacedTmpWord3 != "") {
				i = i + 2;
				found = true;

			}
		}

		var replacedTmpWord2 = tmpWord2;
		if ((tmpWord2 != "") && (replacedTmpWord3 == "")) {
		
			replacedTmpWord2 = replaceWord(tmpWord2);
			if (replacedTmpWord2 != "") {
				i = i + 1;
				found = true;

			}
		}

		var replacedTmpWord = tmpWord1;
		if ((tmpWord1 != "") && (replacedTmpWord2 == "")) {

			replacedTmpWord = replaceWord(tmpWord1);
			if (replacedTmpWord != "") {
				found = true;
			}
		}

		// if word not found, add the original text
		if (found == false) {
			newCon.push(WordsToAnchor[i]);

		}

	}
	var con = newCon.join(" ");
	//console.log(con);
	return con;
}

function replaceWord(textString) {
	//console.log("replaceword");

	var replaced = false;
	var string = textString.toLowerCase();

	for ( var i = 0; i < MalayWord.length; i++) {
		var word = MalayWord[i].toLowerCase();
		
		if ((word == string)) {
			
			// find WIKILINK from Hashmap
			var anchorURL = "http://en.wikipedia.org/wiki/index.php?curid="
				+ wordList.get(MalayWord[i]);
			
			textString = textString.replace(textString, '<a target="_blank" href="' + anchorURL + '">'
					+ textString + '</a>');
		
			newCon.push(textString);
			replaced = true;
			break;
		}

	}

	if (replaced == true) {
		return textString;
	}

	return "";
}

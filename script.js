// Query Form

	const queryForm = document.getElementById("tagGuess");
	const queryBox = document.getElementById("queryBox");
	const list = document.getElementById("listData");
	const listTagGuess=document.getElementById("listTagGuess");
	// const button = document.querySelectorAll('.buttonStyle');

// Create the array of tags then define a random tag

	const arrayTag = ['Picture','Whisky','Mickey Mouse','Stamp','Beer','Cup'];
	const randomTag = randomTagGenerator(arrayTag);

// Create HTML buttons based on length of the array of tags
	buttonCreate(arrayTag);

// Fetch data from API based on a random tag
	getTaggedePhotos(randomTag);
	
// Idenfity which button has been clicked
	const button = document.querySelectorAll('.buttonStyle');
	
	for (let i = 0; i<button.length; i++){
		let item = button[i];
		
		item.onclick = function(event){
			event.preventDefault();

			const elemClickedOne = event.target;

			valueGuess = elemClickedOne.innerHTML;
			valueCorrect = randomTag;
	// Based on the guessed value, check the results
			checkResult(valueGuess,valueCorrect);
		}
	}




// Function create HTML buttons based on array of tags
	function buttonCreate(arrayTag){
		for (let i = 0; i <arrayTag.length; i++) {
			const button = document.createElement('button');
		// Set the attributes
			button.setAttribute('type', 'submit');
			button.innerHTML = arrayTag[i];
			button.classList.add('buttonStyle');
		// Append to the list
			listTagGuess.appendChild(button);
		}
	}
// Function - use API to get tagged photos 
 	function getTaggedePhotos(tagName) {
		fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=XL5QpWZeOt4ISPIyWvjiJ28GPfREqaS0L9Nqo85QTodMKKTV1q').then(
			// This step takes in the raw gibberish from Fetch and passes it through a function
				function(responseGib) {			
					return responseGib.json();
				}
			// This step then takes the json-ed formatted gibberish and passes it through another function
			). then(
				function(result) {
				
					// list.innerHTML='';
			// We then assign the specific objects obtained - for example posts - to items to get an item array
					const items = result.response;
					for(let i =0; i<items.length; i++){
						const item = items[i];
						
						if(item.photos!=undefined){

							const altSizes=item.photos[0].alt_sizes
							const imgFetch = altSizes[altSizes.length-2].url;
							const img = document.createElement('img');

							img.src= imgFetch;

							const li = document.createElement('li');
							li.innerHTML= imgFetch;
							list.appendChild(img);
						}

					}

					return items;
				}
			)
	}

// Function - randomtag generator	
	function randomTagGenerator (arrayTag) {

	// Get the maximum number of the array

		maxLength = (arrayTag.length);

		return arrayTag[parseInt(Math.random()*maxLength)];

	}

// Function - check if answer correct or not
	function checkResult(valueGuess,valueCorrect) {

		if(valueGuess==valueCorrect) {
			window.alert('You have selected the RIGHT tag!');

			let randomTag = randomTagGenerator(arrayTag);
			// list.innerHTML='';
			// getTaggedePhotos(randomTag);


			return true;
		} else {
			window.alert('You have selected the WRONG tag! The correct tag is ' + valueCorrect);
			return false;
		}

	}

// Exercise Checklist
// 1. Create an array of common tag keywords [DONE]

//  2. Randomly select a keyword and fetch posts tagged with keyword [DONE]

//  3. Display photos to user [DONE]

//  4. Ask user to guess what the common tag keyword for the photos are [DONE]

//  5. Provide 4 different answers for user to guess [DONE]

//  6. If user guesses the right tag keyword, reset game starting from step 2 [DONE]

// 7. If user guesses the wrong tag keyword, show the correct answer and reset game from step 2 [DONE]


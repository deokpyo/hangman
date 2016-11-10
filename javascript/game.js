    // object
      var LOL = {
        //variables
        name: "League of Legends",
        type: "Hangman",
        champ: "",
        letter: "",
        correct: "",
        champion: "",
        reload: false,
        first_key: false,
        num_attempts: 10,
        counter: 0,
        loss: 0,
        win: 0,
        used: document.getElementById("used"),
        show_attempts: document.getElementById("attempts"),
        champ_img: document.getElementById("champ"),
        ll: document.getElementById("loss"),
        ww: document.getElementById("win"),

        // arrays
        letter_holder: [],
        champ_letters: [],
        word_holder: [],
        used_letter: [],
        champions_list: ["Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Ashe", "Aurelion Sol", "Azir", "Bard", "Blitzcrank", "Brand", "Braum", "Caitlyn", "Cassiopeia", "Cho'Gath", "Corki", "Darius", "Diana", "Draven", "Dr Mundo", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Illaoi", "Irelia", "Ivern", "Janna", "Jarvan IV", "Jax", "Jayce", "Jhin", "Jinx", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kennen", "Kha'zix", "Kindred", "Kled", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana", "Nami", "Nasus", "Nautilus", "Nidalee", "Nocturne", "Nunu", "Olaf", "Orianna", "Pantheon", "Poppy", "Quinn", "Rammus", "Rek'Sai", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Sejuani", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Syndra", "Tahm Kench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "Twisted Fate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Vel'koz", "Vi", "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xerath", "Xin Zhao", "Yasuo", "Yorick", "Zac",  "Zed", "Ziggs", "Zilean", "Zyra"],

        // functions
        // randomly select a champion from the list and remove the selected element from the array
        selectChampion: function() {
          var list_len = this.champions_list.length;
          var rand_num = Math.floor(Math.random() * list_len-1);
          var selected_champion = this.champions_list.splice(rand_num, 1);
          //remove this line after finishing       
          console.log(selected_champion);
          return selected_champion;        
        },

         // create word ul for selected champion
        createWord: function (champ) {
          this.word_holder = document.getElementById('main_game');
          this.correct = document.createElement('ul');
          // convert the array into string
          var str_champ = champ.toString();

          for (var i = 0; i < str_champ.length; i++) {
            this.correct.setAttribute('id', 'my-word');
            letter = document.createElement('li');
            letter.setAttribute('class', 'letter');
            if (str_champ.charAt(i) === " ") {
              letter.innerHTML = " ";
              this.counter++;
              this.champ_letters.push(str_champ.charAt(i));
            }
            else if (str_champ.charAt(i) === "'"){
              letter.innerHTML = "'";
              this.counter++;
              this.champ_letters.push(str_champ.charAt(i));
            }
             else {
              letter.innerHTML = "_";
              this.champ_letters.push(str_champ.charAt(i));
            }
            this.letter_holder.push(letter);
            this.word_holder.appendChild(this.correct);
            this.correct.appendChild(letter);
          }
        },
  
        //function to reset the variable/array for a new game
        resetGame: function() {
          this.counter = 0;
          this.num_attempts = 10;
          this.champ_letters = [];
          this.used_letter = [];
          this.letter_holder = [];
          this.word_holder = [];
          this.correct.innerHTML = "";
          this.show_attempts.innerHTML = "";
          this.champ_img.innerHTML = "";
          this.first_key = true;
          this.champion = "";
        },

        // function for loading the game and making a clean string with champion selected
        loadGame: function(){
          // Initialize the game
          var champ = this.selectChampion();
          // remove spaces and ' for image names
          this.champion = champ.toString();
          this.champion = this.champion.toLowerCase();
          this.champion = this.champion.replace(/'/i, '');
          this.champion = this.champion.replace(/ /i, '');
          console.log(this.champion);
          LOL.createWord(champ);
        },

        //function to check if user's input matches any letter in the champion's name
        checkMatch: function(input){
          var input_lower = input.toLowerCase();
          var index_input = this.used_letter.indexOf(input);
          var index_L = this.champ_letters.indexOf(input_lower);
          var index_U = this.champ_letters.indexOf(input);

          if(index_input < 0){
            this.used_letter.push(input);
            this.used.innerHTML = this.used_letter;

            if(index_L < 0 && index_U < 0){
            this.num_attempts--;
            }
            else{
            //loop for checking lowercase match
            for(i = 0; i < this.champ_letters.length; i++){
              if(input_lower === this.champ_letters[i]){
                this.letter_holder[i].innerHTML = input_lower;
                this.counter++;
              }
            }
            //loop for checking uppercase match
            for(i = 0; i < this.champ_letters.length; i++){
              if(input === this.champ_letters[i]){
                this.letter_holder[i].innerHTML = input;
                this.counter++;
              }
            }
          }
          }
        },

        //function to show current number of attemps left
        showAttempts: function(){
          this.show_attempts.innerHTML = "You have " + this.num_attempts + " attempts left.";
          if (this.num_attempts < 1) {
            this.show_attempts.innerHTML = "DEFEAT <br/>Press any key to start a new game";
            console.log(this.loss);
            this.loss += 1;
            console.log(this.loss);
            this.ll.innerHTML = "Losses: " + this.loss;
            this.reload = true;
            this.first_key = true;
          }
          if (this.counter === this.champ_letters.length){
            this.show_attempts.innerHTML = "WELCOME TO SUMMNOR'S RIFT <br/>Press any key to start a new game";
            console.log(this.win);
            this.win += 1;
            console.log(this.win);
            this.ww.innerHTML = "Wins: " + this.win;
            

            //START FROM HERE, SELECT THE IMAGE BASED ON CHAMP NAME
            this.champ_img.innerHTML = "<img src='images/" + this.champion + ".jpg' alt='" + this.champion + "' />" 
            this.reload = true;
            this.first_key = true;
            // this.resetGame();
            // this.loadGame();
          }
        },

        // display necessary items for the game
        displayMsg: function(){
          this.show_attempts.innerHTML = "Press a letter key to start!";
          this.used.innerHTML = "";
          this.ll.innerHTML = "Losses: " + this.loss;
          this.ww.innerHTML = "Wins: " + this.win;
          
        },

        // display when a user types in something other than a letter
        displayErr: function(){
          this.show_attempts.innerHTML = "Type in a letter key only";
        }
      }

      // start all this below when window loads
      window.onload = function () {
        // Initialize the game
        LOL.loadGame();
        LOL.displayMsg();
        
        // when user presses anything on keyboard
        document.onkeyup = function(event){
          // check if loading a new game from a previous game
          if(LOL.reload){
            LOL.reload = false;
            LOL.resetGame();
            LOL.loadGame();
            LOL.displayMsg();
          }
          // check if first key pressed to start
          if(LOL.first_key){
            LOL.first_key = false;
          }
          else{
            // Captures the key press, converts it to uppercase, and saves it to a variable.
            var user_input = String.fromCharCode(event.keyCode).toUpperCase();
            if(user_input.charCodeAt(0) >= 65 && user_input.charCodeAt(0) <= 90){  
              LOL.checkMatch(user_input);
              LOL.showAttempts();
            }
            else{
              LOL.displayErr();
            }
          }
      }
      }
window.onload = pageReady;

function pageReady() {
    var btn = document.getElementById("teamsGenerate");
    var handleForm = document.getElementById("playerForm");
    handleForm.onsubmit = processForm;

    var playerNameInput = document.getElementById("playerName");
    var selectPlayerRole = document.getElementById("playerRole");
    var teamsContainer = document.getElementById("teams");

    //Two seperate arrays
    var forwards = [];
    var defense = [];

    function processForm() {
        var playerName = playerNameInput.value;
        var playerRole = selectPlayerRole.value;

        //Assigning the roles to the players and pushin git tot the arrays
        if (playerRole === "forward") {
            forwards.push({ name: playerName, role: playerRole });
        } else if (playerRole === "defense") {
            defense.push({ name: playerName, role: playerRole });
        }
        // console.log(forwards);
        // Clearing input after adding player
        playerNameInput.value = "";

        addPlayers();
        // This Prevents form from submission
        return false;
    }


    function addPlayers() {
        //clearing previous players names
        teamsContainer.innerHTML = "";

        //Displaying players and their roles
        forwards.forEach(player => {
            var playerElement = document.createElement("li");
            playerElement.textContent = `${player.name} - ${player.role}`;
            teamsContainer.appendChild(playerElement);
        });

        defense.forEach(player => {
            var playerElement = document.createElement("li");
            playerElement.textContent = `${player.name} - ${player.role}`;  // playerElement.classList.add("players");
            teamsContainer.appendChild(playerElement);
        });
    };

    function generateTeams() {
        if (forwards.length < 1 || defense.length < 1) {
            console.log("Not enough players to form teams.");
            return;
        }

        // console.log(forwards);

        // Fisher-Yates shuffle algorithm
        for (let i = forwards.length - 1; i > 0; i--) {
            // Generate a random index between 0 and i
            let j = Math.floor(Math.random() * (i + 1));
            // Swap elements at indices i and j
            [forwards[i], forwards[j]] = [forwards[j], forwards[i]];
        }
        // console.log(forwards);

        for (let i = defense.length - 1; i > 0; i--) {
            // Generate a random index between 0 and i
            let j = Math.floor(Math.random() * (i + 1));
            // Swap elements at indices i and j 
            [defense[i], defense[j]] = [defense[j], defense[i]];
        }
        // console.log(defense);


        var team1 = [];
        var team2 = [];
        // console.log(team1)
        for (let i = defense.length; i > 0; i--) {
            if (defense.length > 0) {
                team2.push(defense.pop());
            }
            if (defense.length > 0) {
                team1.push(defense.pop());

            }
        }

        for (let i = forwards.length; i > 0; i--) {
            if (forwards.length > 0) {
                team1.push(forwards.pop());
            }
            if (forwards.length > 0) {
                team2.push(forwards.pop());

            }
        }
        console.log(team1);
        console.log(team2);


        // Display teams
        displayTeams(team1, team2);

    }

    function displayTeams(team1, team2) {
        // Clears previous teams
        teamsContainer.innerHTML = "";

        //Displaying Teams
        var team1Element = document.createElement("div");
        team1Element.classList.add("team")
        team1Element.innerHTML = "<h2>Team 1</h2>";

        team1.forEach(player => {
            var playerElement = document.createElement("p");
            playerElement.textContent = player.name + " - " + player.role;
            team1Element.appendChild(playerElement);
        });

        var team2Element = document.createElement("div");
        team2Element.classList.add("team")
        team2Element.innerHTML = "<h2>Team 2</h2>";

        team2.forEach(player => {
            var playerElement = document.createElement("p");
            playerElement.textContent = player.name + " - " + player.role;
            team2Element.appendChild(playerElement);
        });

        teamsContainer.appendChild(team1Element);
        teamsContainer.appendChild(team2Element);
    }

    btn.onclick = generateTeams;
}

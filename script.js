const getTeamsList = async () => {
    try {
        let responce = await fetch("https://api.football-data.org/v2/teams", {
            method: "GET",
            headers: {
                "X-Auth-Token": "9053d3414524438e9f1753cf3f3732cb",
            },
        });
        return responce.json();
    } catch (error) {
        console.log(error);
    }
};

const getMatchList = async (id) => {
    try {
        let responce = await fetch(`https://api.football-data.org/v2/teams/${id}/matches`, {
                method: "GET",
                headers: {
                    "X-Auth-Token": "9053d3414524438e9f1753cf3f3732cb",
                },
            });
        return responce.json();
    } catch (error) {
        console.log(error);
    }
};

const showCurrentClubInfo = async (teamData, teamId) => {
  try {
    const currentTeam = teamData.teams.find((team) => team.id === teamId);
    const teamList = document.getElementById("teams_list");
    teamList.innerHTML = "";

    const insertHTML = `
    <div class="club_wrapper">
      <div class="club_icon_wrapper">
        <img src=${currentTeam.crestUrl} class="club_icon">
      </div>
      <div class="club_info">
        <div class="club_info_cell">
          <div class="info_title">Name</div>
          <div class="club_name">${currentTeam.name}</div>
        </div>
        <div class="club_info_cell">
          <div class="info_title">Short Name</div>
          <div class="club_shortname">${currentTeam.shortName}</div>
        </div>
        <div class="club_info_cell">
          <div class="info_title">Website</div>
          <div class="club_website"><a href=${currentTeam.website} class="club_website_link">${currentTeam.website}</a></div>
        </div>
        <div class="club_info_cell">
          <div class="info_title">Phone</div>
          <div class="club_phone">${currentTeam.phone}</div>
        </div>
        <div class="club_info_cell">
          <div class="info_title">Address</div>
          <div class="club_address">${currentTeam.address}</div>
        </div>
        <div class="club_info_cell">
          <div class="info_title">Email</div>
          <div class="club_email">${currentTeam.email}</div>
        </div>
        <div class="club_info_cell">
          <div class="info_title">Founded</div>
          <div class="club_founded">${currentTeam.founded}</div>
        </div>
        <div class="club_info_cell">
          <div class="info_title">Venue</div>
          <div class="club_venue">${currentTeam.venue}</div>
        </div>
        <div class="club_info_cell">
          <div class="info_title">Club Colors</div>
          <div class="club_color">${currentTeam.clubColors}</div>
        </div>
      </div>
    `
    ;

    teamList.insertAdjacentHTML("afterbegin", insertHTML);

    const currentMatches = await getMatchList(teamId);
    if (currentMatches.matches.length) {
        currentMatches.matches.map((match) => {
            const currentMatch = `
            <div class="matches_info">
              <div class="competition_name">${match.competition.name}</div>
              <div class="match_group">${match.group}</div>
              <div class="match_date"><p class="bold">Date: </p> ${match.utcDate}</div>
              <div class="home_team"><p class="bold">Home team: </p> ${match.homeTeam.name}</div>
              <div class="away_team"><p class="bold">Away team: </p> ${match.awayTeam.name}</div>
            </div>
            `;

            teamList.insertAdjacentHTML("beforeend", currentMatch);
        });
    } else {
        teamList.insertAdjacentHTML(
            "beforeend",
            "<div class='not_found'>Matches not found</div>"
        );
    }
  } catch(error) {
    console.log(error);
  }
};

const showList = async () => {
    try {
        const teamsData = await getTeamsList();
        const teamList = document.getElementById("teams_list");
        teamList.innerHTML = "";
        teamsData.teams.map((team) => {
            const div = document.createElement("div");
            div.className = "club_list_name";

            const img = document.createElement("img");
            img.setAttribute("src", team.crestUrl);
            img.className = "club_list_icon";

            const li = document.createElement("li");
            li.className = "list_item";
            div.innerHTML = team.name;
            div.onclick = () => showCurrentClubInfo(teamsData, team.id);

            li.appendChild(img);
            li.appendChild(div);

            teamList.appendChild(li);
        });
    } catch (error) {
        console.log(error);
    }
};

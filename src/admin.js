//CRUD options
const body1 = document.querySelector("body");
const adminPanel = document.createElement("div");
adminPanel.setAttribute('class', 'admin-div')

const buttonFixer = document.createElement('button');
buttonFixer.setAttribute("class", "admin-button")
buttonFixer.innerText = 'DELETE ME'
body1.append(buttonFixer);

const adminBtn = buttonFixer;

//sets a "password" variable to be able to check against when attempting to enter admin mode
let password = "";

//gives the ability for to listen for particular letters after clicked on the admin button
adminBtn.onkeypress = logKey;
function logKey(e) {
  console.log(String.fromCharCode(e.which));
  password = password + String.fromCharCode(e.which);
  return password;
}

//initializes the password check
adminBtn.addEventListener("click", (event) => {
  console.log(event, "click");
  adminPanel.innerHTML = "";
  if (password === "rocketMan") {
    console.log("Entered Admin Functionality");
    console.log("-----------------ENTER MODAL FUNCTIONALITY HERE------------------------------------")
    password = "";
    defaultAdminPage();
  } else {
    console.log("Failed Password");
    password = "";
  }
});

//four button admin view
const defaultAdminPage = () => {
  adminPanel.innerHTML = "";

  //makes buttons for admin functions
  const exitBtn = document.createElement("button");
  const newBtn = document.createElement("button");
  const updateBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  // exitBtn.setAttribute("class", "exit-btn")
  // newBtn.setAttribute("class", "new-btn")
  // updateBtn.setAttribute("class", "update-btn")
  // deleteBtn.setAttribute("class", "delete-btn")

  exitBtn.innerText = "Exit";
  newBtn.innerText = "New";
  updateBtn.innerText = "Update";
  deleteBtn.innerText = "Delete";

  exitBtn.addEventListener("click", (event) => {
    closeAdminAbility(exitBtn, newBtn, updateBtn, deleteBtn);
  });

  newBtn.addEventListener("click", (event) => {
    makeNewSatellite();
  });

  updateBtn.addEventListener("click", (event) => {
    updateCurrentSatellite();
  });

  deleteBtn.addEventListener("click", (event) => {
    deleteCurrentSatellite();
  });

  // shows admin buttons
  adminPanel.append(newBtn, updateBtn, deleteBtn,  exitBtn);
  body1.append(adminPanel);
};

//function activates when new button is clicked
const closeAdminAbility = (exitBtn, newBtn, updateBtn, deleteBtn) => {
  adminPanel.innerHTML = "";
};

const makeNewSatellite = () => {
  adminPanel.innerHTML = "";
  const newFormDiv = document.createElement("div");
  newFormDiv.setAttribute("class", "editing-form")
  const newForm = document.createElement("form");

  //makes back button
  const backBtn = document.createElement("button");
  backBtn.innerText = "Back";
  backBtn.addEventListener("click", (event) => {
    defaultAdminPage();
  });

  newForm.setAttribute("method", "post");
  newForm.setAttribute("action", "submit");

  let sName = document.createElement("input"); //input element, text
  sName.setAttribute("type", "text");
  sName.setAttribute("placeholder", "Name");
  sName.setAttribute("name", "name");

  let sColor = document.createElement("input"); //input element, text
  sColor.setAttribute("type", "text");
  sColor.setAttribute("placeholder", "Color ID 1, 2 or 3");
  sColor.setAttribute("name", "color");

  let sNumber = document.createElement("input"); //input element, text
  sNumber.setAttribute("type", "text");
  sNumber.setAttribute("placeholder", "Sat Number");
  sNumber.setAttribute("name", "number");

  let sDesig = document.createElement("input"); //input element, text
  sDesig.setAttribute("type", "text");
  sDesig.setAttribute("placeholder", "Int'l Designator");
  sDesig.setAttribute("name", "desig");

  let sOwner = document.createElement("input"); //input element, text
  sOwner.setAttribute("type", "text");
  sOwner.setAttribute("placeholder", "Owner");
  sOwner.setAttribute("name", "owner");

  let sCat = document.createElement("input"); //input element, text
  sCat.setAttribute("type", "number");
  sCat.setAttribute("placeholder", "Category ID");
  sCat.setAttribute("name", "category_id");

  let sMission = document.createElement("input"); //input element, text
  sMission.setAttribute("type", "text");
  sMission.setAttribute("placeholder", "Mission");
  sMission.setAttribute("name", "mission");

  let sLaunchDate = document.createElement("input"); //input element, text
  sLaunchDate.setAttribute("type", "text");
  sLaunchDate.setAttribute("placeholder", "Launch Date");
  sLaunchDate.setAttribute("name", "date");

  let sLaunchSite = document.createElement("input"); //input element, text
  sLaunchSite.setAttribute("type", "text");
  sLaunchSite.setAttribute("placeholder", "Launch Site");
  sLaunchSite.setAttribute("name", "site");

  let sPeriod = document.createElement("input"); //input element, text
  sPeriod.setAttribute("type", "text");
  sPeriod.setAttribute("placeholder", "Period");
  sPeriod.setAttribute("name", "period");

  let sPerigree = document.createElement("input"); //input element, text
  sPerigree.setAttribute("type", "text");
  sPerigree.setAttribute("placeholder", "Perigree");
  sPerigree.setAttribute("name", "perigree");

  let sApogee = document.createElement("input"); //input element, text
  sApogee.setAttribute("type", "text");
  sApogee.setAttribute("placeholder", "Apogee");
  sApogee.setAttribute("name", "apogee");

  let sIncl = document.createElement("input"); //input element, text
  sIncl.setAttribute("type", "text");
  sIncl.setAttribute("placeholder", "Inclination");
  sIncl.setAttribute("name", "inclination");

  let sX = document.createElement("input"); //input element, text
  sX.setAttribute("type", "number");
  sX.setAttribute("placeholder", "X Coordinate");
  sX.setAttribute("name", "x_coor");

  let sY = document.createElement("input"); //input element, text
  sY.setAttribute("type", "number");
  sY.setAttribute("placeholder", "Y Coordinate");
  sY.setAttribute("name", "y_coor");

  let sZ = document.createElement("input"); //input element, text
  sZ.setAttribute("type", "number");
  sZ.setAttribute("placeholder", "Z Coordinate");
  sZ.setAttribute("name", "z_coor");

  let s = document.createElement("input"); //input element, Submit button
  s.setAttribute("type", "submit");
  s.setAttribute("value", "Submit");

  newForm.append(
    sName,
    sColor,
    sNumber,
    sDesig,
    sOwner,
    sCat,
    sMission,
    sLaunchDate,
    sLaunchSite,
    sPeriod,
    sPerigree,
    sApogee,
    sIncl,
    sX,
    sY,
    sZ,
    s
  );

  newFormDiv.append(newForm, backBtn);
  adminPanel.append(newFormDiv);

  newForm.addEventListener("submit", (event) => {
    event.preventDefault();

    bodyObj = {
      satellite: {
        name: event.target[0].value,
        color: event.target[1].value,
        satellite_number: event.target[2].value,
        international_designator: event.target[3].value,
        owner: event.target[4].value,
        category_id: event.target[5].value,
        mission: event.target[6].value,
        launch_date: event.target[7].value,
        launch_site: event.target[8].value,
        period: event.target[9].value,
        perigree: event.target[10].value,
        apogee: event.target[11].value,
        inclination: event.target[12].value,
        x_coor: event.target[13].value,
        y_coor: event.target[14].value,
        z_coor: event.target[15].value,
      },
    };

    fetchObj = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(bodyObj),
    };

    console.log("submitted", event);
    // debugger
    fetch("http://localhost:3000/satellites", fetchObj)
      .then((resp) => resp.json())
      .then((data) => console.log("BACK", data));
  });
};

///updates satellite
const updateCurrentSatellite = () => {
  adminPanel.innerHTML = "";
  const backBtn = document.createElement("button");
  backBtn.innerText = "Back";
  backBtn.addEventListener("click", (event) => {
    defaultAdminPage();
  });

  let fieldD = document.createElement("input"); //input element, text
  fieldD.setAttribute("type", "text");
  fieldD.setAttribute("placeholder", "Enter id of Satellite");
  fieldD.setAttribute("name", "id");

  let s = document.createElement("button"); //input element, Submit button
  s.innerText = "Get Update Form";

  adminPanel.append(fieldD, s, backBtn);

  s.addEventListener("click", (event) => {
    event.preventDefault();
    let id = fieldD.value;
    if (id) {
      //if there is an id it will fetch to prevent empty requests
      fetch(`http://localhost:3000/satellites/${id}`, { method: "GET" })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data), renderUpdateForm(data);
        });
    }
  });

  const renderUpdateForm = (data) => {
    ////////put update form here with values set to attributes
    adminPanel.innerHTML = "";
    const newFormDiv = document.createElement("div");
    const newForm = document.createElement("form");

    //makes back button
    const backBtn = document.createElement("button");
    backBtn.innerText = "Back";
    backBtn.addEventListener("click", (event) => {
      defaultAdminPage();
    });

    //makes update form with populated data
    newForm.setAttribute("method", "patch");
    newForm.setAttribute("action", "submit");

    let sName = document.createElement("input"); //input name, text
    sName.setAttribute("type", "text");
    sName.setAttribute("value", data.name);
    sName.setAttribute("name", "name");

    let sColor = document.createElement("input"); //input color, text
    sColor.setAttribute("type", "text");
    sColor.setAttribute("value", data.color);
    sColor.setAttribute("name", "color");

    let sNumber = document.createElement("input"); //input number, text
    sNumber.setAttribute("type", "text");
    sNumber.setAttribute("value", data.satellite_number);
    sNumber.setAttribute("name", "number");

    let sDesig = document.createElement("input"); //input desig, text
    sDesig.setAttribute("type", "text");
    sDesig.setAttribute("value", data.international_designator);
    sDesig.setAttribute("name", "desig");

    let sOwner = document.createElement("input"); //input owner, text
    sOwner.setAttribute("type", "text");
    sOwner.setAttribute("value", data.owner);
    sOwner.setAttribute("name", "owner");

    let sCat = document.createElement("input"); //input category_id, text
    sCat.setAttribute("type", "number");
    sCat.setAttribute("value", data.category_id);
    sCat.setAttribute("name", "category_id");

    let sMission = document.createElement("input"); //input mission, text
    sMission.setAttribute("type", "text");
    sMission.setAttribute("value", data.mission);
    sMission.setAttribute("name", "mission");

    let sLaunchDate = document.createElement("input"); //input date, text
    sLaunchDate.setAttribute("type", "text");
    sLaunchDate.setAttribute("value", data.launch_date);
    sLaunchDate.setAttribute("name", "date");

    let sLaunchSite = document.createElement("input"); //input site, text
    sLaunchSite.setAttribute("type", "text");
    sLaunchSite.setAttribute("value", data.launch_site);
    sLaunchSite.setAttribute("name", "site");

    let sPeriod = document.createElement("input"); //input period, text
    sPeriod.setAttribute("type", "text");
    sPeriod.setAttribute("value", data.period);
    sPeriod.setAttribute("name", "period");

    let sPerigree = document.createElement("input"); //input perigree, text
    sPerigree.setAttribute("type", "text");
    sPerigree.setAttribute("value", data.perigree);
    sPerigree.setAttribute("name", "perigree");

    let sApogee = document.createElement("input"); //input apogee, text
    sApogee.setAttribute("type", "text");
    sApogee.setAttribute("value", data.apogee);
    sApogee.setAttribute("name", "apogee");

    let sIncl = document.createElement("input"); //input inclination, text
    sIncl.setAttribute("type", "text");
    sIncl.setAttribute("value", data.inclination);
    sIncl.setAttribute("name", "inclination");

    let sX = document.createElement("input"); //input x_coor, text
    sX.setAttribute("type", "number");
    sX.setAttribute("value", data.x_coor);
    sX.setAttribute("name", "x_coor");

    let sY = document.createElement("input"); //input y_coor, text
    sY.setAttribute("type", "number");
    sY.setAttribute("value", data.y_coor);
    sY.setAttribute("name", "y_coor");

    let sZ = document.createElement("input"); //input z_coor, text
    sZ.setAttribute("type", "number");
    sZ.setAttribute("value", data.z_coor);
    sZ.setAttribute("name", "z_coor");

    let s = document.createElement("input"); //input element, Submit button
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Update");

    newForm.append(
      sName,
      sColor,
      sNumber,
      sDesig,
      sOwner,
      sCat,
      sMission,
      sLaunchDate,
      sLaunchSite,
      sPeriod,
      sPerigree,
      sApogee,
      sIncl,
      sX,
      sY,
      sZ,
      s
    );

    newFormDiv.append(newForm, backBtn);
    adminPanel.append(newFormDiv);

    newForm.addEventListener("submit", (event) => {
      event.preventDefault();

      //fetch objects in variables below before fetch is run
      bodyObj = {
        satellite: {
          name: event.target[0].value,
          color: event.target[1].value,
          satellite_number: event.target[2].value,
          international_designator: event.target[3].value,
          owner: event.target[4].value,
          category_id: event.target[5].value,
          mission: event.target[6].value,
          launch_date: event.target[7].value,
          launch_site: event.target[8].value,
          period: event.target[9].value,
          perigree: event.target[10].value,
          apogee: event.target[11].value,
          inclination: event.target[12].value,
          x_coor: event.target[13].value,
          y_coor: event.target[14].value,
          z_coor: event.target[15].value,
        },
      };

      fetchObj = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(bodyObj),
      };

      console.log("submitted update");
      // debugger
      fetch(`http://localhost:3000/satellites/${data.id}`, fetchObj)
        .then((resp) => resp.json())
        .then((data) => console.log("Updated", defaultAdminPage()));
    });
  };
};

const deleteCurrentSatellite = () => {
  adminPanel.innerHTML = "";
  const deleteFormDiv = document.createElement("div");
  const deleteForm = document.createElement("div");
  const backBtn = document.createElement("button");
  backBtn.innerText = "Back";
  backBtn.addEventListener("click", (event) => {
    defaultAdminPage();
  });

  let fieldD = document.createElement("input"); //input element, text
  fieldD.setAttribute("type", "text");
  fieldD.setAttribute("placeholder", "Enter id of Satellite");
  fieldD.setAttribute("name", "id");

  let s = document.createElement("button"); //input element, Submit button
  s.innerText = "Delete";

  deleteForm.append(fieldD, s);
  deleteFormDiv.append(deleteForm, backBtn);
  adminPanel.append(deleteFormDiv);

  s.addEventListener("click", (event) => {
    event.preventDefault();
    let id = fieldD.value;
    fetch(`http://localhost:3000/satellites/${id}`, { method: "delete" })
      .then((resp) => resp.json())
      .then((data) => console.log("back from Delete", data));
  });
};

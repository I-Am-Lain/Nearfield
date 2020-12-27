'strict';

// copied this over to near_field.js


// let body = document.getElementById('body')
// let title = document.createElement('div')
// let container = document.createElement('div')
// title.id='title'
// container.id='container'
// title.innerHTML = '<p>Near Field Objects</p>'
// body.appendChild(title)
// body.appendChild(container)



// this is just added to the model if developer wants to find an object. id passed through is the backend db primary key
function find3dObject(id) {
  NEAR_FIELD_OBJECTS.scene.children.forEach(child => {
    if(child.name == id){
      console.log(child)
      console.log(child.userData)
    }
  })
}

//hides category "active, inactive, debris". You must pass through the category name as a string --> ex. "active" otherwise will throw an error
function hideCategory(category) {
  NEAR_FIELD_OBJECTS.scene.children.forEach(child => {
    if (child.userData == category)
    child.visible = false
  })
}

//shows category "active, inactive, debris" if previously hidden. You must pass through the category name as a string --> ex. "active" otherwise will throw an error
function showCategory(category) {
  NEAR_FIELD_OBJECTS.scene.children.forEach(child => {
    if (child.userData == category)
    child.visible = true
  })
}

//iterates through model and sets all child elements visibility to true. Nothing needs to be passed through
function showAllCategories(){
  NEAR_FIELD_OBJECTS.scene.children.forEach(child => {
    child.visible = true
  })
}


//will increase individual dot scaling for front-end manipulation. id passed through is the backend db primary key 
function onHover(id){
  NEAR_FIELD_OBJECTS.scene.children.forEach(child => {
    if (child.name == id){
      child.scale.x = 5
      child.scale.y = 5
      child.scale.z = 5
    }
  })
}

//theoretically to be called after onHover() to reset scaling back to default for individual dot. id passed through is the backend db primary key
function defaultScale(id) {
  NEAR_FIELD_OBJECTS.scene.children.forEach(child => {
    if (child.name == id){
      child.scale.x = 1
      child.scale.y = 1
      child.scale.z = 1
    }
  })
}









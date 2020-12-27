'strict';

let body = document.getElementById('body');
let container = document.createElement('div');
container.id='container';
body.appendChild(container);

let myData; // maybe let, i want to access this on my JS page

let NEAR_FIELD_OBJECTS;
let GLOBAL_SCALING = 60;
NEAR_FIELD_OBJECTS = NEAR_FIELD_OBJECTS || {};


NEAR_FIELD_OBJECTS.Globe = function(container, colorFn){
  colorFn = colorFn || function(x){
      let initColor = new THREE.color();
      //debugger
      initColor.setHSL(1.0, 1.0, 1.0);  
      return initColor;
  };

  let camera;
  let scene;
  let renderer;
  let w;
  let h;
  let mesh;
  let curZoomSpeed = 0;
  let overRenderer;
  let mouse = {x: 0, y:0};
  let mouseOnDown = {x: 0, y: 0};
  let rotation = {x: 0, y: 0};
  let target = {x: Math.PI*3/2, y: Math.PI / 6.0};
  let targetOnDown = {x: 0, y: 0};

  let distance = 100000;
  let distanceTarget = 100000;
  let PI_HALF = Math.PI/2;

  let Shaders = {    
    'orb' : {      
      uniforms: {   
        'texture': { type: 't', value: null }  
      },
      vertexShader: [    
        'varying vec3 vNormal;',  
        'varying vec2 vUv;',  
        'void main() {',    
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
          'vNormal = normalize( normalMatrix * normal );',   
          'vUv = uv;',   
        '}'
      ].join('\n'),   
      fragmentShader: [    
        'uniform sampler2D texture;',   
        'varying vec3 vNormal;',    
        'varying vec2 vUv;',     
        'void main() {',     
          'vec3 diffuse = texture2D( texture, vUv ).xyz;',    
          'float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
          'vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );',
          'gl_FragColor = vec4( diffuse + atmosphere, 1.0 );',
        '}'
      ].join('\n')
    },
    'atmosphere' : {
      uniforms: {},
      vertexShader: [
        'varying vec3 vNormal;',
        'void main() {',
          'vNormal = normalize( normalMatrix * normal );',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec3 vNormal;',
        'void main() {',
          'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );',
          'gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;',
        '}'
      ].join('\n')
    }
  };

  function init() {
    let shader;
    let uniforms;
    let material;
    w = container.offsetWidth || window.innerWidth;
    h = container.offsetHeight || window.innerHeight;
    camera = new THREE.PerspectiveCamera(30, w / h, 1, 10000);
    camera.position.z = distance;
    scene = new THREE.Scene();
    let  geometry = new THREE.SphereGeometry(GLOBAL_SCALING, 40, 30);
    shader = Shaders['orb'];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);
    uniforms['texture'].value = THREE.ImageUtils.loadTexture('world.jpg')
    material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    });

    //this mesh is the Earth 
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = Math.PI;
    scene.add(mesh);

    shader = Shaders['atmosphere'];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);
    material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    //this mesh give earth its aura
    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set( 1.1, 1.1, 1.1 );
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(w, h);
    renderer.domElement.style.position = 'absolute';
    container.appendChild(renderer.domElement);
    container.addEventListener('mousedown', onMouseDown, false);
    container.addEventListener('mousewheel', onMouseWheel, false);
    window.addEventListener('resize', onWindowResize, false);

    container.addEventListener('mouseover', function (){
      overRenderer = true;
      }, false);

    container.addEventListener('mouseout', function (){
      overRenderer = false;
    }, false);

  };

  addData = function(data){
    let lat;
    let lng;
    let size;
    let color;
    let i;
    let step = 5;
    let colorFnWrapper;
    let satId;

    colorFnWrapper = function(data, i) {
      return colorFn(data[i+3]);
    }

    let min_size = 10000000000;
    let max_size = 0;

    for(i = 0; i < data.length; i += step){
      lat = data[i];
      lng = data[i + 1];

      color = colorFnWrapper(data, i);
      size = data[i + 2];
      size = size * GLOBAL_SCALING;

      satId = data[i + 4]

      addPoint(lat, lng, size, color, satId);
      min_size = Math.min(min_size, size);
      max_size = Math.max(max_size, size);
      
    };
  };

  //adds dots to the scene based on sat field positioning
  function addPoint(lat, lng, size, color, id) {
    geometry = new THREE.CubeGeometry(0.60, 0.60, 0.75);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-0.5));
    point = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
      color:0xffffff,
      vertexColors: THREE.FaceColors,
      morphTargets: false
    }));
    let phi = (90 - lat) * Math.PI / 180; 
    let theta = (180 - lng) * Math.PI / 180;
    let r = ((1 + (size / 100.0)) * GLOBAL_SCALING);
    point.position.x = r * Math.sin(phi) * Math.cos(theta);
    point.position.y = r * Math.cos(phi);
    point.position.z = r * Math.sin(phi) * Math.sin(theta);
    if (color.r === 0 && color.g === 1 && color.b === 0){
      point.userData = 'active'
    }
    if (color.r === 0.8588235294117647 && color.g === 0.043137254901960784 && color.b === 0){
      point.userData = 'debris'
    }
    if (color.r === 0.6 && color.g === 0.6 && color.b === 0.6){
      point.userData = 'inactive'
    }
    point.name = `${id}`
    // point.name = `${id}`;
    point.lookAt(mesh.position);
    point.updateMatrix();
    for (let i = 0; i < point.geometry.faces.length; i++){
       point.geometry.faces[i].color = color
    }
    scene.add(point)    
  };

  
  function onMouseDown(event) {
    event.preventDefault();
    container.addEventListener('mousemove', onMouseMove, false);
    container.addEventListener('mouseup', onMouseUp, false);
    container.addEventListener('mouseout', onMouseOut, false);
    mouseOnDown.x = - event.clientX;
    mouseOnDown.y = event.clientY;
    targetOnDown.x = target.x;
    targetOnDown.y = target.y;
    container.style.curser = 'move'
  }

  function onMouseMove(event) {
    mouse.x = - event.clientX;
    mouse.y = event.clientY;
    let zoomDamp = distance/1000;
    target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
    target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;
    target.y = target.y > PI_HALF ? PI_HALF : target.y;
    target.y = target.y < - PI_HALF ? - PI_HALF : target.y;
  }

  function onMouseUp(event) {
    container.removeEventListener('mousemove', onMouseMove, false);
    container.removeEventListener('mouseup', onMouseUp, false);
    container.removeEventListener('mouseout', onMouseOut, false);
    container.style.cursor = 'auto';
  }

  function onMouseOut(event) {
    container.removeEventListener('mousemove', onMouseMove, false);
    container.removeEventListener('mouseup', onMouseUp, false);
    container.removeEventListener('mouseout', onMouseOut, false);
  }

  function onMouseWheel(event){
    event.preventDefault();
    if(overRenderer){
      zoom(event.wheelDeltaY * 0.3);
    }
    return false;
  }

  function onWindowResize(event){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  function zoom(delta){
    distanceTarget -= delta;
    distanceTarget = distanceTarget > 1000 ? 1000 : distanceTarget;
    distanceTarget = distanceTarget < 350 ? 350 : distanceTarget;
  };

  function animate(){
    requestAnimationFrame(animate);
    render();
  };

  function render(){
    zoom(curZoomSpeed);
    rotation.x += (target.x - rotation.x) * 0.1;
    rotation.y += (target.y - rotation.y) * 0.1;
    distance += (distanceTarget - distance) * 0.3;
    camera.position.x = distance * Math.sin(rotation.x) * Math.cos(rotation.y);
    camera.position.y = distance * Math.sin(rotation.y);
    camera.position.z = distance * Math.cos(rotation.x) * Math.cos(rotation.y);
    camera.lookAt(mesh.position);
    renderer.render(scene, camera);
  };

  init();
  this.animate = animate;
  this.addData = addData;
  this.renderer = renderer;
  this.scene = scene;
  return this;
};

let globe = NEAR_FIELD_OBJECTS.Globe(document.getElementById('container'), function(label) {
  return new THREE.Color([0x300FF00, 0x999999, 0xdb0b00][label]);
});


let dataArray = []

// fetch("http://localhost:3000/satellites")
//   .then(resp => resp.json())
//   .then(satData => {
//         myData = satData // setting global variable to reference later
//         main() // running my code, after we've assuredly set the global
//         satData.forEach(sat => {
//         parseData(sat.x_coor, sat.y_coor, sat.z_coor, sat.color, sat.id)
//       })
//       window.data = dataArray;
//       globe.addData(dataArray);
//       globe.animate(); // we don't have to constantly animate, right?
//       document.body.style.backgroundImage = 'none';
//   })

myData = JSON.parse(data) // setting global variable to reference later
// main() // running my code, after we've assuredly set the global
myData.forEach(sat => {
parseData(sat.x_coor, sat.y_coor, sat.z_coor, sat.color, sat.id)
})
window.data = dataArray;
globe.addData(dataArray);
globe.animate(); // we don't have to constantly animate, right?
document.body.style.backgroundImage = 'none';

function parseData(x, y, z, color, id) {
  zScaled = ((z * 11.221461011087312) / 71571600.474816)
  dataArray.push(y)
  dataArray.push(x)
  dataArray.push(zScaled)
  dataArray.push(color)
  dataArray.push(id)
  return dataArray
}







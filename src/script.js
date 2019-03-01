import OrbitControls from "three-orbitcontrols";
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer({ antialias: true });

let forCanvas = document.querySelector(".canv");

renderer.setSize(forCanvas.offsetWidth, forCanvas.offsetHeight);

forCanvas.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

//OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;

// LIGHTS
var light = new THREE.DirectionalLight(0xaabbff, 0.3);
light.position.x = 300;
light.position.y = 250;
light.position.z = -500;
scene.add(light);

//For create object
let func = obj => {
  let para = document.createElement("div");

  para.className = `del`;
  para.setAttribute("id", obj.uuid);
  let node = document.createTextNode(`(X) => ${obj.uuid}`);
  para.appendChild(node);
  list.appendChild(para);
  let del = document.querySelector(".del");

  obj.name = obj.uuid;

  array.push(obj.uuid);
  console.log(array);

  list.onclick = event => {
    let target = event.target;

    if (target.className != "del") {
      return;
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i] === target.id) target.style.display = "none";
      scene.remove(scene.getObjectByName(target.id));
    }
  };
};

//for button create
let elem = document.querySelector(".btn_Create");
//get value from down-list (cube,pyramid...)
let name = document.querySelector("#name");
//get value scale
let scale = document.querySelector(".scale");
//list uuid of objects
let list = document.querySelector(".list");
//array for uuid
let array = [];

//for button Create
elem.onclick = () => {
  if (scale.value > 0 && scale.value < 11) {
    switch (name.options[name.selectedIndex].value) {
      case "Cube":
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        let cube = new THREE.Mesh(geometry, material);

        cube.position.z = -15;
        cube.scale.set(scale.value, scale.value, scale.value);
        cube.position.x = Math.floor(Math.random() * 10);
        cube.position.y = Math.floor(Math.random() * 10);
        cube.rotation.x = 0;
        cube.rotation.y = 0;
        scene.add(cube);

        //create object
        func(cube);

        let render3 = () => {
          requestAnimationFrame(render3);
          cube.rotation.x += 0.0;
          cube.rotation.y += 0.01;

          renderer.render(scene, camera);
        };
        renderer.render(scene, camera);
        render3();

        break;
      case "Pyramid":
        let radius = 4;
        let height = 5;

        let geometry1 = new THREE.CylinderGeometry(0, radius, height, 4, 1);
        let material1 = new THREE.MeshNormalMaterial();
        let pyramid = new THREE.Mesh(geometry1, material1);
        pyramid.position.z = -15;
        pyramid.position.x = Math.floor(Math.random() * 31) - 22;
        pyramid.position.y = Math.floor(Math.random() * 31) - 22;
        pyramid.scale.set(scale.value, scale.value, scale.value);
        scene.add(pyramid);

        camera.position.z = 10;
        //create object
        func(pyramid);

        let render = () => {
          requestAnimationFrame(render);
          pyramid.rotation.x += 0.0;
          pyramid.rotation.y += 0.01;

          renderer.render(scene, camera);
        };

        renderer.render(scene, camera);

        render();

        break;
      case "Scope":
        let geometry2 = new THREE.SphereGeometry(
          3,
          50,
          50,
          0,
          Math.PI * 2,
          0,
          Math.PI * 2
        );
        let material2 = new THREE.MeshNormalMaterial();
        let scope = new THREE.Mesh(geometry2, material2);
        scope.position.z = -15;
        scope.position.x = Math.floor(Math.random() * 31) - 22;
        scope.position.y = Math.floor(Math.random() * 31) - 22;
        scope.scale.set(scale.value, scale.value, scale.value);
        scene.add(scope);
        //create object
        func(scope);

        renderer.render(scene, camera);

        let render1 = () => {
          requestAnimationFrame(render1);
          scope.rotation.x += 0.0;
          scope.rotation.y += 0.01;

          renderer.render1(scene, camera);
        };

        camera.position.z = 10;
        render1();

        break;
      default:
        alert("Я таких значений не знаю");
    }
  } else {
    alert("Scale from 1 to 10");
  }
};

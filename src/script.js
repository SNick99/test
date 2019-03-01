var scene = new THREE.Scene();
//var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight);
var renderer = new THREE.WebGLRenderer({antialias: true});

var forCanvas = document.querySelector('.canv');


renderer.setSize(forCanvas.offsetWidth, forCanvas.offsetHeight);

forCanvas.appendChild(renderer.domElement);


camera = new THREE.PerspectiveCamera( 75,window.innerWidth/window.innerHeight);
				
				// controls
				controls = new THREE.OrbitControls( camera, renderer.domElement );
				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.25;
				controls.screenSpacePanning = false;
				controls.minDistance = 100;
				controls.maxDistance = 500;
        controls.maxPolarAngle = Math.PI / 2;
        


  var func = (obj) => {
          var para = document.createElement("div");
          
          para.className = `del`;
          para.setAttribute("id", obj.uuid);
          var node = document.createTextNode(`(X) => ${obj.uuid}`);
          para.appendChild(node);
          list.appendChild(para);
          let del=document.querySelector( '.del' );
    
          obj.name = obj.uuid;
          
          array.push(obj.uuid);
          console.log(array);
    
          list.onclick = function(event) {
            var target = event.target;
    
             if (target.className != 'del') {return;}
              for(let i=0; i<array.length; i++){
    
                if(array[i]===target.id)
            
                  target.style.display = 'none';
                  scene.remove(scene.getObjectByName(target.id));
              }
            
            
          };
  }



var elem = document.querySelector('.btn_Create');
var name = document.querySelector('#name');
var scale= document.querySelector( '.scale' );
var list= document.querySelector( '.list' );
var array = [];


elem.onclick = function() {
  switch (name.options[name.selectedIndex].value) {
    case 'Cube':
      var geometry = new THREE.BoxGeometry(1,1,1);
      var material = new THREE.MeshBasicMaterial({color: 0xff0000});
      var cube = new THREE.Mesh(geometry,material);
      
      cube.position.z = -10;
      cube.scale.set(scale.value,scale.value,scale.value);
      cube.position.x = Math.floor(Math.random() * 10);
      cube.position.y = Math.floor(Math.random() * 10); 
      cube.rotation.x = 0;
      cube.rotation.y = 0;
      scene.add(cube);

    


      renderer.render(scene,camera);

   

    func(cube);
     
      

      var animate = () => {
      cube.rotation.x += 0.01;
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
      }
      
      animate();
    break;
    case 'Pyramid':
     ////////////////////////////////////////
     var radius = 4;
     var height = 5;
     

     var geometry = new THREE.CylinderGeometry(0, radius, height, 4, 1)
     var material = new THREE.MeshNormalMaterial();
     var pyramid = new THREE.Mesh(geometry, material);
     pyramid.position.z = -10;
     pyramid.position.x = Math.floor(Math.random() * 10);
     pyramid.position.y = Math.floor(Math.random() * 10); 
     pyramid.scale.set(scale.value, scale.value, scale.value);
     scene.add(pyramid);
     
     camera.position.z = 10;


      func(pyramid);
        

     var render = function () {
         requestAnimationFrame(render);
         pyramid.rotation.x += 0.00;
         pyramid.rotation.y += 0.01;

         renderer.render(scene, camera);
     };

     render();

    break;
    case 'Scope':
      
    var geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    var material = new THREE.MeshNormalMaterial();
    var scope = new THREE.Mesh(geometry, material);
    scope.position.z = -10;
    scope.position.x = Math.floor(Math.random() * 10);
    scope.position.y = Math.floor(Math.random() * 10); 
    scope.scale.set(scale.value, scale.value, scale.value);
    scene.add(scope);

     func(scope)

    camera.position.z = 10;
    var render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    render();

      break;
    default:
      alert( 'Я таких значений не знаю' );
  }
}




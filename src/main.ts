
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader, OrbitControls } from 'three/examples/jsm/Addons.js';



const loader = new FontLoader();
const scene = new THREE.Scene();
scene.background = new THREE.Color("#E3F4F4");
const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1500 );
camera.position.set( 0, 500, 1000 );
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

loader.load( 'fonts/droid/droid_serif_regular.typeface.json', function ( font ) {
  
	const textGeometry = new TextGeometry( 'Presidio', {
		font: font,
		size: 80,
		depth: 1,
		curveSegments: 50,
		bevelEnabled: true,
		bevelThickness: 2,
		bevelSize: 6,
		bevelOffset: 0,
		bevelSegments: 5
	} );

  textGeometry.center();

  const material = new THREE.MeshBasicMaterial( { color: "#0077b6" } );
  const text = new THREE.Mesh( textGeometry, material,  );
  text.position.x = 1;
  text.position.y = 80;
  scene.add( text );
} );

loader.load( 'fonts/droid/droid_serif_regular.typeface.json', function ( font ) {

	const textGeometry = new TextGeometry( 'Future Built !', {
		font: font,
		size: 40,
		depth: 1,
		curveSegments: 50,
		bevelEnabled: true,
		bevelThickness: 5,
		bevelSize: 1,
		bevelOffset: 0,
		bevelSegments: 5
	} );

  textGeometry.center();

  const material = new THREE.MeshBasicMaterial( { color: "#0077b6" } );
  const text = new THREE.Mesh( textGeometry, material );
  text.position.x = 150;
  text.position.y = -35;
  scene.add( text );
} );

const amount = 200;
const radius = 500;
let imageWidth = 20, imageHeight = 25;

const group = new THREE.Group();

const material = new THREE.SpriteMaterial();
material.color = new THREE.Color( "#0077b6"  ) 

for ( let a = 0; a < amount; a ++ ) {

	const x = Math.random() - 0.5;
	const y = Math.random() - 0.5;
	const z = Math.random() - 0.5;

	const sprite = new THREE.Sprite( material );

	sprite.position.set( x, y, z );
	sprite.position.normalize();
	sprite.position.multiplyScalar( radius );

	// individual rotation per sprite
	sprite.userData.rotation = 0;

	group.add( sprite );
}

scene.add( group );

renderer.setSize( window.innerWidth, window.innerHeight );


renderer.render( scene, camera );


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const renderLoop = () => {
  requestAnimationFrame(renderLoop);
  controls.update();
  renderer.render(scene, camera);

  const time = Date.now() / 1000;

  for ( let i = 0, l = group.children.length; i < l; i ++ ) {

    const sprite = group.children[ i ];
    const scale = Math.sin( time + sprite.position.x * 0.01 ) * 0.3 + 1.0;

    sprite.userData.rotation += 0.1 * ( i / l );
    sprite.scale.set( scale * imageWidth, scale * imageHeight, 1.0 );

  }

  group.rotation.x = time * 0.5;
  group.rotation.y = time * 0.75;
  group.rotation.z = time * 1.0;
}

renderLoop();

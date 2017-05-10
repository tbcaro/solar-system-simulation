function SolarSystem() {
  return {
    /**
    *
    */
    init: function() {
      // TBC : Setup threejs required entities
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      this.renderer = new THREE.WebGLRenderer();

      // TBC : Setup orbital control system
      this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 1;
      this.controls.enableZoom = true;

      // TBC : Set renderer sizes and camera position
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.camera.position.z = 200;

      // TBC : Add objects to scene
      this.seedStar();
      this.seedPlanets();
      this.seedMoons();

      // TBC : Add render canvas to DOM
      document.body.appendChild( this.renderer.domElement );
    },
    /**
    *
    */
    seedStar: function() {
      var geometry = new THREE.IcosahedronGeometry( 15, 5 );
      var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

      this.star = new THREE.Mesh( geometry, material );
      this.scene.add( this.star );

      // TBC : Also add light
      // this.scene.add( new THREE.AmbientLight( 0x404040 ) ); // soft white light
      this.scene.add( new THREE.AmbientLight( 0x707070 ) );
      this.scene.add( new THREE.PointLight( 0xffffff, 1, 100 ) );
    },
    /**
    *
    */
    seedPlanets: function() {
      this.planets = [];

      var geometry = new THREE.IcosahedronGeometry( 1, 5 );
      var material = new THREE.MeshStandardMaterial( { color: 0xff0000 } );

      var planet = new THREE.Mesh( geometry, material );
      planet.position.set( 50, 0, 0 );

      this.scene.add( planet );
      this.planets.push(planet);
    },
    /**
    *
    */
    seedMoons: function() {

    },
    /**
    *
    */
    animate: function() {
      
    },
    /**
    *
    */
    render: function() {
      requestAnimationFrame( () => { this.render() } );

      this.animate();

      this.renderer.render( this.scene, this.camera );
    },
    /**
    *
    */
    run: function() {
      this.init();
      this.render();
    }
  }
}

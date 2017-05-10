function SolarSystem () {
  return {
    /**
    *
    */
    init: function () {
      // TBC : Constants
      this.STAR_SIZE = 25;
      this.STAR_COLOR = 0xffff00;

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

      // TBC : Add render canvas to DOM
      document.body.appendChild( this.renderer.domElement );
    },
    /**
    *
    */
    seedStar: function () {
      var geometry = new THREE.IcosahedronGeometry( this.STAR_SIZE, 5 );
      var material = new THREE.MeshBasicMaterial( { color: this.STAR_COLOR } );

      this.star = new THREE.Mesh( geometry, material );
      this.scene.add( this.star );

      // TBC : Also add light
      this.scene.add( new THREE.AmbientLight( 0x707070 ) );
      this.scene.add( new THREE.PointLight( this.STAR_COLOR, 1, 100 ) );
    },
    /**
    *
    */
    seedPlanets: function () {
      const SPEED_MODIFIER = .25;
      // this.planets = { mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto };
      this.planets = { mercury: { } };


      for ( var p in this.planets ) {
        var rotSpeed;
        var orbSpeed;
        var orbRadius;
        var color;
        var size;
        var spherical;

        switch (p) {
          case 'mercury':
            rotSpeed = 1 / 58;
            orbSpeed = 2 * Math.PI * SPEED_MODIFIER / 88;
            orbRadius = this.STAR_SIZE + 10;
            color = 0xe2e2e2;
            size = 1.5;
            spherical = 0;
            break;

          // case 'venus':
          //   break;
          //
          // case 'earth':
          //   break;
        }

        var geometry = new THREE.IcosahedronGeometry( size, spherical );
        var material = new THREE.MeshStandardMaterial( { color: color } );

        var planet = new THREE.Mesh( geometry, material );
        planet.position.set( orbRadius, 0, 0 );
        planet.rotSpeed = rotSpeed;
        planet.orbSpeed = orbSpeed;
        planet.orbRadius = orbRadius;
        planet.orbPos = Math.random() * Math.PI * 2;

        this.scene.add( planet );
        this.planets[p] = planet;
      }
    },
    /**
    *
    */
    animate: function () {
      for ( var p in this.planets ) {
        var planet = this.planets[p];
        planet.rotation.y += planet.rotSpeed;
        planet.orbPos += planet.orbSpeed;
        planet.position.set(
          Math.cos(planet.orbPos) * planet.orbRadius,
          0,
          Math.sin(planet.orbPos) * planet.orbRadius
        )
      }
    },
    /**
    *
    */
    render: function () {
      requestAnimationFrame( () => { this.render() } );

      this.animate();

      this.renderer.render( this.scene, this.camera );
    },
    /**
    *
    */
    run: function () {
      this.init();
      this.render();
    }
  }
}

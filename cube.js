function SolarSystem () {
  return {
    /**
    *
    */
    init: function () {
      // TBC : Constants
      this.STAR_SIZE = 50;
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

      // TBC : Add objects to scene
      this.seedStar();
      this.seedPlanets();

      // TBC : Set renderer sizes and camera position
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.camera.position.y = 500;
      this.camera.lookAt( this.star.position );

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
      this.scene.add( new THREE.AmbientLight( 0xa0a0a0 ) );
      this.scene.add( new THREE.PointLight( this.STAR_COLOR, 1 ) );
    },
    /**
    *
    */
    seedPlanets: function () {
      const SPEED_MODIFIER = .10;
      this.planets = {
        mercury: { },
        venus: { },
        earth: { },
        mars: { },
        jupiter: { },
        saturn: { },
        uranus: { },
        neptune: { },
        pluto: { }
      };

      var orbitOffset = this.STAR_SIZE;

      for ( var p in this.planets ) {
        var rotSpeed;
        var orbSpeed;
        var orbRadius;
        var color;
        var size;
        var spherical;

        switch (p) {
          case 'mercury':
            size = 1.5;
            rotSpeed = 1 / 58 * SPEED_MODIFIER;
            orbSpeed = 2 * Math.PI / 88 * SPEED_MODIFIER;
            orbRadius = orbitOffset + size + size * 5;
            orbitOffset = orbRadius;
            color = 0xe2e2e2;
            spherical = 0;
            break;

          case 'venus':
            size = 3.7;
            rotSpeed = 1 / 116 * SPEED_MODIFIER;
            orbSpeed = 2 * Math.PI / 225 * SPEED_MODIFIER;
            orbRadius = orbitOffset + size + size * 5;
            orbitOffset = orbRadius;
            color = 0xee39e1c;
            spherical = 2;
            break;

          case 'earth':
            size = 3.9;
            rotSpeed = 1 * SPEED_MODIFIER;
            orbSpeed = 2 * Math.PI / 365 * SPEED_MODIFIER;
            orbRadius = orbitOffset + size + size * 5;
            orbitOffset = orbRadius;
            color = 0x6b93d6;
            spherical = 2;
            break;

          case 'mars':
            size = 2.1;
            rotSpeed = 1 * SPEED_MODIFIER;
            orbSpeed = 2 * Math.PI / 686 * SPEED_MODIFIER;
            orbRadius = orbitOffset + size + size * 5;
            orbitOffset = orbRadius;
            color = 0xc1440e;
            spherical = 0;
            break;

          case 'jupiter':
            size = 20;
            rotSpeed = 2.5 * SPEED_MODIFIER;
            orbSpeed = 2 * Math.PI / 900 * SPEED_MODIFIER;
            orbRadius = orbitOffset + size + size * 5;
            orbitOffset = orbRadius;
            color = 0xd8ca9d;
            spherical = 5;
            break;

          case 'saturn':
            size = 15;
            rotSpeed = 2 * SPEED_MODIFIER;
            orbSpeed = 2 * Math.PI / 1500 * SPEED_MODIFIER;
            orbRadius = orbitOffset + size + size * 5;
            orbitOffset = orbRadius;
            color = 0xead6b8;
            spherical = 5;
            break;

          case 'uranus':
            size = 7;
            rotSpeed = 1.5 * SPEED_MODIFIER;
            orbSpeed = 2 * Math.PI / 2000 * SPEED_MODIFIER;
            orbRadius = orbitOffset + size + size * 5;
            orbitOffset = orbRadius;
            color = 0xd1e7e7;
            spherical = 5;
            break;

          case 'neptune':
            size = 7;
            rotSpeed = 1.5 * SPEED_MODIFIER;
            orbSpeed = 2 * Math.PI / 2500 * SPEED_MODIFIER;
            orbRadius = orbitOffset + size + size * 5;
            orbitOffset = orbRadius;
            color = 0x5b5ddf;
            spherical = 5;
            break;

          case 'pluto':
            size = 0.7;
            rotSpeed = 1 / 7 * SPEED_MODIFIER;
            orbSpeed = 2 * Math.PI / 3000 * SPEED_MODIFIER;
            orbRadius = orbitOffset + size + size * 5;
            orbitOffset = orbRadius;
            color = 0x968570;
            spherical = 0;
            break;
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

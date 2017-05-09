function SolarSystem() {
  return {
    init: function() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      this.renderer = new THREE.WebGLRenderer();

      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.camera.position.z = 5;

      var geometry = new THREE.SphereGeometry( 1, 32, 32 );
      var material = new THREE.MeshNormalMaterial();
      this.sphere = new THREE.Mesh( geometry, material );
      this.scene.add( this.sphere );

      document.body.appendChild( this.renderer.domElement );
    },
    render: function() {
      requestAnimationFrame(() => { this.render() });

      this.sphere.rotation.x += 0.01;
    	this.sphere.rotation.y += 0.01;

      this.renderer.render(this.scene, this.camera);
    },
    run: function() {
      this.init();
      this.render();
    }
  }
}

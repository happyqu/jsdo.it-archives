// forked from cx20's "Three.js + Cannon.js でゴゴゴを落下させてみるテスト（その２）" http://jsdo.it/cx20/7GT5
// forked from cx20's "Three.js + Cannon.js でゴゴゴを落下させてみるテスト" http://jsdo.it/cx20/7lgA

var demo = new CANNON.Demo({
    particleSize: 0.5
});

var nx = 4,
    ny = 4,
    nz = 15,
    w = 10,
    h = 5,
    mass = 0.01;
var walls = true;

// Test scalability - add scenes for different number of particles
demo.addScene((nx * ny * nz) + " particles", function() {

    // Create world
    var world = demo.getWorld();
    var sph = new CANNON.SPHSystem();
    sph.density = 1;
    sph.viscosity = 0.03;
    sph.smoothingRadius = 1.0;
    world.subsystems.push(sph);

    // Tweak contact properties.
    world.defaultContactMaterial.contactEquationStiffness = 1e11; // Contact stiffness - use to make softer/harder contacts
    world.defaultContactMaterial.contactEquationRegularizationTime = 2; // Stabilization time in number of timesteps

    // Max solver iterations: Use more for better force propagation, but keep in mind that it's not very computationally cheap!
    world.solver.iterations = 10;

    world.gravity.set(0, 0, -10);

    // Materials
    var material = new CANNON.Material();
    var material_material = new CANNON.ContactMaterial(material,
        material,
        0.06, // friction
        0.0 // Restitution
    );
    world.addContactMaterial(material_material);

    // ground plane
    var groundShape = new CANNON.Plane();
    var groundBody = new CANNON.RigidBody(0, groundShape, material);
    world.add(groundBody);
    demo.addVisual(groundBody);

    if (walls) {

        // plane -x
        var planeShapeXmin = new CANNON.Plane();
        var planeXmin = new CANNON.RigidBody(0, planeShapeXmin, material);
        planeXmin.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
        planeXmin.position.set(-w * 0.5, 0, 0);
        world.add(planeXmin);

        // Plane +x
        var planeShapeXmax = new CANNON.Plane();
        var planeXmax = new CANNON.RigidBody(0, planeShapeXmax, material);
        planeXmax.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2);
        planeXmax.position.set(w * 0.5, 0, 0);
        world.add(planeXmax);

        // Plane -y
        var planeShapeYmin = new CANNON.Plane();
        var planeYmin = new CANNON.RigidBody(0, planeShapeYmin, material);
        planeYmin.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        planeYmin.position.set(0, -h * 0.5, 0);
        world.add(planeYmin);

        // Plane +y
        var planeShapeYmax = new CANNON.Plane();
        var planeYmax = new CANNON.RigidBody(0, planeShapeYmax, material);
        planeYmax.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
        planeYmax.position.set(0, h * 0.5, 0);
        world.add(planeYmax);
    }

    // Create particles
    var rand = 0.1;
    for (var i = 0; i !== nx; i++) {
        for (var j = 0; j !== ny; j++) {
            for (var k = 0; k !== nz; k++) {
                var particle = new CANNON.Particle(mass, material);
                particle.position.set((i + (Math.random() - 0.5) * rand + 0.5) * w / nx - w * 0.5, (j + (Math.random() - 0.5) * rand + 0.5) * h / ny - h * 0.5,
                    k * h / ny);
                world.add(particle);
                sph.add(particle);
                demo.addVisual(particle);
            }
        }
    }
});


demo.start();

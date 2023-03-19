class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  addParticle(pos, offset, force) {
    this.particles.push(new Particle(pos,offset, force));
  }

  run() {
    for (let particle of this.particles) {
      particle.run();
    }

//Filter will remove elements which fail the test
    this.particles = this.particles.filter(particle => !particle.isDead());
  }
}


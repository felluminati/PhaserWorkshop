import 'phaser';

// Phaser.GameObjects.Image
export default class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    // Store reference of scene passed to constructor
    this.scene = scene;
    // Add laser to scene and enable physics
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    // Set the lifespan of a laserbolt (in ms)
    this.lifespan = 0;
    // Set how fast the laser travels (pixels/ms)
    this.speed = Phaser.Math.GetSpeed(800, 1); // (distance in pixels, time (ms))
  }

  // Check which direction the player is facing and move the laserbolt in that direction as long as it lives
  update(direction, delta) {
    this.lifespan -= delta;
    if (this.direction === 'right') {
      this.x += this.speed * delta;
    } else {
      this.x -= this.speed * delta;
    }
    // If this laser has run out of lifespan, we "kill it" by deactivating it.
    // We can then reuse this laser object
    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  // Reset this laserbolt to start at a particular location and
  // fire in a particular direction
  reset(x, y, left) {
    this.setActive(true);
    this.setVisible(true);
    this.body.allowGravity = false;
    this.lifespan = 900;
    if (!left) {
      this.setPosition(x + 56, y + 14);
      this.direction = 'right';
    } else {
      this.setPosition(x - 56, y + 14);
      this.direction = 'left';
    }
  }
}

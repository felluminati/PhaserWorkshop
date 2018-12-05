import 'phaser';

// Phaser.GameObjects.Image
export default class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, facingLeft) {
    super(scene, x, y, spriteKey);
    // Store reference of scene passed to constructor
    this.scene = scene;
    // Add laser to scene and enable physics
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    // Set how fast the laser travels (pixels/ms)
    this.speed = Phaser.Math.GetSpeed(800, 1); // (distance in pixels, time (ms))

    // Our reset function will take care of initializing the remaining fields
    this.reset(x, y, 0, 0, facingLeft)
  }

  // Check which direction the player is facing and move the laserbolt in that direction as long as it lives
  update(time, delta) {
    this.lifespan -= delta;
    const moveDistance = this.speed * delta
    if (this.facingLeft) {
      this.x -= moveDistance
    } else {
      this.x += moveDistance
    }
    // If this laser has run out of lifespan, we "kill it" by deactivating it.
    // We can then reuse this laser object
    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  // Reset this laserbolt to start at a particular location and
  // fire in a particular direction. Anchor the starting point at
  // at the player's position plus an offset so that it looks like
  // it's starting from the gun
  reset(anchorX, anchorY, offsetX, offsetY, facingLeft) {
    this.setActive(true);
    this.setVisible(true);
    // Important to not apply gravity to the laser bolt!
    this.body.allowGravity = false;
    this.lifespan = 900;
    this.facingLeft = facingLeft
    if (facingLeft) {
      this.setPosition(anchorX - offsetX, anchorY + offsetY);
    } else {
      this.setPosition(anchorX + offsetX, anchorY + offsetY);
    }
  }
}

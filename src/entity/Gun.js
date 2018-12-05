import 'phaser';

export default class Gun extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    // Store reference of scene passed to constructor
    this.scene = scene;
    // Add gun to scene and enable physics
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    // Set the firing delay (ms)
    this.fireDelay = 100;
    // Keep track of when the gun was last fired
    this.lastFired = 0;
  }

  // Check if the shoot button is pushed and how long its been since last fired
  update(time, player, cursors, fireLaserFn, laserSound) {
    if (cursors.space.isDown && time > this.lastFired) {
      if (player.armed) {
        laserSound.play();
        fireLaserFn()
        this.lastFired = time + this.fireDelay;
      }
    }
  }
}

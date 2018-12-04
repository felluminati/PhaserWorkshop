import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    // Store reference of scene passed to constructor
    this.scene = scene;
    // Add player to scene and enable physics
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    // Armed?
    this.armed = false;
    // Is the player facing left?
    this.left = false;
    // Player can't walk off camera
    this.setCollideWorldBounds(true);
  }
  // Check which controller button is being pushed and execute movement & animation
  update(cursors, jumpSound) {
    if (cursors.left.isDown) {
      if (!this.left) {
        this.flipX = !this.flipX;
        this.left = true;
      }
      this.setVelocityX(-360);
      if (this.body.touching.down) {
        this.anims.play('run', true);
      }
    } else if (cursors.right.isDown) {
      if (this.left) {
        this.flipX = !this.flipX;
        this.left = false;
      }
      this.setVelocityX(360);

      if (this.body.touching.down) {
        this.anims.play('run', true);
      }
    } else {
      this.setVelocityX(0);
      if (!this.armed) {
        this.anims.play('idleUnarmed');
      } else {
        this.anims.play('idleArmed');
      }
    }
    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-800);
      jumpSound.play();
    }
    if (!this.body.touching.down) {
      this.anims.play('jump');
    }
  }
}

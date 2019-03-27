import Game from '../index'

export default class Model {
  // get width() {}

  // get height() {}

  get alive() {
    return this.hp > 0
  }
  public height: number
  public width: number

  public speedX: number
  public speedY: number

  private power: number
  private hp: number

  private clicked: boolean

  constructor(
    protected game: Game,
    public x: number = 0,
    public y: number = 0
  ) {
    this.height = 0
    this.width = 0

    this.speedX = 0
    this.speedY = 0

    this.hp = 1
    this.power = 1

    this.clicked = false
  }

  public render() {
    // this.game.renderModel(this)
  }

  public update() {
    this.checkSpeed()
  }

  public attacked(model: Model) {
    this.hp -= model.power
  }

  public go({ x, y }: { x: number; y: number }) {
    this.speedX = (x - this.x) / 100
    this.speedY = (y - this.y) / 100
    this.x += this.speedX
    this.y += this.speedY
  }

  public checkClicked({ x, y }: { x: number; y: number }) {
    this.clicked =
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height

    return this.clicked
  }

  private checkSpeed() {
    if (this.x + this.width > this.game.width || this.x < 0) {
      this.speedX = -this.speedX
    }
    if (this.y + this.height > this.game.height || this.y < 0) {
      this.speedY = -this.speedY
    }
  }
}

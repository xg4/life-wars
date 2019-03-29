import Game from '../index'
import { randomBetween } from '../util'

export default class Model {
  get alive() {
    return this.hp > 0
  }

  public x: number
  public y: number

  public height: number
  public width: number

  public speedX: number
  public speedY: number
  protected hp: number

  protected power: number

  protected targetPosition?: { x: number; y: number }

  constructor(protected game: Game, x?: number, y?: number) {
    this.height = 0
    this.width = 0

    this.x = x || this.randomX()
    this.y = y || this.randomY()

    this.speedX = 0
    this.speedY = 0

    this.hp = 1
    this.power = 1
  }

  public render() {
    // this.game.renderModel(this)
  }

  public update() {
    this.limit()
  }

  public attacked(model: Model) {
    this.hp -= model.power
  }

  public isClicked({ x, y }: { x: number; y: number }) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    )
  }

  protected limit() {
    if (this.x + this.width > this.game.width || this.x < 0) {
      this.speedX = -this.speedX
    }
    if (this.y + this.height > this.game.height || this.y < 0) {
      this.speedY = -this.speedY
    }
  }

  private randomX() {
    return randomBetween(0, this.game.width - this.width)
  }

  private randomY() {
    return randomBetween(0, this.game.height - this.height)
  }
}

import Game from '../index'
import Food from './food'
import Model from './index'

export default class X extends Model {
  private vitality: number

  private target: { x: number; y: number }

  get hungry() {
    return this.vitality < 10
  }

  constructor(game: Game, x: number, y: number) {
    super(game, x, y)

    this.height = 10
    this.width = 10

    this.speedX = 1
    this.speedY = 2

    this.vitality = 30

    this.target = { x: 1, y: 2 }
  }

  public render() {
    super.render()

    const { context: ctx } = this.game

    ctx.save()
    ctx.strokeRect(this.x, this.y, this.width, this.height)
    ctx.restore()
  }

  public update() {
    super.update()

    this.move()
  }

  public move() {
    if (this.hungry) {
      return
    }
    this.x += this.speedX
    this.y += this.speedY

    this.vitality -= 0.1
  }
}

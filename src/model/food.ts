import Game from '../index'
import Model from './index'

export default class Food extends Model {
  private radius: number

  constructor(game: Game, x?: number, y?: number) {
    super(game, x, y)

    this.radius = 5
    this.width = this.radius
    this.height = this.radius
  }

  public render() {
    super.render()

    const { context: ctx } = this.game
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }

  public export() {
    this.hp -= this.power

    return this.power + 29
  }
}

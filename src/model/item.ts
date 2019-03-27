import Game from '../index'
import Model from './index'

export default class Item extends Model {
  public height: number
  public width: number

  constructor(game: Game) {
    super(game)

    this.height = 50
    this.width = 50
    this.x = 0
    this.y = 0
  }

  public render() {
    super.render()

    const { context: ctx } = this.game

    ctx.save()
    ctx.strokeRect(this.x, this.y, this.width, this.height)
    ctx.restore()
  }
}

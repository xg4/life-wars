import Game from '../index'

export default class Model {
  // get width() {}

  // get height() {}

  get alive() {
    return this.hp > 0
  }
  protected x: number
  protected y: number
  private power: number
  private hp: number

  constructor(protected game: Game) {
    this.x = 0
    this.y = 0

    this.hp = 1
    this.power = 1
  }

  public render() {
    // this.game.renderModel(this)
  }

  public update() {
    // TODO:
  }

  public attacked(model: Model) {
    this.hp -= model.power
  }
}

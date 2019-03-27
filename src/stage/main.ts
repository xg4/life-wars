import Game from '../index'
import Item from '../model/item'
import Stage from './index'

export default class MainStage extends Stage {
  constructor(game: Game) {
    super(game)

    this.setup()
  }

  private setup() {
    this.addElements(new Item(this.game))

    const stage = [[2, , ,], [2, , ,], [2, , ,], [2, , ,]]
  }
}

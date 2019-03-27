import Game from '../index'
import Food from '../model/food'
import X from '../model/x'
import { collide, randomBetween } from '../util'
import Stage from './index'

export default class MainStage extends Stage {
  public foods: Food[]

  constructor(game: Game) {
    super(game)

    this.foods = []
    this.setup()
  }

  public update() {
    super.update()

    const foods = this.elements.filter(el => el instanceof Food) as Food[]
    const xs = this.elements.filter(el => el instanceof X) as X[]

    xs.forEach(x => {
      if (x.hungry) {
        x.go(foods[0])
      }

      // collide(x)
    })
  }

  private setup() {
    this.foods = [new Food(this.game, 20, 80)]

    this.addElements([
      new X(this.game, 250, 280),
      new X(this.game, 50, 80),
      new X(this.game, 150, 180),
      ...this.foods
    ])

    this.generateFood()

    this.registerAction()
  }

  private generateFood() {
    setInterval(() => {
      const x = randomBetween(0, this.game.width)
      const y = randomBetween(0, this.game.height)
      const food = new Food(this.game, x, y)
      this.addElements(food)
    }, 10000)
  }

  private registerAction() {
    const { canvas } = this.game
    canvas.onmousedown = ({ offsetX: startX, offsetY: startY }) => {
      const xs = this.elements.filter(el => el instanceof X) as X[]
      xs.forEach(x => {
        if (x.checkClicked({ x: startX, y: startY })) {
          canvas.onmousemove = ({ offsetX: moveX, offsetY: moveY }) => {
            x.go({ x: moveX, y: moveY })
          }
          canvas.onmouseup = function() {
            this.onmousemove = null
            this.onmouseup = null
          }
        }
      })
    }
  }
}

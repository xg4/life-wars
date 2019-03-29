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

    const foods: Food[] = []
    const xs: X[] = []

    for (const el of this.elements) {
      if (el instanceof Food) {
        foods.push(el)
      }
      if (el instanceof X) {
        xs.push(el)
      }
    }

    xs.forEach(x => {
      if (x.hungry) {
        x.find(foods).go()
      }

      foods.forEach(food => {
        if (collide(x, food)) {
          if (food.alive) {
            x.eat(food)
          }
        }
      })
    })
  }

  private setup() {
    this.addElements([
      new X(this.game),
      new X(this.game),
      new X(this.game),
      new Food(this.game)
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
        if (x.isClicked({ x: startX, y: startY })) {
          canvas.onmousemove = ({ offsetX: moveX, offsetY: moveY }) => {
            x.x = moveX
            x.y = moveY
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

import Game from '../index'
import { distance } from '../util'
import Food from './food'
import Model from './index'

export default class X extends Model {
  get hungry() {
    return this.vitality < 10
  }

  public target: { x: number; y: number }
  private vitality: number

  private maxSpeedX: number

  private maxSpeedY: number

  constructor(game: Game, x?: number, y?: number) {
    super(game, x, y)

    this.height = 10
    this.width = 10

    this.speedX = 1
    this.speedY = 2

    this.vitality = 30

    this.target = { x: 1, y: 2 }

    this.maxSpeedX = 0.3
    this.maxSpeedY = 0.3
  }

  public render() {
    super.render()

    const { context: ctx } = this.game

    ctx.save()
    if (this.hungry) {
      ctx.strokeStyle = '#f00'
    }
    ctx.strokeRect(this.x, this.y, this.width, this.height)
    ctx.restore()
  }

  public update() {
    super.update()

    this.move()
  }

  public move() {
    if (this.hungry) {
      this.go()
      return
    }
    this.x += this.speedX
    this.y += this.speedY

    this.vitality -= 0.1
  }

  public go() {
    if (!this.targetPosition) {
      return
    }
    this.speedX = (this.targetPosition.x - this.x) / 100
    this.speedY = (this.targetPosition.y - this.y) / 100
    this.x += this.speedX
    this.y += this.speedY
  }

  public find(foods: Food[]) {
    if (!foods.length) {
      return this
    }
    this.targetPosition = foods.reduce((target, current) => {
      const targetDistance = distance(this, target)
      const currentDistance = distance(this, current)

      return targetDistance > currentDistance ? current : target
    })
    return this
  }

  public eat(food: Food) {
    this.vitality += food.export()
    this.targetPosition = undefined
  }

  protected limit() {
    super.limit()

    if (this.speedX > this.maxSpeedX) {
      this.speedX = this.maxSpeedX
    }

    if (this.speedY > this.maxSpeedY) {
      this.speedY = this.maxSpeedY
    }
  }
}

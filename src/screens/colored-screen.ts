import UIScreen from './ui-screen'
import Tile from '../tile'
import UIController from '../ui-controller'
import RGBColor from '../image/rgb-color'
import StaticColorComponent from '../components/static-color-component'
import Component from '../components/component'

export default abstract class ColoredScreen extends UIScreen {
  tiles!: Tile[]
  private disabledComponent: StaticColorComponent

  constructor(uiController: UIController, backgroundColor: RGBColor) {
    super(uiController)
    this.disabledComponent = new StaticColorComponent(backgroundColor, this)
  }

  async preload() {
    // build the tiles array
    this.tiles = []
    const controllerSize = this.uiController.getControllerSize()
    for (let tileIndex = 0; tileIndex < controllerSize; tileIndex++) {
      const component = this.getComponent(tileIndex) || this.disabledComponent
      const tile: Tile = {
        index: tileIndex,
        component
      }
      this.tiles.push(tile)
    }

    await super.preload()
  }

  abstract getComponent(tileIndex: number): Component | null
}

import UIScreen from './ui-screen'
import Tile from '../tile'
import UIController from '../ui-controller'
import StaticColorComponent from '../components/static-color-component'
import RGBColor from '../image/rgb-color'
import Component from '../components/component'

export default class BlankScreen extends UIScreen {
  tiles: Tile[] = []

  constructor(uiController: UIController) {
    super(uiController)

    const black: RGBColor = { r: 0, g: 0, b: 0 }
    const blackComponent = new StaticColorComponent(black, this)

    for (let i = 0; i < this.uiController.getControllerSize(); i++) {
      const tile: Tile = {
        index: i,
        component: blackComponent as Component
      }

      this.tiles.push(tile)
    }
  }
}

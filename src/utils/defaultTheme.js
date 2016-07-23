import { red, lightBlack, grey100, grey300, grey500, darkBlack, white } from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

export default {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#46bdd7',
    primary2Color: red,
    primary3Color: lightBlack,
    accent1Color: '#790189',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: red
  }
}

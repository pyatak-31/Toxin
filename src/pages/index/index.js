//import '../../assets/scss/main.scss'
//import '../../components/header/js.js'
import './index.scss'

import { importAll } from "../../assets/js/functions"

importAll(require.context('./img', false, /.(?:ico|gif|png|jpg|jpeg|webp|svg)$/));
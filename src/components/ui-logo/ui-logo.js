import './ui-logo.scss'
import { importAll } from "../../assets/js/functions"

importAll(require.context('./img', false, /.(?:ico|gif|png|jpg|jpeg|webp|svg)$/));
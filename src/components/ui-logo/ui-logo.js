// Подключаем Файл со стилями
import './ui-logo.scss'
// Подключаем функцию, собирающую картинки
import { importAll } from "../../assets/js/functions"

// Подключаем все картинки в компоненте
importAll(require.context('./img', false, /.(?:ico|gif|png|jpg|jpeg|webp|svg)$/));
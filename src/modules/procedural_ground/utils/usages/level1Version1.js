import { generateLevel } from "../generateLevel.js"
import {perlinLikeAlgorithm, randomAlgorithm, smoothTerrainAlgorithm} from "../terrainAlgorithms.js"

generateLevel({
  size: 19,
  seed: 42,
  algorithm: perlinLikeAlgorithm,
  outputFile: "../data/level1.json",
})

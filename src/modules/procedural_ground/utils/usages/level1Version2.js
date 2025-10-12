import { generateLevel } from "../generateLevel.js"
import {perlinLikeAlgorithm, randomAlgorithm, smoothTerrainAlgorithm} from "../terrainAlgorithms.js"

generateLevel({
  size: 20,
  seed: 2,
  algorithm: perlinLikeAlgorithm,
  outputFile: "../data/level1.json",
})

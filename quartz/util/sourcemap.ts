import fs from "fs"
import sourceMapSupport from "source-map-support"
import { fileURLToPath } from "url"

export const options: sourceMapSupport.Options = {
  // source map hack to get around query param
  // import cache busting
  retrieveSourceMap(source) {
    if (source.includes(".quartz-cache")) {
      let realSource = source.split("?", 2)[0]
      if (realSource.startsWith("file://")) {
        realSource = fileURLToPath(realSource)
      }
      realSource += ".map"

      if (!fs.existsSync(realSource)) {
        return null
      }

      return {
        map: fs.readFileSync(realSource, "utf8"),
      }
    } else {
      return null
    }
  },
}

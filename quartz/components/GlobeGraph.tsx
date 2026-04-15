import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/globegraph.inline"
import style from "./styles/globegraph.scss"
import { classNames } from "../util/lang"

interface GlobeOptions {
  width?: number
  height?: number
}

const defaultOptions: GlobeOptions = {
  height: 400,
}

export default ((opts?: Partial<GlobeOptions>) => {
  const GlobeGraph: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const options = { ...defaultOptions, ...opts }
    return (
      <div
        class={classNames(displayClass, "globe-graph")}
        style={{
          width: "100%",
          height: `${options.height}px`,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          isolation: "isolate",
          zIndex: 0,
        }}
      >
        <div
          id="globe-container"
          style={{ width: "100%", height: "100%" }}
          data-height={options.height}
        ></div>
      </div>
    )
  }

  GlobeGraph.css = style
  GlobeGraph.afterDOMLoaded = script

  return GlobeGraph
}) satisfies QuartzComponentConstructor

import { ComponentChildren } from "preact"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import DynamicIndexConstructor from "../DynamicIndex"

export default (() => {
  const DynamicIndex = DynamicIndexConstructor()

  const Content: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData, tree } = props
    const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
    const classes: string[] = fileData.frontmatter?.cssclasses ?? []
    const classString = ["popover-hint", ...classes].join(" ")

    if (fileData.slug === "index") {
      return (
        <article class={classString}>
          {content}
          <DynamicIndex {...props} />
        </article>
      )
    }

    return <article class={classString}>{content}</article>
  }

  Content.css = DynamicIndex.css
  Content.afterDOMLoaded = DynamicIndex.afterDOMLoaded

  return Content
}) satisfies QuartzComponentConstructor

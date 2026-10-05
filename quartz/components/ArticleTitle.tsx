import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  if (title) {
    return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--dark);
  margin: 1.75rem 0 0.85rem 0;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor

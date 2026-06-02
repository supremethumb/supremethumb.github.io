import test, { describe } from "node:test"
import assert from "node:assert"
import { escapeHTML, unescapeHTML } from "./escape"

describe("escapeHTML", () => {
  test("returns normal text unchanged", () => {
    assert.strictEqual(escapeHTML("Hello World"), "Hello World")
  })

  test("escapes ampersand", () => {
    assert.strictEqual(escapeHTML("A & B"), "A &amp; B")
  })

  test("escapes less than", () => {
    assert.strictEqual(escapeHTML("A < B"), "A &lt; B")
  })

  test("escapes greater than", () => {
    assert.strictEqual(escapeHTML("A > B"), "A &gt; B")
  })

  test("escapes double quotes", () => {
    assert.strictEqual(escapeHTML('Hello "World"'), "Hello &quot;World&quot;")
  })

  test("escapes single quotes", () => {
    assert.strictEqual(escapeHTML("Hello 'World'"), "Hello &#039;World&#039;")
  })

  test("escapes multiple different characters", () => {
    assert.strictEqual(
      escapeHTML(`<script>alert("XSS & 'friends'")</script>`),
      "&lt;script&gt;alert(&quot;XSS &amp; &#039;friends&#039;&quot;)&lt;/script&gt;",
    )
  })

  test("escapes consecutive characters", () => {
    assert.strictEqual(escapeHTML("<<>>"), "&lt;&lt;&gt;&gt;")
    assert.strictEqual(escapeHTML("&&"), "&amp;&amp;")
    assert.strictEqual(escapeHTML("''\"\""), "&#039;&#039;&quot;&quot;")
  })
})

describe("unescapeHTML", () => {
  test("returns normal text unchanged", () => {
    assert.strictEqual(unescapeHTML("Hello World"), "Hello World")
  })

  test("unescapes ampersand", () => {
    assert.strictEqual(unescapeHTML("A &amp; B"), "A & B")
  })

  test("unescapes less than", () => {
    assert.strictEqual(unescapeHTML("A &lt; B"), "A < B")
  })

  test("unescapes greater than", () => {
    assert.strictEqual(unescapeHTML("A &gt; B"), "A > B")
  })

  test("unescapes double quotes", () => {
    assert.strictEqual(unescapeHTML("Hello &quot;World&quot;"), 'Hello "World"')
  })

  test("unescapes single quotes", () => {
    assert.strictEqual(unescapeHTML("Hello &#039;World&#039;"), "Hello 'World'")
  })

  test("unescapes multiple different characters", () => {
    assert.strictEqual(
      unescapeHTML("&lt;script&gt;alert(&quot;XSS &amp; &#039;friends&#039;&quot;)&lt;/script&gt;"),
      `<script>alert("XSS & 'friends'")</script>`,
    )
  })

  test("unescapes consecutive characters", () => {
    assert.strictEqual(unescapeHTML("&lt;&lt;&gt;&gt;"), "<<>>")
    assert.strictEqual(unescapeHTML("&amp;&amp;"), "&&")
    assert.strictEqual(unescapeHTML("&#039;&#039;&quot;&quot;"), "''\"\"")
  })

  test("can handle nested escapes correctly", () => {
    // If we escape and then unescape, we should get the original string back
    const original = `<script>alert("test & 'test'")</script>`
    const escaped = escapeHTML(original)
    const unescaped = unescapeHTML(escaped)
    assert.strictEqual(unescaped, original)
  })
})

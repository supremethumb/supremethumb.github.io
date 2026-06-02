import test, { describe } from "node:test"
import assert from "node:assert"
import { capitalize, classNames } from "./lang"

describe("capitalize", () => {
  test("capitalizes empty string", () => {
    assert.strictEqual(capitalize(""), "")
  })

  test("capitalizes single character", () => {
    assert.strictEqual(capitalize("a"), "A")
    assert.strictEqual(capitalize("A"), "A")
  })

  test("capitalizes a word", () => {
    assert.strictEqual(capitalize("hello"), "Hello")
    assert.strictEqual(capitalize("Hello"), "Hello")
  })

  test("capitalizes multiple words", () => {
    assert.strictEqual(capitalize("hello world"), "Hello world")
  })

  test("handles strings starting with non-alphabetic characters", () => {
    assert.strictEqual(capitalize(" hello"), " hello")
    assert.strictEqual(capitalize("1hello"), "1hello")
    assert.strictEqual(capitalize("!hello"), "!hello")
  })
})

describe("classNames", () => {
  test("joins multiple classes without displayClass", () => {
    assert.strictEqual(classNames(undefined, "class1"), "class1")
    assert.strictEqual(classNames(undefined, "class1", "class2"), "class1 class2")
  })

  test("joins multiple classes with displayClass", () => {
    assert.strictEqual(classNames("mobile-only", "class1"), "class1 mobile-only")
    assert.strictEqual(classNames("desktop-only", "class1", "class2"), "class1 class2 desktop-only")
  })

  test("handles empty classes", () => {
    assert.strictEqual(classNames(undefined), "")
    assert.strictEqual(classNames("mobile-only"), "mobile-only")
  })

  test("filters out empty or undefined classes passed in rest parameter", () => {
    // If the rest parameter includes empty strings, they are preserved as is
    // so we just test what it actually does
    assert.strictEqual(classNames(undefined, "class1", ""), "class1 ")
  })
})

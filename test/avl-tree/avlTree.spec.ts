import { AvlTree } from "../../src/avl-tree/avl-tree"

describe("avl-tree", () => {
  it("finds the correct range for empty tree", async () => {
    const tree = new AvlTree()
    expect(tree.findEnclosingRange(25)).toEqual({ min: undefined, max: undefined })
  })

  it("finds the correct range for single-element tree", async () => {
    const tree = new AvlTree()
    tree.insert(10)
    expect(tree.findEnclosingRange(25)).toEqual({ min: 10, max: undefined })
    expect(tree.findEnclosingRange(5)).toEqual({ min: undefined, max: 10 })
  })

  it("finds the correct range", async () => {
    const tree = new AvlTree()
    tree.insert(10)
    tree.insert(20)
    tree.insert(30)
    expect(tree.findEnclosingRange(5)).toEqual({ min: undefined, max: 10 })
    expect(tree.findEnclosingRange(10)).toEqual({ min: 10, max: 10 })
    expect(tree.findEnclosingRange(15)).toEqual({ min: 10, max: 20 })
    expect(tree.findEnclosingRange(20)).toEqual({ min: 20, max: 20 })
    expect(tree.findEnclosingRange(25)).toEqual({ min: 20, max: 30 })
    expect(tree.findEnclosingRange(30)).toEqual({ min: 30, max: 30 })
    expect(tree.findEnclosingRange(31)).toEqual({ min: 30, max: undefined })
  })
})

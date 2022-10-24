import { AvlTree } from "../../src/avl-tree/avl-tree"

describe("avl-tree", () => {
  describe("findByValue", () => {
    it("on empty tree", async () => {
      const tree = new AvlTree<number, number>()
      expect(tree.findByValue(25)).toBeNull()
    })

    it("when values exist", async () => {
      const tree = new AvlTree<number, string>()
      tree.insert(10, "100")
      expect(tree.findByValue("10")).toBeNull()
      expect(tree.findByValue("25")).toBeNull()
      expect(tree.findByValue("100")).toEqual("100")
    })

    it("with custom objects", async () => {
      type TestType = { a: number; b: number }
      const tree = new AvlTree<number, TestType>(
        (x, y) => y - x,
        (x, y) => y.b - x.b
      )
      tree.insert(10, { a: 10, b: 100 })
      tree.insert(20, { a: 20, b: 200 })
      tree.insert(30, { a: 30, b: 300 })
      expect(tree.findByValue({ b: 10 })).toBeNull()
      expect(tree.findByValue({ b: 100 })).toEqual({ a: 10, b: 100 })
      expect(tree.findByValue({ b: 200 })).toEqual({ a: 20, b: 200 })
      expect(tree.findByValue({ b: 250 })).toBeNull()
      expect(tree.findByValue({ b: 300 })).toEqual({ a: 30, b: 300 })
    })
  })

  describe("findEnclosingRange", () => {
    it("finds the correct range for empty tree", async () => {
      const tree = new AvlTree()
      expect(tree.findEnclosingRange(25)).toEqual({ min: undefined, max: undefined })
    })

    it("finds the correct range for single-element tree", async () => {
      const tree = new AvlTree()
      tree.insert(10, 10)
      expect(tree.findEnclosingRange(25)).toEqual({ min: 10, max: undefined })
      expect(tree.findEnclosingRange(5)).toEqual({ min: undefined, max: 10 })
    })

    it("finds the correct range", async () => {
      const tree = new AvlTree()
      tree.insert(10, 10)
      tree.insert(20, 20)
      tree.insert(30, 30)
      expect(tree.findEnclosingRange(5)).toEqual({ min: undefined, max: 10 })
      expect(tree.findEnclosingRange(10)).toEqual({ min: 10, max: 10 })
      expect(tree.findEnclosingRange(15)).toEqual({ min: 10, max: 20 })
      expect(tree.findEnclosingRange(20)).toEqual({ min: 20, max: 20 })
      expect(tree.findEnclosingRange(25)).toEqual({ min: 20, max: 30 })
      expect(tree.findEnclosingRange(30)).toEqual({ min: 30, max: 30 })
      expect(tree.findEnclosingRange(31)).toEqual({ min: 30, max: undefined })
    })
  })
})

interface Hello {
  name: string;
}
let world: Hello = {
  name: "hello test",
};

it("print hello test", () => {
  expect(world.name).toBe("hello test");
});

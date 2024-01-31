import renderer from "react-test-renderer";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";


// test a snapshot of the header
test("renders correctly", () => {
  const tree = renderer.create(<BrowserRouter><Header /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});

// reset global fetch
global.fetch = jest.fn(()=>{
  Promise.resolve("abcd");
});

// unit test fetch
it("test login request", async () => {
  const result = await fetch("/receiving")
})
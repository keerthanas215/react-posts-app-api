import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (
      url === "https://jsonplaceholder.typicode.com/posts" &&
      (!options || options.method === undefined)
    ) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              title: "First Post",
              body: "This is the first post body.",
            },
            {
              id: 2,
              title: "Second Post",
              body: "This is the second post body.",
            },
          ]),
      });
    }

    if (
      url === "https://jsonplaceholder.typicode.com/posts" &&
      options &&
      options.method === "POST"
    ) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 101,
            title: "New Test Post",
            body: "Created in test",
            userId: 1,
          }),
      });
    }

    if (url === "https://jsonplaceholder.typicode.com/posts/1") {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            title: "First Post",
            body: "This is the first post body.",
          }),
      });
    }

    return Promise.reject(new Error("Unknown request"));
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("fetches and displays posts", async () => {
  render(<App />);

  expect(screen.getByText(/Loading posts/i)).toBeInTheDocument();

  expect(await screen.findByText("First Post")).toBeInTheDocument();
  expect(screen.getByText("Second Post")).toBeInTheDocument();
});

test("displays post title and body", async () => {
  render(<App />);

  expect(await screen.findByText("First Post")).toBeInTheDocument();
  expect(screen.getByText("This is the first post body.")).toBeInTheDocument();
});

test("creates a new post", async () => {
  render(<App />);

  await screen.findByText("First Post");

  fireEvent.change(screen.getByPlaceholderText("Post title"), {
    target: { value: "My New Post" },
  });

  fireEvent.change(screen.getByPlaceholderText("Post body"), {
    target: { value: "My new body text" },
  });

  fireEvent.click(screen.getByText("Create Post"));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
      expect.objectContaining({
        method: "POST",
      })
    );
  });
});
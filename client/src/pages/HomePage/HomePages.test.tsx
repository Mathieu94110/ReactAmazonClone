import { render, screen, waitFor } from "@testing-library/react";
import { AuthContext } from "../../components/Providers/AuthProvider";
import Home from "./HomePage";

describe("App", () => {
  const setup = () => {
    let mockedUser = {
      address: "",
      city: "",
      country: "",
      email: "johnDoe@gmail.com",
      fullName: "",
      name: "Doe",
      password: null,
      postalCode: null,
      _id: "b6k20jlk",
    };
    let mockedSignin = jest.fn();
    let mockedSignout = jest.fn();
    render(
      <AuthContext.Provider
        value={{
          user: mockedUser,
          signin: mockedSignin,
          signout: mockedSignout,
        }}
      >
        <Home />
      </AuthContext.Provider>
    );
  };
  let windowFetchSpy;

  function wait(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  const mockProductsResponse = [
    {
      image: "fake-image.jpg",
      name: "Samsung a52",
      description:
        "a52 samsung phone a very popular phone which offer an amaizing user experience",
      category: "mobiles",
      brand: "samsung",
      price: 130,
      rating: 4,
      numRev: 1,
      stock: 12,
    },
    {
      image: "fake-image-two.jpg",
      name: "iphone x",
      description: "modern iphone which offers unrivaled performance",
      category: "mobiles",
      brand: "apple",
      price: 500,
      rating: 4.5,
      numRev: 3,
      stock: 5,
    },
  ];
  let mockFetch = async () => {
    await wait(70);
    return {
      ok: true,
      bodyUsed: true,
      headers: {},
      redirect: false,
      statusText: "OK",
      status: 200,
      type: "basic",
      url: "http://localhost:3000/api/products",
      json: async () => mockProductsResponse,
    };
  };
  beforeEach(() => {
    //@ts-ignore
    windowFetchSpy = jest.spyOn(window, "fetch").mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("renders products when API call succeeds", async () => {
    setup();
    expect(windowFetchSpy).toHaveBeenCalled();
    expect(windowFetchSpy).toHaveBeenCalledWith("api/products/");
    await waitFor(() => {
      expect(screen.getByText("Samsung a52")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("iphone x")).toBeInTheDocument();
    });
  });
});

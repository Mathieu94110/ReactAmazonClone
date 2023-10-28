import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "./Signup";
import { AuthContext } from "../Providers/AuthProvider";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("SignUp", () => {
  const setup = () => {
    let mockedUser = null;
    let mockedSignin = jest.fn();
    let mockedSignout = jest.fn();
    const { rerender } =  render(
      <AuthContext.Provider
        value={{
          user: mockedUser,
          signin: mockedSignin,
          signout: mockedSignout,
        }}
      >
        <Signup />
      </AuthContext.Provider>
    );
  };

  it("should correctly render initials signUp fields", () => {
    setup();
    // form title
    const formTitle = screen.getByRole("heading", { level: 2 });
    expect(formTitle).toBeInTheDocument();
    expect(formTitle.innerHTML).toMatch(/inscription/i);
    // form labels
    expect(screen.getByText("Nom")).toBeVisible();
    expect(screen.getByText("Email")).toBeVisible();
    expect(screen.getByText("Mot de passe")).toBeVisible();
    // //form inputs should be empty
    const nameInput = screen.getByTestId(
      "signup-name-input"
    ) as HTMLInputElement;
    const emailInput = screen.getByTestId(
      "signup-email-input"
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "signup-password-input"
    ) as HTMLInputElement;
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    // // login button
    expect(
      screen.getByRole("button", { name: /inscription/i })
    ).toBeInTheDocument();
  });
  it("should email be invalid", async () => {
    setup();
    const user = userEvent.setup();
    const emailInput = screen.getByTestId(
      "signup-email-input"
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "signup-password-input"
    ) as HTMLInputElement;
    const nameInput = screen.getByTestId(
      "signup-name-input"
    ) as HTMLInputElement;
    const signUpBtn = screen.getByRole("button", { name: /inscription/i });
    user.type(nameInput, "johnDoe");
    user.type(emailInput, "not.a.valid.email");
    user.type(passwordInput, "passwordTest");
    await user.click(signUpBtn);
    const newEmailError = await screen.findByText("L'émail est invalide");
    expect(newEmailError).toBeInTheDocument();
  });

  //  it("should email be valid but name too long and password too short", async () => {
  //   setup();
  //   const user = userEvent.setup();
  //   const nameInput = screen.getByTestId(
  //     "signup-name-input"
  //   ) as HTMLInputElement;
  //   const emailInput = screen.getByTestId(
  //     "signup-email-input"
  //   ) as HTMLInputElement;
  //   const passwordInput = screen.getByTestId(
  //     "signup-password-input"
  //   ) as HTMLInputElement;
  //   const signUpBtn = screen.getByRole("button", { name: /inscription/i });

  //   userEvent.clear(nameInput);
  //   userEvent.clear(emailInput);
  //   userEvent.clear(passwordInput);

  //   user.type(nameInput, "too-long-user-name-typed");
  //   user.type(emailInput, "johnDoe@gmail.com");
  //   user.type(passwordInput, "short");
  //   await user.click(signUpBtn);

  //   const nameError = await screen.findByText("Le nom est trop long");
  //   const passwordError = await screen.findByText("Le mot de passe est trop court");
  //   expect(nameError).toBeInTheDocument();
  //   expect(passwordError).toBeInTheDocument();
  //  })
});

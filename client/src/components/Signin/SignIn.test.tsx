import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signin from "./Signin";
import { AuthContext } from "../Providers/AuthProvider";

afterEach(() => {
  cleanup();
});
describe("SignIn", () => {
  const setup = () => {
    let mockedUser = null;
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
        <Signin />
      </AuthContext.Provider>
    );
  };

  it("should sign in form display errors when no value are provided to form inputs", async () => {
    setup();
    const user = userEvent.setup();
    const emailInput = screen.getByTestId(
      "signin-email-input"
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "signin-password-input"
    ) as HTMLInputElement;
    const loginBtn = screen.getByRole("button", { name: /Se connecter/i });
    //
    // no errors on page loading
    const userEmailField = screen.queryByText("Il faut préciser votre email");
    const userPasswordField = screen.queryByText(
      "Il faut préciser votre mot de passe"
    );
    expect(userEmailField).toBeNull();
    expect(userPasswordField).not.toBeInTheDocument();
    expect(loginBtn).not.toBeDisabled();

    // after clicking with no values
    await user.click(loginBtn);
    const emailError = await screen.findByText("Il faut préciser votre email");
    const passwordError = await screen.findByText(
      "Il faut préciser votre mot de passe"
    );
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();

    // after typings inssuficient values on each fields
    fireEvent.change(emailInput, { target: { value: "me941" } });
    fireEvent.change(passwordInput, { target: { value: "abc" } });

    // user.type(emailInput, "me941");
    // user.type(passwordInput, "abc");

    const newPasswordError = await screen.findByText("Mot de passe trop court");

    expect(newPasswordError).toBeInTheDocument();
    // now we are testing invalid email from backend
    await fireEvent.click(loginBtn);
    const newEmailError = await screen.findByText("L'email n'est pas valide");
    expect(newEmailError).toBeInTheDocument();
  });
  it("should correctly render initials signIn fields", () => {
    setup();
    // form title
    const formTitle = screen.getByRole("heading", { level: 2 });
    expect(formTitle).toBeInTheDocument();
    expect(formTitle.innerHTML).toMatch(/connection/i);
    // form labels
    expect(screen.getByText("Email")).toBeVisible();
    expect(screen.getByText("Password")).toBeVisible();
    //form inputs should be empty
    const emailInput = screen.getByTestId(
      "signin-email-input"
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "signin-password-input"
    ) as HTMLInputElement;
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    // login button
    expect(
      screen.getByRole("button", { name: /Se connecter/i })
    ).toBeInTheDocument();
  });
});

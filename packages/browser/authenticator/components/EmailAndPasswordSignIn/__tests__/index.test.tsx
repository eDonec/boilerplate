import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EmailAndPasswordSignIn from "../index";

describe("EmailAndPasswordSignIn", () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with email and password inputs", () => {
    render(<EmailAndPasswordSignIn onSubmit={onSubmit} text="Sign in" />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
  });

  it("validates email input on submit and shows an error message if it's empty or invalid", async () => {
    render(<EmailAndPasswordSignIn onSubmit={onSubmit} text="Sign in" />);

    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByText("Sign in");

    userEvent.click(submitButton);

    // blur email input without entering a value
    fireEvent.blur(emailInput);

    // check that the error message is displayed
    expect(
      await screen.findByText("L'email est obligatoire")
    ).toBeInTheDocument();

    // enter an invalid email address
    await userEvent.type(emailInput, "invalid-email");
    fireEvent.blur(emailInput);

    // check that the error message is displayed
    expect(
      await screen.findByText("L'email doit être une adresse email valide")
    ).toBeInTheDocument();

    // enter a valid email address
    userEvent.clear(emailInput);
    await userEvent.type(emailInput, "valid.email@example.com");
    fireEvent.blur(emailInput);

    // check that the error message is not displayed
    expect(
      screen.queryByText("L'email doit être une adresse email valide")
    ).toBeNull();
    expect(screen.queryByText("L'email est obligatoire")).toBeNull();

    // password input should not show any errors
    expect(
      await screen.findByText("Le mot de passe est obligatoire")
    ).toBeInTheDocument();
  });

  it("submits the form when all inputs are valid", async () => {
    render(<EmailAndPasswordSignIn onSubmit={onSubmit} text="Sign in" />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Mot de passe");
    const submitButton = screen.getByText("Sign in");

    // enter valid email and password values
    await userEvent.type(emailInput, "valid.email@example.com");
    await userEvent.type(passwordInput, "password");

    // submit the form
    await userEvent.click(submitButton);

    // check that the onSubmit function was called with the correct data
    expect(onSubmit).toHaveBeenCalledWith({
      email: "valid.email@example.com",
      password: "password",
    });
  });
});

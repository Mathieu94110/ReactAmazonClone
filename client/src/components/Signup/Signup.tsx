import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../apis/users";

interface UserInput {
  name: string;
  email: string;
  password: string;
  generic: { generic: { message: string } };
}

function Signup() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Le nom est requis")
      .max(10, "Le nom est trop long"),
    email: yup.string().required("L'email est requis"),
    password: yup
      .string()
      .required("Il faut indiquer un mot de passe")
      .min(6, "Le mot de passe est trop court"),
  });

  const defaultValues: UserInput = {
    name: "",
    email: "",
    password: "",
    generic: null,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // get errors of the form
    setError,
    clearErrors,
  } = useForm<UserInput>({
    defaultValues,
    resolver: yupResolver(validationSchema) as any,
  });

  const submit = handleSubmit(async (user) => {
    try {
      clearErrors();
      await createUser(user);
      navigate("/"); // here we try to navigate to home but like user is not registed on auth provider whe are redirected to login (Signin by default)
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });

  return (
    <div>
      <form onSubmit={submit} className="d-flex flex-column card p-20">
        <h2 className="mb-10 text-white">Inscription</h2>
        <div className="mb-10 d-flex flex-column my-10">
          <label htmlFor="name" className="text-primary">
            Nom
          </label>
          <input type="text" name="name" {...register("name")} />
          <p className="form-error">
            {errors.name ? errors.name.message : null}
          </p>
        </div>
        <div className="mb-10 d-flex flex-column my-10">
          <label htmlFor="email" className="text-primary">
            Email
          </label>
          <input type="text" name="email" {...register("email")} />
          <p className="form-error">
            {errors.email ? errors.email.message : null}
          </p>
        </div>
        <div className="mb-10 d-flex flex-column my-10">
          <label htmlFor="password" className="text-primary">
            Password
          </label>
          <input type="password" name="password" {...register("password")} />
          <p className="form-error">
            {errors.password ? errors.password.message : null}
          </p>
        </div>
        <div>
          <div className="mb-10">
            <p className="form-error">
              {errors.generic ? errors.generic.message : null}
            </p>
          </div>
        </div>
        <div className="mt-10">
          <button disabled={isSubmitting} className="btn btn-primary">
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

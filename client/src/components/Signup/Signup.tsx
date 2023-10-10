import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { createUser } from "@/apis/users";
import { UserSignupInput } from "@/types/types";

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

  const defaultValues: UserSignupInput = {
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
  } = useForm<UserSignupInput>({
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
        <h2 className="mb-20 text-white">Inscription</h2>
        <div className="mb-10 d-flex flex-column my-10">
          <label htmlFor="name" className="text-white">
            Nom
          </label>
          <input type="text" name="name" {...register("name")} />
          <p className="form-error">
            {errors.name ? errors.name.message : null}
          </p>
        </div>
        <div className="mb-10 d-flex flex-column my-10">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input type="text" name="email" {...register("email")} />
          <p className="form-error">
            {errors.email ? errors.email.message : null}
          </p>
        </div>
        <div className="mb-10 d-flex flex-column my-10">
          <label htmlFor="password" className="text-white">
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
          <button disabled={isSubmitting} className="btn btn-secondary my-1">
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAd } from "@/apis/user-ads";
import { AuthContext } from "@/components/Providers/AuthProvider";
import styles from "./CreateAdForm.module.scss";
import { UserAdInput } from "@/types/types";

function CreateAdForm() {
  const { user } = useContext(AuthContext);
  const defaultValues = {
    title: "",
    description: "",
    image: "",
    generic: null,
  };

  const newAdSchema = yup.object({
    title: yup
      .string()
      .required("Le titre de l'annonce doit être renseigné")
      .min(10, "Le titre doit être explicite")
      .max(30, "Le titre doit être succinct"),
    description: yup
      .string()
      .required("La description de l'annonce doit être renseigné")
      .min(10, "Le titre doit être explicite")
      .max(30, "Le titre doit être succinct"),
    image: yup
      .string()
      .required("Il faut renseigner une image")
      .url("L'image doit être un lien valide"),
  });

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm<UserAdInput>({
    defaultValues,
    resolver: yupResolver(newAdSchema) as any,
  });

  async function submit(values) {
    try {
      clearErrors();
      await createAd({
        ...values,
        userId: user._id,
      });
    } catch (e) {
      setError("generic", { type: "generic", message: "Il y a eu une erreur" });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`flex-column card p-20 ${styles.recipeForm}`}
    >
      <img
        src="https://www.commeuncamion.com/content/uploads/2010/03/logo-amazon-fr.jpg"
        alt="amazon.fr"
        referrerPolicy="no-referrer"
        className="mb-10"
      />
      <div className="flex-column mb-20">
        <label className="secondary mb-10">Titre de l'annonce</label>
        <input {...register("title")} type="text" />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>
      <div className="flex-column mb-20">
        <label className="secondary mb-10">Description de l'annonce</label>
        <textarea {...register("description")} />
        {errors.description && (
          <p className="form-error">{errors.description.message}</p>
        )}
      </div>
      <div className="flex-column mb-20">
        <label className="secondary mb-10">Image </label>
        <input {...register("image")} type="text" />
        {errors.image && <p className="form-error">{errors.image.message}</p>}
      </div>
      {errors.generic && <p className="form-error">{errors.generic.message}</p>}
      <div>
        <button disabled={isSubmitting} className="btn btn-primary">
          <span className="secondary">Sauvegarder</span>
        </button>
      </div>
    </form>
  );
}

export default CreateAdForm;

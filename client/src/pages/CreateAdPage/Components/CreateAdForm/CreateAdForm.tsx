import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MessageBox from "@/components/MessageBox/MessageBox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAd } from "@/apis/user-ads";
import { AuthContext } from "@/components/Providers/AuthProvider";
import styles from "./CreateAdForm.module.scss";
import { UserAdInput } from "@/types/types";

function CreateAdForm() {
  const [successCreate, setSuccessCreate] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const defaultValues = {
    title: "",
    category: "",
    description: "",
    image: "",
    generic: null,
  };

  const newAdSchema = yup.object({
    title: yup
      .string()
      .required("Le titre doit être renseigné")
      .min(10, "Le titre doit être explicite")
      .max(30, "Le titre doit être succinct"),
    category: yup.string().required("Il faut renseigner la catégorie"),
    description: yup
      .string()
      .required("La description doit être renseigné")
      .min(10, "La descrition doit être explicite")
      .max(30, "La descrition doit être succincte"),
    image: yup
      .string()
      .required("Il faut renseigner une image")
      .url("L'image doit être un lien valide"),
  });

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<UserAdInput>({
    defaultValues,
    resolver: yupResolver(newAdSchema) as any,
  });
  // useEffect on below clear form errors after delay
  useEffect(() => {
    if (errors)
      setTimeout(() => {
        clearErrors();
      }, 3000);
    if (successCreate) {
      setSuccessCreate(false);
    }
  }, [errors, clearErrors, successCreate]);

  async function submit(values: typeof defaultValues): Promise<void> {
    try {
      clearErrors();
      const response = await createAd({
        ...values,
        author: user._id,
      });
      if (response.ok) {
        setSuccessCreate(true);
      }
    } catch (e) {
      setError("generic", { type: "generic", message: "Il y a eu une erreur" });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`flex-column  p-20 ${styles.recipeForm}`}
    >
      <h1>Créer une annonce</h1>
      <div className={styles.createAdMessage}>
        {successCreate && (
          <MessageBox variant="success">Votre annonce a été postée</MessageBox>
        )}
      </div>
      <div className="flex-column mb-20">
        <label className="secondary mb-10">Titre de l'annonce</label>
        <input
          {...register("title")}
          type="text"
          className="createAdFormInput"
        />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>
      <div className="flex-column mb-20">
        <label className="secondary mb-10">Catégorie</label>
        <select {...register("category")}>
          <option value="mobile phones">Téléphones mobiles</option>
          <option value="laptop">Ordinateurs portables</option>
          <option value="televisions">Télévisions</option>
          <option value="computer accessories">
            Accessoires d'ordinateurs
          </option>
          <option value="headphones">Écouteurs</option>
          <option value="others">Autres</option>
        </select>
        {errors.category && (
          <p className="form-error">{errors.category.message}</p>
        )}
      </div>
      <div className="flex-column mb-20">
        <label className="secondary mb-10">Description de l'annonce</label>
        <textarea {...register("description")} className="h-10" />
        {errors.description && (
          <p className="form-error">{errors.description.message}</p>
        )}
      </div>
      <div className="flex-column mb-20">
        <label className="secondary mb-10">Url de l'image </label>
        <input {...register("image")} type="text" />
        {errors.image && <p className="form-error">{errors.image.message}</p>}
      </div>
      {errors.generic && <p className="form-error">{errors.generic.message}</p>}
      <button className="btn btn-secondary h-6" disabled={isSubmitting}>
        Créer l'annonce
      </button>
    </form>
  );
}

export default CreateAdForm;

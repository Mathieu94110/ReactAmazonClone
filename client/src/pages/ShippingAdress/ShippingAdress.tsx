import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckoutSteps from "../../components/CheckOutSteps/CheckoutSteps";
import { updateUserProfile } from "../../apis";
import { AuthContext } from "../../components/Context";
import { UserShippingAddressInput } from "@/types/types";
import styles from "./ShippingAdress.module.scss";

const ShippingAddress = () => {
  const [userShippingAddress, setUserShippingAddress] = useState<
    "current" | "new"
  >("current");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    fullName: yup
      .string()
      .required("Le nom complet est requis")
      .min(4, "Le nom complet est trop court"),
    address: yup
      .string()
      .required("L'adresse est requise")
      .min(10, "L'adresse est trop courte"),
    postalCode: yup
      .number()
      .required("Le code postal est requis")
      .min(5, "Le code postal est trop court"),
    city: yup
      .string()
      .required("Il faut indiquer une ville")
      .min(3, "La ville est trop courte"),
    country: yup
      .string()
      .required("Il faut indiquer un pays")
      .min(4, "La pays doit faire au moins 4 caractères"),
  });

  const defaultValues: UserShippingAddressInput = {
    fullName: "",
    address: "",
    postalCode: null,
    city: "",
    country: "",
    userId: user._id,
    generic: null,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // get errors of the form
    setError,
    clearErrors,
  } = useForm<UserShippingAddressInput>({
    defaultValues,
    resolver: yupResolver(validationSchema) as any,
  });

  useEffect(() => {
    if (userHasShoppingAddress(user)) {
      setUserShippingAddress("current");
    } else {
      setUserShippingAddress("new");
    }
  }, [user]);

  function userHasShoppingAddress(object): boolean {
    return ["address", "city", "country", "fullName"].every((info) =>
      object.hasOwnProperty(info)
    );
  }

  const submit = handleSubmit(async (infos): Promise<void> => {
    try {
      clearErrors();
      await updateUserProfile(infos);
      navigate("/payment");
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError("generic", { type: "generic", message });
    }
  });

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>

      <div className={styles.shippingFormContainer}>
        <h2 className="mb-20 text-primary">Adresse de livraison</h2>
        {userShippingAddress === "current" ? (
          <div className={styles.userShippingAddress}>
            <p>
              <span className={styles.usershippingKey}>Nom complet</span>
              <span className={styles.userShippingValue}>{user.fullName}</span>
            </p>
            <p>
              <span className={styles.usershippingKey}>Adresse</span>
              <span className={styles.userShippingValue}>{user.address}</span>
            </p>
            <p>
              <span className={styles.usershippingKey}>Ville</span>
              <span className={styles.userShippingValue}>{user.city}</span>
            </p>
            <p>
              <span className={styles.usershippingKey}>Pays</span>
              <span className={styles.userShippingValue}>{user.country}</span>
            </p>
            <div className={styles.shippingBtnContainer}>
              <input
                type="button"
                value="Modifier"
                className={styles.shippingBtn}
                onClick={() => setUserShippingAddress("new")}
              />
              <input
                type="button"
                value="Continuer"
                className={styles.shippingBtn}
                onClick={() => navigate("/payment")}
              />
            </div>
          </div>
        ) : (
          <form className={styles.shippingForm} onSubmit={submit}>
            <div className={styles.formIpSecContainer}>
              <div className={styles.formIpSec}>
                <label className={styles.shippingFormLabel} htmlFor="fullName">
                  Nom complet
                </label>
                <input
                  type="text"
                  placeholder="Indiquer un nom complet"
                  name="fullName"
                  {...register("fullName")}
                />
                <p className="form-error">
                  {errors.fullName ? errors.fullName.message : null}
                </p>
              </div>

              <div className={styles.formIpSec}>
                <label className={styles.shippingFormLabel} htmlFor="address">
                  Adresse
                </label>
                <input
                  type="text"
                  placeholder="Entrer une adresse"
                  name="address"
                  {...register("address")}
                />
                <p className="form-error">
                  {errors.address ? errors.address.message : null}
                </p>
              </div>

              <div className={styles.formIpSec}>
                <label className={styles.shippingFormLabel} htmlFor="city">
                  Ville
                </label>
                <input
                  type="text"
                  placeholder="Entrer une ville"
                  name="city"
                  {...register("city")}
                />
                <p className="form-error">
                  {errors.city ? errors.city.message : null}
                </p>
              </div>

              <div className={styles.formIpSec}>
                <label
                  className={styles.shippingFormLabel}
                  htmlFor="postalCode"
                >
                  Code postal
                </label>
                <input
                  type="text"
                  placeholder="Entrer un code postal"
                  name="postalCode"
                  {...register("postalCode")}
                />
                <p className="form-error">
                  {errors.postalCode ? errors.postalCode.message : null}
                </p>
              </div>

              <div className={styles.formIpSec}>
                <label className={styles.shippingFormLabel} htmlFor="country">
                  Pays
                </label>
                <input
                  type="text"
                  placeholder="Entrer un pays"
                  name="country"
                  {...register("country")}
                />
                <p className="form-error">
                  {errors.country ? errors.country.message : null}
                </p>
              </div>
            </div>

            <div className={styles.shippingBtnContainer}>
              <input
                type="submit"
                value="Continuer"
                disabled={isSubmitting}
                className={styles.shippingBtn}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ShippingAddress;

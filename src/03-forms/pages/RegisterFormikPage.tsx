import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyCheckbox, MySelect, MyTextInput } from "../components";

import "../styles/styles.css";

export const RegisterFormikPage = () => {
  return (
    <div>
      <h1>Register Formik Page</h1>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Debe tener al menos entre 2 y 15 caracteres")
            .max(15, "Debe tener al menos entre 2 y 15 caracteress")
            .required("Requerido"),
          email: Yup.string().email("Email no válido").required("Requerido"),
          password: Yup.string()
            .min(6, "Debe tener al menos 6 caracteres")
            .required("Requerido"),
          confirmPassword: Yup.string()
            .oneOf(
              [Yup.ref("password"), null],
              "Las contraseñas deben de ser iguales"
            )
            .required("Requerido"),
        })}
      >
        {({ handleReset }) => (
          <Form>
            <MyTextInput label="Name" name="name" placeholder="Jesús" />

            <MyTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="correo@correo.com"
            />

            <MyTextInput
              label="Password"
              name="password"
              type="password"
              placeholder="******"
            />

            <MyTextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="******"
            />

            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

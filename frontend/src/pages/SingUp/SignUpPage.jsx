import React from "react";
import * as Yup from "yup";
import Form from "../../component/Form/Form";
import Header from '../../component/Header/Header';
function SignUpPage() {
  const data = [
    {
      type: "text",
      placeholder: "Username",
      key: "username",
    },
    {
      type: "email",
      placeholder: "Please Enter Your email",
      key: "email",
    },
    {
      type: "password",
      placeholder: "Please Enter Your Password",
      key: "password",
    },
    {
      type: "password",
      placeholder: "Please Conform Your Password",
      key: "confirmPassword",
    },
  ];
  const bottom = [
    { value: "Already you have an account? ", key: "login", path: "/login" },
  ];
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const SignUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "username must be of 3 characters long.")
      .required("This field is required"),
    email: Yup.string()
      .email("Enter valid Email")
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(6, "must be of 6 characters long."),
    confirmPassword: Yup.string()
      .required("This field is required")
      .min(6, "must be of 6 characters long")
      .oneOf([Yup.ref("password")], "Password must match"),
  });
  return (
    <div>
      <Header/>
      <Form
        title="SignUp"
        data={data}
        bottom={bottom}
        initialValues={initialValues}
        Schema={SignUpSchema}
      />
    </div>
  );
}

export default SignUpPage;

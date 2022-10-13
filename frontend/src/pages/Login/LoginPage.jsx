import React from "react";
import Form from "../../component/Form/Form";
import * as Yup from "yup";
import Header from '../../component/Header/Header';
const LoginPage = () => {
  const data = [
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
  ];
  const bottom = [
    { value: "Create New Account", key: "signUp", path: "/signUp" },
  ];
  const initialValues = {
    email: "",
    password: "",
  };
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter valid Email')
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(6, "must be of 6 characters long."),
  });
  return (
    <div>
      <Header/>
      <Form
        title="LOGIN"
        data={data}
        bottom={bottom}
        initialValues={initialValues}
        Schema={LoginSchema}
      />
    </div>
  );
};

export default LoginPage;

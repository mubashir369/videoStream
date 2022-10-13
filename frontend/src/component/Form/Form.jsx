import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Form.css";
import {useDispatch,useSelector} from 'react-redux'
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../instance/axiosInstance";
import { loginUserAction } from "../../redux/slice/userSlice";
const Form = (props) => {

  const userData=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const formSubmit = async (value) => {
    if (props.title === "LOGIN") {
      dispatch(loginUserAction(value))
      if(userData.userAuth){
       
        navigate('/')
        toast.success("Your Login")
      }else if(userData.appErr){
        toast.error(userData.appErr)
      }
    
        

      
    } else if (props.title === "SignUp") {
      try {
        const { data } = await axiosInstance.post(`users/register`, value);
        console.log(data);
        toast.success("Success");
        navigate("/login");
      } catch (err) {
        toast.error(err.response.data.message || "Something Wrong");
      }
    }
  };

  useEffect(() => {
    if (props.title === "LOGIN") {
      if(userData.userAuth){
        navigate('/')
      }
    }
  }, []);
  return (
    <div>
      <div className="lMainDiv">
        <ToastContainer />
        <div className="lContainer shadow-lg p-3 mb-5  rounded">
          <h2 className="text-center lTtle ">{props.title}</h2>
          <div className="mt-3">
            <div>
              <Formik
                initialValues={props.initialValues}
                validationSchema={props.Schema}
                onSubmit={(value) => {
                  formSubmit(value);
                }}
              >
                {(formik) => {
                  return (
                    <form
                      onSubmit={formik.handleSubmit}
                      className=" shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                      {props.data.map((obj) => {
                        return (
                          <div className="mb-4" key={obj.key}>
                            <div className="">
                              <input
                                type={obj.type}
                                className={
                                  formik.errors[obj.key] &&
                                  formik.touched[obj.key]
                                    ? "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-error"
                                    : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                }
                                name={obj.key}
                                placeholder={obj.placeholder}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values[obj.key]}
                              />
                            </div>

                            {formik.touched[obj.key] &&
                              formik.errors[obj.key] && (
                                <span className="text-red-500 text-xs italic">
                                  {formik.errors[obj.key]}
                                </span>
                              )}
                          </div>
                        );
                      })}

                      <div className="form-group">
                        <input
                          type="submit"
                          value={props.title}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    </form>
                  );
                }}
              </Formik>

              <div className="flex justify-around">
                {props.bottom.map((obj) => {
                  return <Link to={obj.path} key={obj.value} > {obj.value}</Link>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

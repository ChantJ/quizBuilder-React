import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import {
  selectLoginError,
  selectLoginStatus,
  resetErrorMessage,
} from "store/auth";
import { loginRequestAsync, registerRequest } from "store/auth/asyncActions";
import { loginLabels, loginFields, Colors, Status } from "constants/index";
import { InputField, ErrorMessage, BtnContainer } from "containers";
import Header from "components/header";

const loginSchema = () =>
  Yup.object().shape({
    password: Yup.string().required("required"),
    email: Yup.string().required("required"),
    password_confirmation: Yup.string().when("signup", {
      is: true,
      then: Yup.string()
        .required("required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
  });

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const loginError = useSelector(selectLoginError);
  const loginStatus = useSelector(selectLoginStatus);

  useEffect(() => {
    if (loginStatus === Status.SUCCEEDED) history("../home", { replace: true });
  }, [history, loginStatus]);

  useEffect(() => {
    if (loginError) {
      toast.error(loginError);
      dispatch(resetErrorMessage());
    }
  }, [loginError, dispatch]);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      signup: false,
      password_confirmation: "",
    },
    resolver: yupResolver(loginSchema()),
  });

  const signup = watch("signup");
  
  const onSubmit = handleSubmit((data) => {
    const { email, password } = data;
    if (!signup) dispatch(loginRequestAsync({ email, password }));
    else dispatch(registerRequest({ email, password }));
  });

  const handleTypeChange = () => {
    setValue("signup", !signup);
    clearErrors();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  return (
    <div className="w-100 h-100">
      <Header title="Quiz Builder" />
      <BodyWrapper>
        <InputField>
          <label>Email</label>
          <Input
            placeholder="please enter your email"
            {...register("email")}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputField>
        <InputField>
          <label>Password</label>
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            placeholder="please enter your password"
            {...register("password")}
            onChange={handleChange}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputField>
        {signup && (
          <InputField>
            <label>Confirm Password</label>
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              placeholder="please confirm your password"
              {...register("password_confirmation")}
              onChange={handleChange}
            />
            {errors.password_confirmation && (
              <ErrorMessage>
                {errors.password_confirmation.message}
              </ErrorMessage>
            )}
          </InputField>
        )}
        <BtnContainer type="primary" onClick={onSubmit}>
          {loginLabels[!signup].btnText}
        </BtnContainer>
        <Register>
          <div>{loginLabels[signup].text}</div>
          <SignUp onClick={() => handleTypeChange()}>
            {loginLabels[signup].btnText}
          </SignUp>
        </Register>
      </BodyWrapper>
    </div>
  );
};
export default Login;

const BodyWrapper = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Register = styled.div`
  font-weight: 600;
  display: flex;
  gap: 5px;
  margin-top: 10px;
`;

const SignUp = styled.div`
  color: ${Colors.dark_blue};
  cursor: pointer;
`;

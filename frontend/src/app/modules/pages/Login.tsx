import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginDto } from "@app/core/interfaces/loginDto";
import { loginUser } from "@app/core/redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@app/core/redux/store";
import { useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const loginError = useSelector((state: RootState) => state.auth.error);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format email tidak valid")
      .required("Email harus diisi"),
    password: Yup.string().required("Password harus diisi"),
  });

  const handleSubmit = async (values: LoginDto) => {
    await dispatch(loginUser(values));
  };

  const formLogin = useFormik<LoginDto>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const storedCredentials = localStorage.getItem("credentials");
    if (storedCredentials) {
      const parsedCredentials = JSON.parse(storedCredentials);
      formLogin.setValues({
        email: parsedCredentials.email,
        password: parsedCredentials.password,
        rememberMe: true,
      });
    }
  }, []);

  return (
    <div>
      <section className="relative block h-[50vh]">
        <div
          className="bg-profile-background absolute top-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/img/background-2.jpg')" }}
        />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>

      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto px-6">
          <div className="relative mb-6 -mt-64 max-w-md mx-auto">
            <Card className="w-full p-6">
              <div className="flex justify-center flex-col items-center">
                <img
                  src="/img/logo.png"
                  alt="Logo"
                  style={{ width: "140px", height: "auto" }}
                  className="my-4"
                />
                <Typography variant="h4" color="blue-gray">
                  LOGIN
                </Typography>
              </div>
              <form className="mt-6 mb-2" onSubmit={formLogin.handleSubmit}>
                <div className="flex flex-col gap-4">
                  {loginError && (
                    <Alert
                      icon={
                        <InformationCircleIcon
                          strokeWidth={2}
                          className="h-6 w-6"
                        />
                      }
                      color="red"
                      variant="ghost"
                      className="mb-4"
                    >
                      <span>{loginError}</span>
                    </Alert>
                  )}
                  <div>
                    <Input
                      variant="standard"
                      type="email"
                      label="Email"
                      color="orange"
                      name="email"
                      value={formLogin.values.email}
                      onChange={formLogin.handleChange}
                      onBlur={formLogin.handleBlur}
                    />
                    {formLogin.touched.email && formLogin.errors.email ? (
                      <Typography variant="small" color="red">
                        {formLogin.errors.email}
                      </Typography>
                    ) : null}
                  </div>

                  <div>
                    <Input
                      variant="standard"
                      type="password"
                      label="Kata Sandi"
                      color="orange"
                      name="password"
                      value={formLogin.values.password}
                      onChange={formLogin.handleChange}
                      onBlur={formLogin.handleBlur}
                    />
                    {formLogin.touched.password && formLogin.errors.password ? (
                      <Typography variant="small" color="red">
                        {formLogin.errors.password}
                      </Typography>
                    ) : null}
                  </div>

                  <div className="-ml-2.5">
                    <Checkbox
                      label={
                        <Typography
                          variant="small"
                          color="gray"
                          className="flex items-center font-normal"
                        >
                          Ingat Saya
                        </Typography>
                      }
                      color="orange"
                      checked={formLogin.values.rememberMe}
                      onChange={formLogin.handleChange}
                      name="rememberMe"
                    />
                  </div>
                  <Button
                    variant="gradient"
                    fullWidth
                    color="deep-orange"
                    type="submit"
                  >
                    MASUK
                  </Button>
                  <Typography variant="small" className="flex justify-center">
                    Tidak memiliki akun?
                    <Link to="/register">
                      <Typography
                        as="span"
                        variant="small"
                        className="ml-1 font-bold text-orange-500 transition-colors hover:text-orange-700"
                      >
                        Daftar
                      </Typography>
                    </Link>
                  </Typography>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

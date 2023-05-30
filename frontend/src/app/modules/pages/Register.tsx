import { RegisterDto } from "@app/core/interfaces/registerDto";
import { register } from "@app/core/redux/actions/userRequestActions";
import { AppDispatch, RootState } from "@app/core/redux/store";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  Alert,
  Button,
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const registerError = useSelector((state: RootState) => state.auth.error);

  const registerSchema = Yup.object().shape({
    fullName: Yup.string().required("Nama lengkap harus diisi"),
    nickName: Yup.string().optional(),
    email: Yup.string()
      .email("Format email tidak valid")
      .required("Email harus diisi"),
    phoneNumber: Yup.string().required("Nomor telepon harus diisi"),
    instagram: Yup.string().optional(),
  });

  const handleSubmit = async (values: RegisterDto) => {
    await dispatch(register(values));
    console.log(values);
  };

  const formRegister = useFormik<RegisterDto>({
    initialValues: {
      fullName: "",
      nickName: "",
      email: "",
      phoneNumber: "",
      instagram: "",
    },
    validationSchema: registerSchema,
    onSubmit: handleSubmit,
  });

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
                  REGISTER
                </Typography>
              </div>
              <form className="mt-6 mb-2" onSubmit={formRegister.handleSubmit}>
                <div className="flex flex-col gap-4">
                  {registerError && (
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
                        <span>{registerError}</span>
                      </Alert>
                    )}
                  <div>
                    <Input
                      variant="standard"
                      type="text"
                      label="*Nama Lengkap"
                      color="orange"
                      name="fullName"
                      value={formRegister.values.fullName}
                      onChange={formRegister.handleChange}
                      onBlur={formRegister.handleBlur}
                    />
                    {formRegister.touched.fullName &&
                    formRegister.errors.fullName ? (
                      <Typography variant="small" color="red">
                        {formRegister.errors.fullName}
                      </Typography>
                    ) : null}
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        variant="standard"
                        type="email"
                        label="*Email"
                        color="orange"
                        name="email"
                        value={formRegister.values.email}
                        onChange={formRegister.handleChange}
                        onBlur={formRegister.handleBlur}
                      />
                      {formRegister.touched.email &&
                      formRegister.errors.email ? (
                        <Typography variant="small" color="red">
                          {formRegister.errors.email}
                        </Typography>
                      ) : null}
                    </div>
                    <div className="flex-1">
                      <Input
                        variant="standard"
                        type="text"
                        label="*Nomor Telepon"
                        color="orange"
                        name="phoneNumber"
                        value={formRegister.values.phoneNumber}
                        onChange={formRegister.handleChange}
                        onBlur={formRegister.handleBlur}
                      />
                      {formRegister.touched.phoneNumber &&
                      formRegister.errors.phoneNumber ? (
                        <Typography variant="small" color="red">
                          {formRegister.errors.phoneNumber}
                        </Typography>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div>
                        <Input
                          variant="standard"
                          type="text"
                          label="Nama Panggilan"
                          color="orange"
                          name="nickName"
                          value={formRegister.values.nickName}
                          onChange={formRegister.handleChange}
                          onBlur={formRegister.handleBlur}
                        />
                        {formRegister.touched.nickName &&
                        formRegister.errors.nickName ? (
                          <Typography variant="small" color="red">
                            {formRegister.errors.nickName}
                          </Typography>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex-1">
                      <Input
                        variant="standard"
                        type="text"
                        label="Instagram"
                        color="orange"
                        name="instagram"
                        value={formRegister.values.instagram}
                        onChange={formRegister.handleChange}
                        onBlur={formRegister.handleBlur}
                      />
                      {formRegister.touched.instagram &&
                      formRegister.errors.instagram ? (
                        <Typography variant="small" color="red">
                          {formRegister.errors.instagram}
                        </Typography>
                      ) : null}
                    </div>
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

export default Register;

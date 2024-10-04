import {
  Box,
  Button,
  Grid,
  Text,
  TextField,
  Spinner,
  Link,
  Separator,
  Card,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useGoogleAuthMutation, useLoginMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setGoogleCredentials,
  setToken,
  setUser,
} from "../../slices/authSlice";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { Link as RouterLink } from "react-router-dom";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";

export default function LoginForm() {
  const { appearance } = useSelector((state) => state.theme);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();
  const [googleAuth, { isLoading: googleAuthIsLoading }] =
    useGoogleAuthMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.access_token));
      navigate("/");
    } catch (error) {
      if (error.data?.status == 400) {
        error.data?.errors?.map((error) => {
          setError(error.field, {
            type: "manual",
            message: error.message,
          });
        });
      } else if (error.data?.status == 401) {
        setError("email", {
          type: "manual",
          message: "Email or password is incorrect",
        });
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const loginAction = useGoogleLogin({
    onSuccess: async (credentials) => {
      dispatch(setGoogleCredentials(credentials));
      try {
        const response = await googleAuth(credentials).unwrap();
        dispatch(setUser(response.data.user));
        dispatch(setToken(response.data.access_token));
        navigate("/");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    onError: (error) => {
      toast.error("Something went wrong");
    },
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope: "https://www.googleapis.com/auth/drive",
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          className="my-8 gap-y-4 md:gap-y-0 lg:gap-x-4 lg:gap-y-4"
          flow="row"
          align="start"
          columns={{
            sm: "1",
          }}
        >
          <Box>
            <label className="mb-2 block text-sm">Email</label>
            <TextField.Root
              type="email"
              placeholder="johndoe@gmail.com"
              {...register("email")}
            ></TextField.Root>
            <Text color="crimson">{errors.email?.message}</Text>
          </Box>
          <Box>
            <label className="mb-2 block text-sm">Password</label>
            <TextField.Root
              type="password"
              placeholder="********"
              {...register("password")}
            ></TextField.Root>
            <Text color="crimson">{errors.password?.message}</Text>
          </Box>
        </Grid>
        <Button className="mt-8 w-full" disabled={isLoading}>
          {(isLoading || googleAuthIsLoading) && <Spinner size="2" />}
          Sign In
        </Button>
      </form>

      <Box className="mt-8 text-center">
        <Text>Don't have account? </Text>
        <Link asChild className="">
          <RouterLink to="/register">Sign Up</RouterLink>
        </Link>
      </Box>
      <Separator className="mt-8 w-full" />
      <Card className="mt-8 p-0" size="1">
        <GoogleButton
          style={{
            margin: "0 auto",
            padding: "0",
            width: "100%",
            boxShadow: "none",
          }}
          type={appearance === "dark" ? "dark" : "light"}
          onClick={loginAction}
        />
      </Card>
    </>
  );
}

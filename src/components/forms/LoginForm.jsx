import {
  Box,
  Button,
  Grid,
  Text,
  TextField,
  Spinner,
  Link,
  Separator,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useGoogleAuthMutation, useLoginMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setGoogleCredentials,
  setToken,
  setUser,
} from "../../slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { Link as RouterLink } from "react-router-dom";

export default function LoginForm() {
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
      }
    }
  };

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
      <Box className="mt-8">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const auth = await googleAuth({
                credentials: credentialResponse,
              });
              dispatch(setGoogleCredentials(credentialResponse));
              dispatch(setUser(auth.data.data.user));
              dispatch(setToken(auth.data.data.access_token));
              navigate("/");
            } catch (error) {
              console.log("Login Failed");
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Box>
    </>
  );
}

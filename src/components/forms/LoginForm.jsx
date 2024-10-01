import { Box, Button, Grid, Text, TextField, Spinner } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../slices/authSlice";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      navigate("/");
    } catch (error) {
      if (error.data?.status == 400) {
        error.data?.errors?.map((error) => {
          setError(error.field, {
            type: "manual",
            message: error.message,
          });
        });
      }
    }
  };

  return (
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
        {isLoading && <Spinner size="2" />}
        Sign Up
      </Button>
    </form>
  );
}

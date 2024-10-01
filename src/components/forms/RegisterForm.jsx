import { Box, Button, Grid, Spinner, Text, TextField } from "@radix-ui/themes";

import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../services/api";

import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();
  const [registerRequest, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { username, email, password } = data;
      await registerRequest({
        username,
        email,
        password,
      }).unwrap();
      navigate("/login");
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
          md: "2",
        }}
      >
        <Box>
          <label className="mb-2 block text-sm">Username</label>
          <TextField.Root
            placeholder="John"
            {...register("username", {
              required: {
                value: true,
                message: "Please provide your username",
              },
              maxLength: {
                value: 20,
                message: "Username must be less than 20 characters",
              },
            })}
          ></TextField.Root>
          <Text color="crimson" size="2">
            {errors.username?.message}
          </Text>
        </Box>
        <Box>
          <label className="mb-2 block text-sm">Email</label>
          <TextField.Root
            placeholder="johndoe@gmail.com"
            {...register("email", {
              required: {
                value: true,
                message: "Please provide your email",
              },
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please provide a valid email",
              },
            })}
          ></TextField.Root>
          <Text color="crimson" size="2">
            {errors.email?.message}
          </Text>
        </Box>
        <Box>
          <label className="mb-2 block text-sm">Password</label>
          <TextField.Root
            type="password"
            placeholder="********"
            {...register("password", {
              required: {
                value: true,
                message: "Please provide your password",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          ></TextField.Root>
          <Text color="crimson" size="2">
            {errors.password?.message}
          </Text>
        </Box>
        <Box>
          <label className="mb-2 block text-sm">Password Confirmation</label>
          <TextField.Root
            type="password"
            placeholder="********"
            {...register("passwordConfirmation", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: (value) =>
                value ===
                  document.querySelector('input[name="password"]').value ||
                "Passwords do not match",
            })}
          ></TextField.Root>
          <Text color="crimson" size="2">
            {errors.passwordConfirmation?.message}
          </Text>
        </Box>
      </Grid>
      <Button className="mt-8 w-full" disabled={isLoading}>
        {isLoading && <Spinner size="2" />}
        Sign Up
      </Button>
    </form>
  );
}

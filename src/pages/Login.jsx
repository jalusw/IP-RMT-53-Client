import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Flex
        direction={{
          sm: "column",
          md: "row",
        }}
      >
        <Card className="flex min-h-[100vh] flex-1 items-center px-8 md:px-12 lg:max-w-[800px] lg:px-28">
          <Box className="w-full">
            <Heading size="8">Sign In</Heading>
            <Text className="mt-4 block">Please sign in to continue.</Text>
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
                    {...register("email ")}
                  ></TextField.Root>
                </Box>
                <Box>
                  <label className="mb-2 block text-sm">Password</label>
                  <TextField.Root
                    type="password"
                    placeholder="********"
                    {...register("password")}
                  ></TextField.Root>
                </Box>
              </Grid>
              <Button className="mt-8 w-full">Sign In</Button>
            </form>
            <Box className="mt-8 text-center">
              <Text>Don't have account? </Text>
              <Link asChild className="">
                <RouterLink to="/register">Sign Up</RouterLink>
              </Link>
            </Box>
          </Box>
        </Card>
      </Flex>
    </>
  );
}

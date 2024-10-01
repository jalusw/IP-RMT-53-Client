import { Box, Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { Link as RouterLink } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

export default function Login() {
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
            <LoginForm />
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

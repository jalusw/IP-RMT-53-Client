import { Box, Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";

export default function Register() {
  return (
    <>
      <Box>
        <Flex
          direction={{
            sm: "column",
            md: "row",
          }}
        >
          <Card className="flex min-h-[100vh] flex-1 items-center px-8 md:px-12 lg:max-w-[800px] lg:px-28">
            <Box className="w-full">
              <Heading className="manrope-bold" size="8">
                Sign Up
              </Heading>
              <Text className="mt-4 block">Please sign up to continue.</Text>
              <RegisterForm />
              <Box className="mt-8 text-center">
                <Text>Already have an account? </Text>
                <Link asChild className="">
                  <RouterLink to="/login">Sign In</RouterLink>
                </Link>
              </Box>
            </Box>
          </Card>

          <Box className="hidden h-[100vh] w-full flex-1 items-center justify-center px-8 md:flex">
            <Text className="manrope-bold max-w-[33ch] text-center text-3xl leading-relaxed xl:text-4xl xl:leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              provident corrupti ducimus.
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

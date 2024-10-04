import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import LoginForm from "../components/forms/LoginForm";

export default function Login() {
  return (
    <>
      <Box>
        <Flex
          direction={{
            sm: "column",
            md: "row",
          }}
        >
          <Card className="flex min-h-[100vh] flex-1 items-center px-8 md:px-12 lg:max-w-[500px] lg:px-28 xl:max-w-[650px]">
            <Box className="mx-auto w-full md:w-full md:max-w-[450px] lg:w-full">
              <Heading className="manrope-bold" size="8">
                Sign In
              </Heading>
              <Text className="mt-4 block">Please sign in to continue.</Text>
              <LoginForm />
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

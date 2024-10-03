import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
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
          </Box>
        </Card>
      </Flex>
    </>
  );
}

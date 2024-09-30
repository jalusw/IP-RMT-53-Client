import { Container, Text, Heading } from "@radix-ui/themes";

export default function NotFound() {
  return (
    <main>
      <Container mt="8">
        <Heading size="8">404</Heading>
        <Text>Sorry, but the page you're looking for is not found.</Text>
      </Container>
    </main>
  );
}

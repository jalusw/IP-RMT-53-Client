import {
  Container,
  Text,
  Heading,
  Section,
  Button,
  Card,
} from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <header>
        <Section>
          <Container>
            <Heading className="block text-6xl font-bold">
              Write anything with ease.
            </Heading>
            <Text className="mt-4 block">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Doloremque corporis maxime, nobis reiciendis explicabo
              perspiciatis excepturi harum animi.
            </Text>
          </Container>
        </Section>
      </header>
    </>
  );
}

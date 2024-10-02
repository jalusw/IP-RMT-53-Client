import { Container, Text, Heading, Section, Button } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <header className="py-28">
        <Section>
          <Container className="px-4">
            <Heading className="block text-6xl font-bold">
              Write anything with ease.
            </Heading>
            <Text className="mt-4 block max-w-[66ch] leading-loose">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Doloremque corporis maxime, nobis reiciendis explicabo
              perspiciatis excepturi harum animi.
            </Text>
            <Button variant="outline" mt="5" size="3">
              Try it now
            </Button>
          </Container>
        </Section>
      </header>
      <main id="main"></main>
    </>
  );
}

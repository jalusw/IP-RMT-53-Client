import {
  Container,
  Text,
  Heading,
  Section,
  Button,
  Card,
  Flex,
  Separator,
} from "@radix-ui/themes";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <header className="py-32">
        <Section>
          <Container className="px-4">
            <div className="mx-auto text-center">
              <Heading className="manrope-bold block text-6xl font-bold">
                Yet another note taking app
              </Heading>

              <Text className="mx-auto my-8 block max-w-[66ch] leading-loose">
                We just launched a note-taking app that’s so intuitive and fast,
                it might just give you whiplash! Powered by AI, it’s definitely
                not just another excuse to avoid organizing your life (though
                let’s be honest, it might help you dodge that chaos a bit!).
              </Text>

              <Button size="3" asChild>
                <Link to="/workspace">Try it now</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </header>
      <main id="main">
        <Container className="px-8">
          <Section size="3">
            <Heading className="manrope-bold text-center text-4xl">
              Key Features
            </Heading>
            <Flex className="mt-12 flex-col lg:flex-row" gap="8">
              <Card className="p-8">
                <Heading className="manrope-bold">Markdown Support</Heading>
                <Text className="mt-4 block">
                  Turn lengthy notes into concise summaries with our AI
                  summarization feature. Perfect for quickly reviewing essential
                  points or sharing highlights with others without sifting
                  through all the details.
                </Text>
              </Card>
              <Card className="p-8">
                <Heading className="manrope-bold">AI Powered</Heading>
                <Text className="mt-4 block">
                  Turn lengthy notes into concise summaries with our AI
                  summarization feature. Perfect for quickly reviewing essential
                  points or sharing highlights with others without sifting
                  through all the details.
                </Text>
              </Card>
              <Card className="p-8">
                <Heading className="manrope-bold">Cloud Storage</Heading>
                <Text className="mt-4 block">
                  Rest easy knowing your notes are automatically backed up to
                  the cloud. Our reliable storage ensures that your content is
                  safe, up-to-date, and retrievable, so you can focus on what
                  matters most—your ideas.
                </Text>
              </Card>
            </Flex>
          </Section>
        </Container>
        <footer>
          <Container className="mt-40 px-8 py-10">
            <Heading className="manrope-bold text-4xl" color="jade">
              FlowMD
            </Heading>
            <Separator className="mt-4 w-full" />
            <Flex
              className="mt-8 flex-col gap-y-8 md:flex-row"
              justify="between"
            >
              <Flex gap="4">
                <Link to="/">Home</Link>
                <Link to="/">Support</Link>
              </Flex>
              <Text>Brought to you by the open-source community</Text>
            </Flex>
          </Container>
        </footer>
      </main>
    </>
  );
}

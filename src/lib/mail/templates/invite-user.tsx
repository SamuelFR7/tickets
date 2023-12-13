import {
  Html,
  Tailwind,
  Head,
  Body,
  Section,
  Container,
  Heading,
  Preview,
  Text,
  Button,
  Link,
  Hr,
} from '@react-email/components'
import * as React from 'react'

interface InviteUserTemplateProps {
  inviteLink: string
}

export function InviteUserTemplate({ inviteLink }: InviteUserTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Join on Tickets</Preview>
      <Tailwind>
        <Body key="body" className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Heading as="h1">Tickets</Heading>
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join on <strong>Tickets</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              You have been invited to the <strong>tickets app</strong>.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] px-20 py-12 rounded text-white text-[12px] font-semibold no-underline text-center"
                href={inviteLink}
              >
                Join the team
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

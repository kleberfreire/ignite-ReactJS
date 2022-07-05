import { Box, Image, Flex } from "@chakra-ui/react";

export function Header() {
  return (
    <Box>
      <Flex align="center" justify="center" height={100}>
        <Image src="/imgs/Logo.svg" alt="Logo" width="184px" />
      </Flex>
    </Box>
  );
}

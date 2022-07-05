import { Box, Flex, Image } from "@chakra-ui/react";

export function Banner() {
  return (
    <Box width="100%" height="368px">
      <Box
        bg="url('/imgs/BackgroundBanner.svg') "
        bgPosition="top"
        bgRepeat="no-repeat"
        bgSize="100vw 100%"
        width="100vw"
        height={368}
      >
        <Flex justify="between"></Flex>
      </Box>
    </Box>
  );
}

import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface IProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: IProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Kleber Freire</Text>
          <Text color="gray.300" fontSize="small">
            kleber@kleberfreire.dev
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Kleber Freire"
        src="https://github.com/kleberfreire.png"
        showBorder={true}
      />
    </Flex>
  );
}

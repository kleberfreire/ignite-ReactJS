import {
  Icon,
  Link,
  Text,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

interface INavilinkProps extends ChakraLinkProps {
  icon: React.ElementType;
  children: string;
}

export function NavLink({ children, icon, ...rest }: INavilinkProps) {
  return (
    <Link display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}

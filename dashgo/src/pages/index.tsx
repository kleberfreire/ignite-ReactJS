import type { NextPage } from "next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Flex, Button, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

type TSignInFormData = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Digite um E-mail válido"),
  password: yup.string().required("Password obrigatório"),
});

const SingIn: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<TSignInFormData>({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<TSignInFormData> = (values) => {
    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        maxWidth={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            type="email"
            label="E-mail"
            error={errors.email}
            {...register("email")}
          />

          <Input
            type="password"
            label="Password"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default SingIn;

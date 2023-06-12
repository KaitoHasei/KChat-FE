import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { Button, Heading } from "@chakra-ui/react";

import google_logo from "@chat/assets/images/google_logo.svg";

const Auth = () => {
  return (
    <div id="kchat__auth">
      <div className="auth__wrapper">
        <div className="auth__header">
          <Heading as="h3" size="lg">
            Welcome to KChat!
          </Heading>
        </div>
        <div className="auth__body">
          <Button
            className="auth-button"
            leftIcon={
              <Image
                className="icon"
                src={google_logo}
                alt="google_logo"
                width={32}
              />
            }
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

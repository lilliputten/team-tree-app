import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Icons, IconType } from '@/components/shared/icons';
import { Logo } from '@/components/shared/Logo';
import { isDev } from '@/constants';

type TSignInParameters = Parameters<typeof signIn>;
type TProvider = TSignInParameters[0];

interface OAuthSignInButtonProps {
  currentProvider?: TProvider;
  setSignInClicked: Dispatch<SetStateAction<TProvider>>;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
  provider: TProvider;
  ProviderIcon: IconType; // React.FC;
  text: string;
}

function OAuthSignInButton(props: OAuthSignInButtonProps) {
  const {
    // prettier-ignore
    currentProvider,
    setSignInClicked,
    setShowSignInModal,
    provider,
    ProviderIcon,
    text,
  } = props;
  const isClicked = !!currentProvider;
  const isThisClicked = currentProvider == provider;
  return (
    <Button
      className={cn(
        // prettier-ignore
        isDev && '__sign-in-modal-button',
      )}
      variant="primary"
      rounded="full"
      disabled={isClicked}
      onClick={() => {
        setSignInClicked(provider);
        // @see https://next-auth.js.org/getting-started/client#specifying-a-callbackurl
        signIn(provider /* , { redirect: false, callbackUrl: '/' } */).then(() => {
          // Hide the modal
          setTimeout(() => {
            setShowSignInModal(false);
          }, 400);
        });
      }}
    >
      {isThisClicked ? (
        <Icons.spinner className="mr-2 size-4 animate-spin" />
      ) : (
        <ProviderIcon className="mr-2 size-4" />
      )}{' '}
      {text}
    </Button>
  );
}

function SignInModal({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [currentProvider, setSignInClicked] = useState<TProvider>(undefined);

  return (
    <Modal
      showModal={showSignInModal}
      setShowModal={setShowSignInModal}
      className={cn(
        // prettier-ignore
        isDev && '__sign-in-modal',
        'text-center',
        'text-primary-foreground',
      )}
    >
      <div className="w-full bg-primary">
        <div
          className={cn(
            // prettier-ignore
            'flex',
            'flex-col',
            'items-center',
            'justify-center',
            'space-y-3',
            'bg-primary',
            'border-b',
            'border-primary-400',
            'px-4',
            'py-6',
            'pt-8',
            'md:px-16',
          )}
        >
          <a href={siteConfig.url}>
            <Logo
              // size="lg"
              className="size-18"
            />
          </a>
          <h3
            className={cn(
              // prettier-ignore
              'font-urban',
              'text-2xl',
              'font-bold',
              'text-app-orange',
            )}
          >
            Sign In
          </h3>
          <p
            className={cn(
              // prettier-ignore
              'text-sm',
            )}
          >
            This is strictly for demo purposes - only your email and profile picture will be stored.
          </p>
        </div>

        <div
          className={cn(
            // prettier-ignore
            'flex',
            'flex-col',
            'space-y-4',
            'bg-primary-400',
            'px-4',
            'py-8',
            'md:px-16',
          )}
        >
          <OAuthSignInButton
            currentProvider={currentProvider}
            setSignInClicked={setSignInClicked}
            setShowSignInModal={setShowSignInModal}
            provider="github"
            ProviderIcon={Icons.github}
            text="Sign In with Github"
          />
          <OAuthSignInButton
            currentProvider={currentProvider}
            setSignInClicked={setSignInClicked}
            setShowSignInModal={setShowSignInModal}
            provider="yandex"
            ProviderIcon={Icons.yandex}
            text="Sign In with Yandex"
          />
          <OAuthSignInButton
            currentProvider={currentProvider}
            setSignInClicked={setSignInClicked}
            setShowSignInModal={setShowSignInModal}
            provider="google"
            ProviderIcon={Icons.google}
            text="Sign In with Google"
          />
        </div>
      </div>
    </Modal>
  );
}

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal showSignInModal={showSignInModal} setShowSignInModal={setShowSignInModal} />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({
      setShowSignInModal,
      SignInModal: SignInModalCallback,
    }),
    [setShowSignInModal, SignInModalCallback],
  );
}

'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons, IconType } from '@/components/shared/icons';
import { Logo } from '@/components/shared/Logo';
import { isDev } from '@/constants';
import { dataRoute } from '@/constants/routes';

type TSignInParameters = Parameters<typeof signIn>;
export type TSignInProvider = TSignInParameters[0];

interface OAuthSignInButtonProps {
  currentProvider?: TSignInProvider;
  onSignInStart?: (provider: TSignInProvider) => void;
  onSignInDone?: (provider: TSignInProvider) => void;
  provider: TSignInProvider;
  ProviderIcon: IconType; // React.FC;
  text: string;
}

function OAuthSignInButton(props: OAuthSignInButtonProps) {
  const {
    // prettier-ignore
    currentProvider,
    onSignInStart,
    onSignInDone,
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
        if (onSignInStart) {
          onSignInStart(provider);
        }
        // @see https://next-auth.js.org/getting-started/client#specifying-a-callbackurl
        signIn(provider, {
          // redirect: false,
          callbackUrl: dataRoute,
        }).then(() => {
          if (onSignInDone) {
            onSignInDone(provider);
          }
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

interface TSignInFormHeaderProps {
  dark?: boolean;
}

export function SignInFormHeader(props: TSignInFormHeaderProps) {
  const { dark } = props;
  const t = useTranslations('SignInForm');
  return (
    <>
      <a href={siteConfig.url}>
        <Logo className="size-18" dark={dark} />
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
        {t('sign-in')}
      </h3>
      <p
        className={cn(
          // prettier-ignore
          'text-center',
          'text-sm',
        )}
      >
        {t('intro')}
      </p>
    </>
  );
}

interface TSignInFormProps {
  onSignInStart?: (provider: TSignInProvider) => void;
  onSignInDone?: (provider: TSignInProvider) => void;
}

export function SignInForm(props: TSignInFormProps) {
  const { onSignInStart, onSignInDone } = props;
  const [currentProvider, setCurrentProvider] = React.useState<TSignInProvider>(undefined);
  const t = useTranslations('SignInForm');

  const handleSignInStart = React.useCallback(
    (provider: TSignInProvider) => {
      setCurrentProvider(provider);
      if (onSignInStart) {
        onSignInStart(provider);
      }
    },
    [onSignInStart],
  );

  return (
    <>
      <OAuthSignInButton
        currentProvider={currentProvider}
        onSignInStart={handleSignInStart}
        onSignInDone={onSignInDone}
        provider="github"
        ProviderIcon={Icons.github}
        text={t('sign-in-with-github')}
      />
      <OAuthSignInButton
        currentProvider={currentProvider}
        onSignInStart={handleSignInStart}
        onSignInDone={onSignInDone}
        provider="yandex"
        ProviderIcon={Icons.yandex}
        text={t('sign-in-with-yandex')}
      />
      <OAuthSignInButton
        currentProvider={currentProvider}
        onSignInStart={handleSignInStart}
        onSignInDone={onSignInDone}
        provider="google"
        ProviderIcon={Icons.google}
        text={t('sign-in-with-google')}
      />
      {/* TODO: Email login section (resend) */}
    </>
  );
}

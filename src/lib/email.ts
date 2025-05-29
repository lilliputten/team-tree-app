import { EmailConfig } from 'next-auth/providers/email';
import { Resend } from 'resend';

import { env } from '@/env';
import { siteConfig } from '@/config/site';
import { MagicLinkEmail } from '@/emails/magic-link-email';
import { getUserByEmail } from '@/features/users/actions/';

export const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationRequest: EmailConfig['sendVerificationRequest'] = async ({
  identifier,
  url,
  provider,
}) => {
  const user = await getUserByEmail(identifier);
  if (!user || !user.name) {
    return;
  }

  const userVerified = user?.emailVerified ? true : false;
  const authSubject = userVerified
    ? `Sign-in link for ${siteConfig.name}`
    : 'Activate your account';

  try {
    const { data, error } = await resend.emails.send({
      from: provider.from || env.EMAIL_FROM,
      to: process.env.NODE_ENV === 'development' ? 'delivered@resend.dev' : identifier,
      subject: authSubject,
      react: MagicLinkEmail({
        firstName: user?.name as string,
        actionUrl: url,
        mailType: userVerified ? 'login' : 'register',
        siteName: siteConfig.name,
      }),
      // Set this to prevent Gmail from threading emails.
      // More info: https://resend.com/changelog/custom-email-headers
      headers: {
        'X-Entity-Ref-ID': String(new Date().getTime()),
      },
    });

    if (error || !data) {
      throw new Error(error?.message);
    }

    // console.log(data)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[email:sendVerificationRequest]', error);
    debugger; // eslint-disable-line no-debugger
    throw new Error('Failed to send verification email.');
  }
};

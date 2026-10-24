/*
 * The contact form has no backend and never had one: it composes a mailto: URL
 * and hands it to the mail client. This is the whole behaviour, moved out of
 * main.js without changing a character of the message it builds, because
 * whoever receives that email is the one who would notice.
 */

import type { FormEvent } from 'react';

export const ENQUIRY_ADDRESS = 'info@r4space.com';

export function buildMailto(data: FormData): string {
  const subject = encodeURIComponent(
    (data.get('subject') as string) || 'R4 Website Enquiry',
  );
  const body = encodeURIComponent(
    `Name: ${(data.get('name') as string) || ''}\n` +
      `Organisation: ${(data.get('organisation') as string) || ''}\n` +
      `Email: ${(data.get('email') as string) || ''}\n` +
      `Application domain: ${(data.get('domain') as string) || ''}\n\n` +
      `${(data.get('message') as string) || ''}`,
  );
  return `mailto:${ENQUIRY_ADDRESS}?subject=${subject}&body=${body}`;
}

export function submitContact(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  window.location.href = buildMailto(new FormData(event.currentTarget));
}

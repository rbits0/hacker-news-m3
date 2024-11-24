import { Href, Link } from 'expo-router';
import React from 'react';
import { PropsWithChildren } from 'react';


interface EnabledProps {
  enabled?: true,
  href: Href,
}

interface DisabledProps {
  enabled: false,
  href: Href | undefined | null,
}

type Props = EnabledProps | DisabledProps;

export default function OptionalLink(
  { enabled, href, children }: PropsWithChildren<Props>
) {
  if (enabled === undefined) {
    enabled = true;
  }
  
  if (enabled) {
    return (
      <Link
        href={href!}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </Link>
    );

  } else {
    return children;
  }
}
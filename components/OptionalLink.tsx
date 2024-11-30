import { Href, Link } from 'expo-router';
import React from 'react';
import { PropsWithChildren } from 'react';


interface Props {
  enabled?: boolean,
  href: Href | undefined | null,
}

export default function OptionalLink(
  { enabled, href, children }: PropsWithChildren<Props>
) {
  if (enabled === undefined) {
    enabled = true;
  }
  if (!href) {
    enabled = false;
  }
  
  if (enabled) {
    return (
      <Link
        href={href!}
      >
        {children}
      </Link>
    );

  } else {
    return children;
  }
}
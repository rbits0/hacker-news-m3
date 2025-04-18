import { Href, Link, LinkProps } from 'expo-router';
import React from 'react';
import { PropsWithChildren } from 'react';


interface OptionalLinkProps extends Omit<LinkProps, 'href'> {
  enabled?: boolean,
  href: Href | undefined | null,
}

export default function OptionalLink(
  props: PropsWithChildren<OptionalLinkProps>
) {
  let { enabled, href, children } = props;

  if (enabled === undefined) {
    enabled = true;
  }
  if (!href) {
    enabled = false;
  }
  
  if (enabled) {
    return (
      <Link
        {...props}
        href={href!}
      >
        {children}
      </Link>
    );

  } else {
    return children;
  }
}
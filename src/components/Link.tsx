import React from "react";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const InlineExternalLink: React.FC<LinkProps> = ({
  children,
  ...props
}) => (
  <a
    {...props}
    className={
      props.className
        ? props.className
        : "text-blue-700 dark:text-blue-400 underline font-medium hover:text-blue-900 dark:hover:text-blue-300"
    }
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

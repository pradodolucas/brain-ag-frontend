/** @jsxImportSource @emotion/react */

"use client";
import { useRouter } from "next/navigation";
import * as styles from "./styles";

interface ResumeItemProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  link?: string;
}

export const ResumeItem = ({
  icon,
  title,
  value,
  subtitle,
  link,
}: ResumeItemProps) => {
  const route = useRouter();
  return (
    <div css={styles.container}>
      <div css={styles.title.container}>
        {icon}
        <p css={styles.title.text}>{title}</p>
      </div>
      <p css={styles.text.value}>{value}</p>
      <p
        onClick={() => {
          if (link) {
            route.push(link);
          }
        }}
        css={[link ? styles.text.subtitleLink : styles.text.subtitle]}
      >
        {subtitle}
      </p>
    </div>
  );
};

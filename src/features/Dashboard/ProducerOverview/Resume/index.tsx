/** @jsxImportSource @emotion/react */

"use client";
import * as styles from "./styles";

interface ResumeItemProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const ResumeItem = ({
  icon,
  title,
  value,
  subtitle,
}: ResumeItemProps) => {
  return (
    <div css={styles.container}>
      <div css={styles.title.container}>
        {icon}
        <p css={styles.title.text}>{title}</p>
      </div>
      <p css={styles.text.value}>{value}</p>
      <p css={styles.text.subtitle}>{subtitle}</p>
    </div>
  );
};

/** @jsxImportSource @emotion/react */

import { styles } from "./styles";

import { useRouter, usePathname } from "next/navigation";
import { House, User, Tractor } from "lucide-react";
import { theme } from "@/styles/theme";

export interface DashboardProps {
  children: React.ReactNode;
  title?: string | null;
  subtitle?: string | null;
  titleAction?: React.ReactNode;
  menuActive?: string | null;
}

export function Dashboard({
  children,
  title = null,
  subtitle = null,
  titleAction = null,
  menuActive = null,
}: DashboardProps) {
  const router = useRouter();
  const urlCurrent = menuActive ?? usePathname();

  const menu = [
    {
      category: "Dashboard",
      items: [
        {
          text: "Visão Geral",
          url: "/",
          icon: <House color={theme.colors.PRIMARY} size={20} />,
        },
        {
          text: "Agricultores",
          url: "/producer",
          icon: <User color={theme.colors.PRIMARY} size={20} />,
        },
        {
          text: "Fazendas",
          url: "/farm",
          icon: <Tractor color={theme.colors.PRIMARY} size={20} />,
        },
      ],
    },
  ];

  return (
    <>
      <div css={styles.container}>
        <div css={styles.sidebar.container}>
          <div css={styles.sidebar.header}></div>
          <div css={styles.sidebar.menu.container}>
            {menu.map((category) => (
              <div
                key={category.category}
                css={styles.sidebar.menu.category.container}
              >
                <p css={styles.sidebar.menu.category.text}>
                  {category.category}
                </p>

                {category.items.map((item) => (
                  <div
                    key={item.text}
                    css={[
                      styles.sidebar.menu.item.container,
                      urlCurrent === item.url
                        ? styles.sidebar.menu.item.active
                        : null,
                    ]}
                    onClick={() => router.push(item.url)}
                  >
                    {item.icon}
                    <p css={styles.sidebar.menu.item.text}>{item.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div css={styles.content.page}>
          <header css={styles.content.header}>
           
          </header>

          <div css={styles.content.main}>
            {(title || subtitle) && (
              <div css={styles.content.subheader.container}>
                <div css={styles.content.subheader.text.container}>
                  {title && <h1 css={styles.content.title}>{title}</h1>}
                  {subtitle && (
                    <h2 css={styles.content.subtitle}>{subtitle}</h2>
                  )}
                </div>

                {titleAction && (
                  <div css={styles.content.subheader.actions.container}>
                    {titleAction}
                  </div>
                )}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </>
  );
}

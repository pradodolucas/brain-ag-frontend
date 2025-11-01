/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { css } from "@emotion/react";
import * as styles from "./styles";

export interface ModalProps {
  title?: React.ReactNode;
  titleActions?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  width?: string;
  loading?: boolean;
}

export interface ModalRef {
  open: () => void;
  close: (forceClose?: boolean) => void;
}

export const Modal = forwardRef<ModalRef, ModalProps>(
  (
    {
      title,
      children,
      footer,
      onClose,
      titleActions,
      width = "400px",
      loading = false,
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const open = () => {
      if (modalRef.current) {
        modalRef.current.style.transform = "translateX(0)";
      }
      if (overlayRef.current) {
        overlayRef.current.style.display = "flex";
        setTimeout(() => {
          if (overlayRef.current) {
            overlayRef.current.style.opacity = "1";
          }
        }, 10);
      }
    };

    const close = (forceClose = false) => {
      if (loading && !forceClose) {
        return;
      }

      if (modalRef.current) {
        modalRef.current.style.transform = "translateX(100%)";
      }
      if (overlayRef.current) {
        overlayRef.current.style.opacity = "0";
        setTimeout(() => {
          if (overlayRef.current) {
            overlayRef.current.style.display = "none";
          }
        }, 300);
      }
      onClose?.();
    };

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          close();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, []);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === overlayRef.current) {
        close();
      }
    };

    return (
      <>
        <div
          ref={overlayRef}
          css={styles.overlayStyles}
          onClick={handleOverlayClick}
        />
        <div ref={modalRef} css={styles.modalStyles} style={{ width: width }}>
          <div css={styles.header.container}>
            <button
              css={styles.header.close}
              onClick={() => close()}
              type="button"
              aria-label="Fechar modal"
            >
              ×
            </button>
            <h2 css={styles.header.text}>{title}</h2>

            {titleActions && (
              <div css={styles.header.actions.container}>{titleActions}</div>
            )}
          </div>

          <div css={styles.body.container}>{children}</div>

          {footer && <div css={styles.footer.container}>{footer}</div>}
        </div>
      </>
    );
  }
);

Modal.displayName = "Modal";

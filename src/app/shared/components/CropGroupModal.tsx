/** @jsxImportSource @emotion/react */

"use client";

import { forwardRef } from "react";
import { Modal, ModalRef } from "@/components/Modal";
import { Button } from "@/components/Button";
import { CropGroupProps, CropProps } from "@/types/crop";
import { CropItem, List } from "@/components/List";

interface CropGroupModalProps {
  onAdd?: () => void;
  onEdit?: (crop: CropProps) => void;
  cropGroup: CropGroupProps | null;
}

export const CropGroupModal = forwardRef<ModalRef, CropGroupModalProps>(
  ({ onAdd, onEdit, cropGroup }, ref) => {
    if (!cropGroup) {
      return;
    }

    return (
      <Modal
        ref={ref}
        title={"Safra " + cropGroup.year}
        footer={
          <Button 
          variant="primaryOutline"
           onClick={() => onAdd?.()}>
            {"Nova cultura"}
          </Button>
        }
      >
        <List>
          {cropGroup.crops.map((crop: CropProps) => (
            <CropItem
              key={crop.id}
              crop={crop}
              onClick={() => onEdit?.(crop)}
            />
          ))}
        </List>
      </Modal>
    );
  }
);

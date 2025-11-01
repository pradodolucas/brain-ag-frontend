import { CropProps } from "./crop";

export interface FarmProps {
  id: number;

  city: string;
  state: string;
  name: string;

  totalArea: number;
  cultivableArea: number;
  vegetationArea: number;

  producerId: number;
  crops: CropProps[];
}

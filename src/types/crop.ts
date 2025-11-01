export interface CropProps {
  id: number;
  food: string;
  year: number;
  farmId: number;
}


export interface CropGroupProps {
  year: number;
  farmId: number;
  crops: CropProps[];
}

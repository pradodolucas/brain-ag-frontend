import { FarmProps } from "./farm";

export interface ProducerProps {
  id: number;
  name: string;
  taxId: string;

  farms?: FarmProps[];
}

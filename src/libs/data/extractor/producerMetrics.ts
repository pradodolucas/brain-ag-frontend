import { ProducerProps } from "@/types/producer";

export function getTotalFarms(producers: ProducerProps[]): number {
  return producers.reduce((total, producer) => {
    return total + (producer.farms?.length || 0);
  }, 0);
}

export function getTotalProducers(producers: ProducerProps[]): number {
  return producers.length;
}

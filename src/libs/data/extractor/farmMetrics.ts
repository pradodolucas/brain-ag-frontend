import { ProducerProps } from "@/types/producer";

export function getTotalArea(producers: ProducerProps[]): number {
  return producers.reduce((total, producer) => {
    const farmsTotalArea =
      producer.farms?.reduce((farmTotal, farm) => {
        return farmTotal + Number(farm.totalArea);
      }, 0) || 0;
    return total + farmsTotalArea;
  }, 0);
}

export function getTotalVegetationArea(producers: ProducerProps[]): number {
  return producers.reduce((total, producer) => {
    const farmsVegetationArea =
      producer.farms?.reduce((farmTotal, farm) => {
        return farmTotal + Number(farm.vegetationArea);
      }, 0) || 0;
    return total + farmsVegetationArea;
  }, 0);
}

export function getTotalCultivableArea(producers: ProducerProps[]): number {
  return producers.reduce((total, producer) => {
    const farmsCultivableArea =
      producer.farms?.reduce((farmTotal, farm) => {
        return farmTotal + Number(farm.cultivableArea);
      }, 0) || 0;
    return total + farmsCultivableArea;
  }, 0);
}

export function getCultivableVsVegetationPercentage(
  producers: ProducerProps[]
): {
  cultivablePercentage: number;
  vegetationPercentage: number;
} {
  const totalCultivable = getTotalCultivableArea(producers);
  const totalVegetation = getTotalVegetationArea(producers);
  const totalArea = totalCultivable + totalVegetation;
  
  if (totalArea === 0) {
    return {
      cultivablePercentage: 0,
      vegetationPercentage: 0,
    };
  }

  const cultivablePercentage = (totalCultivable / totalArea) * 100;
  const vegetationPercentage = (totalVegetation / totalArea) * 100;

  return {
    cultivablePercentage: cultivablePercentage,
    vegetationPercentage: vegetationPercentage,
  };
}

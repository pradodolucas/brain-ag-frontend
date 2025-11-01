import { CropProps } from "@/types/crop";
import { ProducerProps } from "@/types/producer";
import { ChartDataProps } from "@/types/chartData";


export function groupCropsByState(
  crops: CropProps[],
  producers: ProducerProps[]
): ChartDataProps[] {
  const stateCountMap = new Map<string, number>();

  crops.forEach((crop) => {
    let state = "Unknown";

    // Procurar em todos os producers e suas farms
    for (const producer of producers) {
      if (producer.farms) {
        const farm = producer.farms.find(
          (farm) => farm.id === crop.farmId
        );
        if (farm) {
          state = farm.state;
          break;
        }
      }
    }

    // Atualizar o contador para este estado
    const currentCount = stateCountMap.get(state) || 0;
    stateCountMap.set(state, currentCount + 1);
  });

  // Converter o mapa para o formato desejado
  const result: ChartDataProps[] = [];
  stateCountMap.forEach((value, name) => {
    result.push({ name, value });
  });

  return result;
}

export function groupCropsByType(crops: CropProps[]): ChartDataProps[] {
  const cropCountMap = new Map<string, number>();

  crops.forEach((crop) => {
    const currentCount = cropCountMap.get(crop.food) || 0;
    cropCountMap.set(crop.food, currentCount + 1);
  });

  const result: ChartDataProps[] = [];
  cropCountMap.forEach((value, name) => {
    result.push({ name, value });
  });

  return result;
}

import { Request, Response } from "express";

const index = (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  const { page, size, start_time, end_time } = body;
  const num = page * size;
  const ret = [];
  for (let index = num; index < num + size; index++) {
    const temp: IDataColdLog = {
      key: "productID" + String(index),
      date: "date" + String(index),
      yield: "yield" + String(index),
      tapWaterConsumption: "tapWaterConsumption" + String(index),
      tapWaterEnergyConsumption: "tapWaterEnergyConsumption" + String(index),
      purifiedWaterDosage: "purifiedWaterDosage" + String(index),
      pureWaterEnergyConsumption: "pureWaterEnergyConsumption" + String(index),
      totalPowerConsumptionOfProcessEquipment:
        "totalPowerConsumptionOfProcessEquipment" + String(index),
      totalUnitConsumptionOfProcessEquipment:
        "totalUnitConsumptionOfProcessEquipment" + String(index),
      totalElectricityConsumptionOfPublicFacilities:
        "totalElectricityConsumptionOfPublicFacilities" + String(index),
      totalElectricityConsumptionofPublicEquipment:
        "totalElectricityConsumptionofPublicEquipment" + String(index),
    };
    ret.push(temp);
  }
  res.json({ data: ret, page: page, total: 100 });
};

export default {
  "POST /test/cold/log/index": index,
};

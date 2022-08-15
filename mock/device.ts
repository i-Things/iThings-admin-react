// import { Request, Response } from "express";

// const index = (req: Request, res: Response) => {
//   const body = req.body;
//   console.log(body);
//   const { page, size } = body;
//   const num = page * size;
//   const ret = [];
//   for (let index = num; index < num + size; index++) {
//     const temp: IDeviceMsg = {
//       productID: "productID" + String(index),
//       deviceName: "" + String(index),
//       createdTime: "createdTime" + String(index),
//       secret: "secret" + String(index),
//       firstLogin: "firstLogin" + String(index),
//       lastLogin: "lastLogin" + String(index),
//       version: "version" + String(index),
//       logLevel: index,
//       tags: [{ key: "key1", value: "value1" }],
//     };
//     ret.push(temp);
//   }
//   res.json({ data: ret, page: page, total: 100 });
// };

// export default {
//   "POST /api/v1/things/device/index": index,
// };

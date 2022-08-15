import React, { useEffect, useState } from "react";
import { postV1ThingsProductSchemaRead } from "@/services/fmcsapi/chanpinguanli";
import { Button, Card } from "antd";
import SchameModel from "./schamemodel";

interface SchamePropsType {
  productID: string;
}

interface Profile {
  ProductId: string;
  CategoryId: string;
}

interface Spec {
  id: string;
  name: string;
  dataType: DataType;
}

enum DataType {
  BOOL = "bool",
  INT = "int",
  STRING = "string",
  STRUCT = "struct",
  FLOAT = "float",
  TIMESTAMP = "timestamp",
  ARRAY = "array",
  ENUM = "enum",
}

interface Define {
  type: DataType;
  mapping?: Map<string, string>;
  min?: string;
  max?: string;
  start?: string;
  step?: string;
  unit?: string;
  specs?: Array<Spec>;
  arrayInfo?: Array<Define>;
}

interface Property {
  id: string;
  name: string;
  desc: string;
  mode: string;
  define: Define;
  required: boolean;
}

interface Param {
  id: string;
  name: string;
  define?: Define;
}

interface Action {
  id: string;
  name: string;
  desc: string;
  input: Array<Param>;
  output: Array<Param>;
  required: boolean;
}

interface Event {
  id: string;
  name: string;
  desc: string;
  type: string;
  params: Array<Param>;
  required: boolean;
}

interface Model {
  version: string;
  properties: Array<Property>;
  events: Array<Event>;
  actions: Array<Action>;
  profile: Profile;
}

const IndexPage: React.FC<SchamePropsType> = (props: SchamePropsType) => {
  const { productID } = props;

  const [visibel, setVisible] = useState(false);
  useEffect(async () => {
    await postV1ThingsProductSchemaRead({}, { productID: productID }).then(
      (res) => {
        console.log("ressss:", res);
        if (res.data.schema != undefined && res.data.schama != "") {
          let schema = JSON.parse(res?.data?.schema);
          console.log("schema:", schema);
        }
      }
    );
  }, []);

  return (
    <Card>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        自定义物模型
      </Button>

      <SchameModel
        type="add"
        onSubmit={async (values) => {
          console.log("add values:", values);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        modalVisible={visibel}
        values={{}}
      ></SchameModel>
    </Card>
  );
};

export default IndexPage;

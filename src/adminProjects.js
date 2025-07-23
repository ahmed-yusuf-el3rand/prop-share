import { useMemo } from "react";

import { properties } from "./propertiesData";
export default projects = useMemo(
  () =>
    properties.map((p) => ({
      ...p,
      buyers:
        p.id === "prop1"
          ? [
              { name: "John Doe", percentage: 10 },
              { name: "Jane Smith", percentage: 15 },
            ]
          : p.id === "prop2"
          ? [{ name: "Mike Ross", percentage: 5 }]
          : [],
    })),
  [properties]
);

const withdrawableBalance = 50000;

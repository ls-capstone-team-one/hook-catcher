import { useState } from "react";
import { NewBinCreator } from "./NewBinCreator";
import { CreateBinResultModal } from "./CreateBinResultModal";
import type { CreateBinResult } from "./CreateBinResultModal";
import { BinList } from "./BinList";
import {
  type Bin,
  BinApiResponseSchema,
  toBin,
} from "./schema";


const BASE_URL = "http://localhost:3000";
const CREATE_BIN_ENDPOINT = `${BASE_URL}/api/bins`;

export function Home() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [createResult, setCreateResult] = useState<CreateBinResult | null>(
    null
  );

  const onCreateBin = async () => {
    try {
      const response = await fetch(CREATE_BIN_ENDPOINT, { method: "POST" });
      if (!response.ok) {
        console.log(response);
        throw new Error("Create bin request failed");
      }

      const data = await response.json();
      console.log(data);
      const createBinResponse = BinApiResponseSchema.parse(data);
      const createdBin = toBin(createBinResponse);

      setBins((currentBins) => [...currentBins, createdBin]);
      setCreateResult({ status: "success", bin: createdBin });
    } catch {
      setCreateResult({ status: "error" });
    }
  };

  return (
    <>
      <NewBinCreator onCreateBin={onCreateBin} />
      <BinList bins={bins} />
      <CreateBinResultModal
        result={createResult}
        onClose={() => setCreateResult(null)}
      />
    </>
  );
}

export default Home;

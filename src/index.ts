import { createClient } from "@supabase/supabase-js";
import config from "../config/environment";

const supabase = createClient(config.BASE_URL, config.API_KEY);

const queryData = async () => {
  const request = await fetch(
    "http://192.168.1.182/cgi-bin/egauge-show?c&S&n=14400&C",
    { method: "GET" }
  );
  return request;
};

const saveDataInStorage = async (HTTPPayload: Response) => {
  try {
    const upload = await supabase.storage
      .from("egauge-data")
      .upload(
        `data/${new Date().toISOString()}.csv`,
        await HTTPPayload.arrayBuffer()
      );
    console.log(upload);
  } catch (error) {
    console.log(error);
  }
};

const main = async () => {
  const payload = await queryData();
  saveDataInStorage(payload);
};

main();

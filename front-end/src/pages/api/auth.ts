import type { NextApiRequest, NextApiResponse } from "next";

import baseUrl from "../../config/baseUrl";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const {
      query: { name, keyword },
      method,
    } = req;

    fetch(`${baseUrl}/auth`).then((res) => res.json());
  } else {
    res.status(404).json({ name: "Erro" });
  }
}

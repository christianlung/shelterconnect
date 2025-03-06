import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { donorName, finalDonorAmount } = req.body

    try {
      const newDonor = await prisma.donor.create({
        data: {
          donorName,
          finalDonorAmount,
        },
      })
      res.status(200).json(newDonor)
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" })
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" })
  }
}

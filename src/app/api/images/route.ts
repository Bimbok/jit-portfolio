import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const bimbokPath = path.join(process.cwd(), "public", "bimbok");

  try {
    if (!fs.existsSync(bimbokPath)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(bimbokPath);
    const images = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    );

    return NextResponse.json(images.map((img) => `/bimbok/${img}`));
  } catch (error) {
    console.error("Error reading bimbok directory:", error);
    return NextResponse.json({ error: "Failed to load images" }, { status: 500 });
  }
}

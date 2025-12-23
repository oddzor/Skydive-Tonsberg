import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "cms", "content.json");
    const content = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error("Error reading CMS content:", error);
    return NextResponse.json(
      { error: "Failed to read content" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    // In a production system, you'd validate the token against a store
    // For now, we just check it exists and has the right format
    const token = authHeader.replace("Bearer ", "");
    if (token.length !== 64) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    const newContent = await request.json();
    const filePath = path.join(process.cwd(), "public", "cms", "content.json");
    await fs.writeFile(filePath, JSON.stringify(newContent, null, 2), "utf-8");
    return NextResponse.json({ success: true, message: "Content updated successfully" });
  } catch (error) {
    console.error("Error updating CMS content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}



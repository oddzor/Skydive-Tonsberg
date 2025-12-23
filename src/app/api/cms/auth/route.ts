import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Generate monthly rotating password
function generateMonthlyPassword(): string {
  const secret = process.env.CMS_SECRET || "default-secret-change-me";
  const now = new Date();
  const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
  // Create hash of secret + month/year
  const hash = crypto
    .createHash('sha256')
    .update(`${secret}-${monthYear}`)
    .digest('hex');
  
  // Take first 12 characters and format nicely
  return hash.substring(0, 12).toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = generateMonthlyPassword();

    if (password === correctPassword) {
      // Generate a secure token
      const token = crypto.randomBytes(32).toString('hex');
      
      return NextResponse.json({ 
        success: true, 
        token: token 
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error authenticating:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// Endpoint to get current password (only in development)
export async function GET() {
  if (process.env.NODE_ENV !== 'production') {
    const password = generateMonthlyPassword();
    return NextResponse.json({ 
      password,
      note: "This endpoint only works in development mode"
    });
  }
  
  return NextResponse.json(
    { error: "Not available in production" },
    { status: 403 }
  );
}



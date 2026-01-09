import { NextResponse } from "next/server";
import { getPrimes } from "@/lib/content";

export async function GET() {
  try {
    const primes = getPrimes();
    return NextResponse.json({ primes });
  } catch (error) {
    console.error("Error fetching primes:", error);
    return NextResponse.json({ primes: [] }, { status: 500 });
  }
}

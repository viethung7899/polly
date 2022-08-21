import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import {nanoid} from 'nanoid'
// Set the cookie
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log("Cookies: ", req.cookies);
  if (req.cookies.get("pollToken")) return;
  const random = nanoid();

  const res = NextResponse.next();
  res.cookies.set("pollToken", random, {
    sameSite: "strict"
  })

  return res
}
import { NextRequest, NextResponse } from "next/server";

const FASTAPI_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";
const TENANT_DB_NAME = process.env.TENANT_DB_NAME;

async function proxyToFastAPI(req: NextRequest, context: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await context.params;
  const path = slug.join("/");
  const searchParams = req.nextUrl.searchParams.toString();
  const url = `${FASTAPI_URL}/cms/${path}${searchParams ? `?${searchParams}` : ""}`;
  
  const headers = new Headers();
  
  // Forward relevant headers
  const headersToForward = ["authorization", "cookie", "content-type", "x-tenant-db"];
  headersToForward.forEach(headerName => {
    const value = req.headers.get(headerName);
    if (value) {
      headers.set(headerName, value);
    }
  });

  // Fallback to .env if x-tenant-db not already set by frontend
  if (TENANT_DB_NAME && !headers.has("x-tenant-db")) {
    headers.set("x-tenant-db", TENANT_DB_NAME);
  }

  const options: RequestInit = {
    method: req.method,
    headers: headers,
  };

  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    try {
      const contentType = req.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const body = await req.json();
        options.body = JSON.stringify(body);
      } else {
        // Handle other content types if necessary (e.g., formData)
        options.body = await req.blob();
      }
    } catch (e) {
      // No body or error parsing
    }
  }

  try {
    console.log(`Proxying ${req.method} request to FastAPI: ${url}`);
    const response = await fetch(url, options);
    
    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text();
      return new NextResponse(text, { 
        status: response.status,
        headers: { "Content-Type": contentType || "text/plain" }
      });
    }
  } catch (error) {
    console.error(`Error proxying to FastAPI (${url}):`, error);
    return NextResponse.json({ success: false, error: "Failed to connect to backend service" }, { status: 500 });
  }
}

export const GET = proxyToFastAPI;
export const POST = proxyToFastAPI;
export const PUT = proxyToFastAPI;
export const DELETE = proxyToFastAPI;

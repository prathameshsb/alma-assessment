import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/leads.json");

export async function GET() {
  try {
    const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : "[]";
    const leads = JSON.parse(fileData);
    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : "[]";
    const leads = JSON.parse(fileData);
    leads.push({ ...formData, status: "PENDING" });

    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));
    return NextResponse.json({ message: "Lead submitted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { index, status } = await req.json();
    const fileData = fs.readFileSync(filePath, "utf-8");
    const leads = JSON.parse(fileData);

    if (leads[index]) {
      leads[index].status = status;
      fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));
      return NextResponse.json({ message: "Lead status updated" }, { status: 200 });
    }

    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

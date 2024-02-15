import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData()
    const title = formData.get('title')
    const teamMembers = formData.get('teamMembers') 

  // Log title and team members
  // ...

  // Log abstract file
    const abstract = formData.get("abstract");
    if (abstract) {
    console.log("Abstract:", abstract);
    }

    // Log research papers
    const files = formData.get("researchPapers");
    if (files) {
    console.log("Research papers:", files);
    }
    if(title && teamMembers && files && abstract ) {
        
    return new NextResponse('Success!', {
        status: 200,})
    }
    else {
        return new NextResponse('Error on API!', {
            status: 400,})
    }
  }
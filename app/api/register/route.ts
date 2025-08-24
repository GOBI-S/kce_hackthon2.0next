import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/DBconnect";
import Registration from "@/models/Registration";
import nodemailer from "nodemailer";

// Create transporter (use environment variables)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true if 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
interface RegistrationBody {
  teamName: string;
  teamSize: number;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  college?: string;
  experience: string;
  techStack: string;
  projectTopic: string;
  projectIdea: string;
  agreeTerms: boolean;
  memberNames: string[];
  transactionId: string;
  paymentAmount: number;
}


// Handle POST request
export async function POST(req:Request) {
  try {
    await dbConnect();

    const body = (await req.json()) as RegistrationBody;
    const {
      teamName,
      teamSize,
      leaderName,
      leaderEmail,
      leaderPhone,
      college, // added
      experience,
      techStack,
      projectTopic,
      projectIdea,
      agreeTerms,
      memberNames, // updated
      transactionId,
      paymentAmount,
    } = body;
    // Basic required fields validation
    if (
      !teamName ||
      !leaderName ||
      !leaderEmail ||
      !leaderPhone ||
      !teamSize ||
      !Array.isArray(memberNames) ||
      !experience ||
      !techStack ||
      !projectTopic ||
      !projectIdea ||
      !agreeTerms ||
      !transactionId ||
      !paymentAmount
    ) {
      return NextResponse.json(
        { message: "Please fill all required fields correctly." },
        { status: 400 }
      );
    }

    // Normalize and validate phone, email, names
    const leaderEmailNorm = leaderEmail.trim().toLowerCase();
    const teamNameNorm = teamName.trim();
    const leaderPhoneNorm = leaderPhone.trim();

    if (!/^\d{10}$/.test(leaderPhoneNorm)) {
      return NextResponse.json(
        { message: "Leader phone number must be exactly 10 digits." },
        { status: 400 }
      );
    }

    const trimmedMembers = memberNames.map((m: string) => m.trim());

    // Prepare data to save
    const newRegistration = new Registration({
      teamName: teamNameNorm,
      teamSize: Number(teamSize),
      leaderName: leaderName.trim(),
      leaderEmail: leaderEmailNorm,
      leaderPhone: leaderPhoneNorm,
      college: college || "Kathir college of Engineering", // default if frontend omits
      experience,
      techStack,
      projectTopic,
      projectIdea,
      agreeTerms,
      memberNames: trimmedMembers,
      transactionId: transactionId.trim(),
      paymentAmount: Number(paymentAmount),
    });
    console.log(body)
    await newRegistration.save();

      // Send registration email
    const mailOptions = {
      from: `"Caesar-Cipher 2025" <${process.env.SMTP_USER}>`,
      to: leaderEmailNorm,
      subject: "Registration Successful - Caesar Cipher 2025",
      html: `
        <h2>Hi ${leaderName},</h2>
        <p>Your team <strong>${teamName}</strong> has been successfully registered for Caesar Cipher 2025!</p>
        <p><strong>Team Members:</strong> ${trimmedMembers.join(", ")}</p>
        <p><strong>Project Topic:</strong> ${projectTopic}</p>
        <p><strong>Problem Statement:</strong> ${projectIdea}</p>
        <p>Thank you for registering. See you at the event!</p>
        <p>– Caesar Cipher 2025 Team</p>
      `,
    };
    

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Registration successful!" },
      { status: 200 }
    );
  } catch (error) {
    
    console.error("Error saving registration:", error);
    return NextResponse.json(
      {
        message:
          "Server error, please try again later or contact event chairs.",
      },
      { status: 500 }
    );
  }
}

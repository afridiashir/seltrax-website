import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from 'resend';
import { EmailTemplate } from "@/components/emails/waitingList";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    const body = await request.json();
    const { email } = body;

    try {
        const checkUser = await prisma.user.findUnique({
            where: {
                email
            },
        });

        if (checkUser) {
            return NextResponse.json({ message: `You are #${checkUser.id} in line! Refer people to move up.` }, { status: 200 });
        }
        const user = await prisma.user.create({
            data: {
                email
            },
        });
        const { data, error } = await resend.emails.send({
            from: 'Seltrax <hello@seltrax.com>',
            to: [email],
            subject: "You're on the waitlist! - Seltrax",
            react: EmailTemplate({ name: "there" }),
        });

        if (error) {
            return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
        }




        return NextResponse.json({ message: `You are #${user.id} in line! Refer people to move up.` }, { status: 201 });
    } catch (error) {
        console.error("Error adding user to waitlist:", error);
        return NextResponse.json({ error: "Failed to add user to waitlist" }, { status: 500 });
    }
}


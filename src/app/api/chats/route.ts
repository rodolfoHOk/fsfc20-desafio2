import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prismaService } from '@/service/prisma-service';

export async function GET() {
  try {
    const chats = await prismaService.chat.findMany();
    return NextResponse.json(chats);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { errorMessage: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const createChatSchema = z.object({
    message: z.string().nonempty(),
  });
  const validateChat = createChatSchema.safeParse(body);
  if (!validateChat.success) {
    const errorMessages = validateChat.error.errors.map(
      (error) => `${error.path}: ${error.message}`
    );
    return NextResponse.json({ errorMessages }, { status: 400 });
  }

  try {
    const result = await prismaService.chat.create({
      data: {
        message: validateChat.data.message,
      },
    });
    return NextResponse.json(result, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ errorMessage: error }, { status: 500 });
  }
}

import { AccessToken } from 'livekit-server-sdk';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identity } = body;

    if (!identity) {
      return Response.json(
        { error: 'identity is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

    if (!apiKey || !apiSecret || !wsUrl) {
      console.error('Missing LiveKit credentials');
      return Response.json(
        { error: 'LiveKit not configured' },
        { status: 500 }
      );
    }

    const roomName = 'Sage-1242';

    const at = new AccessToken(apiKey, apiSecret, {
      identity: identity,
      ttl: 3600,
    });

    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const token = await at.toJwt();

    return Response.json({
      token,
      url: wsUrl,
      roomName,
    });
  } catch (error) {
    console.error('Token generation error:', error);
    return Response.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}

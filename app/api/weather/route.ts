export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');

    if (!location) {
        return NextResponse.json(
            { message: 'Location parameter is required' },
            { status: 400 }
        );
    }

    try {
        const apiKey = process.env.VISUAL_CROSSING_API_KEY;
        if (!apiKey) {
            throw new Error('API key not configured');
        }

        const apiUrl = new URL(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}`);
        apiUrl.searchParams.set('unitGroup', 'us');
        apiUrl.searchParams.set('key', apiKey);
        apiUrl.searchParams.set('contentType', 'json');
        apiUrl.searchParams.set('include', 'current');

        const response = await fetch(apiUrl.toString());

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            return NextResponse.json(
                { message: errorData.message || 'Weather API request failed' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json(
            {
                message: 'Internal server error',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const searchInput = searchParams.get('city');

    if(!searchInput) {
        return NextResponse.json({ error: 'City parameter is required'}, { status: 400});
    }

    const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(`${baseURL}/weather?q=${searchInput},uk&appid=${apiKey}&units=metric`),
            fetch(`${baseURL}/forecast?q=${searchInput},uk&appid=${apiKey}&units=metric`)
        ]);

        if(!currentRes.ok || !forecastRes.ok) {
            return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500});
        }

        const current = await currentRes.json();
        const forecast = await forecastRes.json();

        return NextResponse.json({ current, forecast });
    }
    catch (err) {
        return NextResponse.json({ error: 'Unexpected server error'}, { status: 500 });
    }
};
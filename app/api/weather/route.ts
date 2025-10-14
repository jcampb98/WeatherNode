import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const cityInput = searchParams.get('city');
    const zipInput = searchParams.get('zip');

    if(!cityInput && !zipInput) {
        return NextResponse.json({ error: 'City/Postcode parameter is required'}, { status: 400});
    }

    const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
    const baseURL = 'https://api.openweathermap.org/data/2.5/';

    let queryParam: string;

    if(zipInput) {
        queryParam = `zip=${encodeURIComponent(zipInput)},gb`; 
    }
    else {
        queryParam = `q=${encodeURIComponent(cityInput!)},uk`;
    }

    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(`${baseURL}/weather?${queryParam}&appid=${apiKey}&units=metric&mode=json`),
            fetch(`${baseURL}/forecast?${queryParam}&appid=${apiKey}&units=metric&mode=json`)
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
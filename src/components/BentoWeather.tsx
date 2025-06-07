import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Cloud, Sun, CloudRain, CloudSnow, MoveUpRight } from "lucide-react";

export default function BentoWeather() {
    const [weatherData, setWeatherData] = useState<WttrResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch("https://wttr.in/Malaga?format=j2");
                const data = await res.json();
                setWeatherData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching weather:', error);
                setIsLoading(false);
            }
        };
        fetchWeather();
    }, []);

    const getWeatherIcon = (description: string) => {
        const desc = description.toLowerCase();
        if (desc.includes('rain') || desc.includes('drizzle')) return CloudRain;
        if (desc.includes('snow')) return CloudSnow;
        if (desc.includes('cloud') || desc.includes('overcast')) return Cloud;
        return Sun;
    };

    if (isLoading) {
        return (
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_20%_80%,_theme(colors.primary)_0%,_transparent_50%)]"></div>
                </div>
                
                {/* Weather Icon */}
                <div className="absolute right-3 top-3 z-10">
                    <Cloud size={24} className="text-primary" />
                </div>

                <div className="relative z-10 flex h-full flex-col p-4">
                    {/* Header Skeleton */}
                    <div className="mb-4 flex items-center gap-2">
                        <Skeleton className="h-2 w-2 rounded-full" />
                        <Skeleton className="h-3 w-24" />
                    </div>

                    {/* Weather Info Skeleton */}
                    <div className="flex flex-1 gap-3 items-center">
                        <Skeleton className="h-16 w-16 rounded-lg flex-shrink-0" />
                        
                        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
                            <Skeleton className="h-4 w-2/12" />
                            <Skeleton className="h-3 w-4/12" />
                            <Skeleton className="h-3 w-1/3" />
                        </div>
                    </div>

                    {/* Footer Skeleton */}
                    <div className="mt-4 flex items-center justify-between">
                        <Skeleton className="h-1 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (!weatherData) return <p>Something absolutely horrible has gone wrong</p>;

    const current = weatherData.current_condition[0];
    const location = weatherData.nearest_area[0];
    const WeatherIcon = getWeatherIcon(current.weatherDesc[0].value);

    return (
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full bg-[radial-gradient(circle_at_20%_80%,_theme(colors.primary)_0%,_transparent_50%)]"></div>
            </div>
            
            {/* Weather Icon */}
            <div className="absolute right-3 top-3 z-10">
                <WeatherIcon size={24} className="text-primary" />
            </div>

            <div className="relative z-10 flex h-full flex-col p-4">
                {/* Header */}
                <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-xs font-medium text-muted-foreground">
                        CURRENT WEATHER
                    </span>
                </div>

                {/* Weather Info */}
                <div className="flex flex-1 gap-3 items-center">
                    <div className="relative flex-shrink-0">
                        <div className="h-16 w-16 rounded-lg border shadow-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                            <WeatherIcon size={32} className="text-primary" />
                        </div>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <h3 className="mb-1 truncate text-sm font-bold leading-tight">
                            {current.temp_C}°C
                        </h3>
                        <p className="truncate text-xs text-muted-foreground">
                            {current.weatherDesc[0].value}
                        </p>
                        <p className="truncate text-xs text-muted-foreground/70">
                            {location.areaName[0].value}, {location.country[0].value}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <div className="h-1 w-8 rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary"></div>
                        </div>
                    </div>
                    
                    <a
                        href={`https://wttr.in/${location.areaName[0].value}`}
                        aria-label="View detailed weather"
                        title="View detailed weather"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground hover:scale-110"
                    >
                        <MoveUpRight size={14} />
                    </a>
                </div>
            </div>
        </div>
    );
}

// Types generated with AI.
interface WttrResponse {
  current_condition: {
    FeelsLikeC: string;
    FeelsLikeF: string;
    cloudcover: string;
    humidity: string;
    localObsDateTime: string;
    observation_time: string;
    precipInches: string;
    precipMM: string;
    pressure: string;
    pressureInches: string;
    temp_C: string;
    temp_F: string;
    uvIndex: string;
    visibility: string;
    visibilityMiles: string;
    weatherCode: string;
    weatherDesc: Array<{ value: string }>;
    weatherIconUrl: Array<{ value: string }>;
    winddir16Point: string;
    winddirDegree: string;
    windspeedKmph: string;
    windspeedMiles: string;
  }[];
  nearest_area: Array<{
    areaName: Array<{ value: string }>;
    country: Array<{ value: string }>;
    latitude: string;
    longitude: string;
    population: string;
    region: Array<{ value: string }>;
    weatherUrl: Array<{ value: string }>;
  }>;
  request: Array<{
    query: string;
    type: string;
  }>;
  weather: Array<{
    astronomy: Array<{
      moon_illumination: string;
      moon_phase: string;
      moonrise: string;
      moonset: string;
      sunrise: string;
      sunset: string;
    }>;
    avgtempC: string;
    avgtempF: string;
    date: string;
    hourly: Array<{
      DewPointC: string;
      DewPointF: string;
      FeelsLikeC: string;
      FeelsLikeF: string;
      HeatIndexC: string;
      HeatIndexF: string;
      WindChillC: string;
      WindChillF: string;
      WindGustKmph: string;
      WindGustMiles: string;
      cloudcover: string;
      humidity: string;
      precipInches: string;
      precipMM: string;
      pressure: string;
      pressureInches: string;
      tempC: string;
      tempF: string;
      time: string;
      uvIndex: string;
      visibility: string;
      visibilityMiles: string;
      weatherCode: string;
      weatherDesc: Array<{ value: string }>;
      weatherIconUrl: Array<{ value: string }>;
      winddir16Point: string;
      winddirDegree: string;
      windspeedKmph: string;
      windspeedMiles: string;
    }>;
    maxtempC: string;
    maxtempF: string;
    mintempC: string;
    mintempF: string;
    sunHour: string;
    totalSnow_cm: string;
    uvIndex: string;
  }>;
}
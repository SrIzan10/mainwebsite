import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react'

export default function BentoWeather() {
  const [weatherData, setWeatherData] = useState<WttrResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://wttr.in/Malaga?format=j2')
        const data = await res.json()
        setWeatherData(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching weather:', error)
        setIsLoading(false)
      }
    }
    fetchWeather()
  }, [])

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase()
    if (desc.includes('rain') || desc.includes('drizzle')) return CloudRain
    if (desc.includes('snow')) return CloudSnow
    if (desc.includes('cloud') || desc.includes('overcast')) return Cloud
    return Sun
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col justify-between rounded-lg p-4">
        <Skeleton className="h-3 w-24" />
        <div className="flex items-end gap-2">
          <Skeleton className="h-9 w-20" />
        </div>
        <Skeleton className="h-3 w-32" />
      </div>
    )
  }

  if (!weatherData)
    return <p className="text-muted-foreground p-4 text-sm">Unavailable</p>

  const current = weatherData.current_condition[0]
  const location = weatherData.nearest_area[0]
  const WeatherIcon = getWeatherIcon(current.weatherDesc[0].value)
  const cityName = location.areaName[0].value

  return (
    <a
      href={`https://wttr.in/${cityName}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group hover:bg-accent/40 flex h-full w-full flex-col justify-between rounded-lg p-4 transition-colors duration-200"
    >
      {/* Label */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {cityName}
        </span>
        <WeatherIcon
          size={16}
          className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
        />
      </div>

      {/* Temperature — big and dominant */}
      <p className="text-4xl leading-none font-bold tabular-nums">
        {current.temp_C}°
      </p>

      {/* Description */}
      <p className="text-muted-foreground truncate text-xs">
        {current.weatherDesc[0].value}
      </p>
    </a>
  )
}

// Types generated with AI.
interface WttrResponse {
  current_condition: {
    FeelsLikeC: string
    FeelsLikeF: string
    cloudcover: string
    humidity: string
    localObsDateTime: string
    observation_time: string
    precipInches: string
    precipMM: string
    pressure: string
    pressureInches: string
    temp_C: string
    temp_F: string
    uvIndex: string
    visibility: string
    visibilityMiles: string
    weatherCode: string
    weatherDesc: Array<{ value: string }>
    weatherIconUrl: Array<{ value: string }>
    winddir16Point: string
    winddirDegree: string
    windspeedKmph: string
    windspeedMiles: string
  }[]
  nearest_area: Array<{
    areaName: Array<{ value: string }>
    country: Array<{ value: string }>
    latitude: string
    longitude: string
    population: string
    region: Array<{ value: string }>
    weatherUrl: Array<{ value: string }>
  }>
  request: Array<{
    query: string
    type: string
  }>
  weather: Array<{
    astronomy: Array<{
      moon_illumination: string
      moon_phase: string
      moonrise: string
      moonset: string
      sunrise: string
      sunset: string
    }>
    avgtempC: string
    avgtempF: string
    date: string
    hourly: Array<{
      DewPointC: string
      DewPointF: string
      FeelsLikeC: string
      FeelsLikeF: string
      HeatIndexC: string
      HeatIndexF: string
      WindChillC: string
      WindChillF: string
      WindGustKmph: string
      WindGustMiles: string
      cloudcover: string
      humidity: string
      precipInches: string
      precipMM: string
      pressure: string
      pressureInches: string
      tempC: string
      tempF: string
      time: string
      uvIndex: string
      visibility: string
      visibilityMiles: string
      weatherCode: string
      weatherDesc: Array<{ value: string }>
      weatherIconUrl: Array<{ value: string }>
      winddir16Point: string
      winddirDegree: string
      windspeedKmph: string
      windspeedMiles: string
    }>
    maxtempC: string
    maxtempF: string
    mintempC: string
    mintempF: string
    sunHour: string
    totalSnow_cm: string
    uvIndex: string
  }>
}

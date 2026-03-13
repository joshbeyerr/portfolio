export type WeatherConditionKey =
  | "clear"
  | "partly-cloudy"
  | "cloudy"
  | "fog"
  | "rain"
  | "snow"
  | "storm";

export type WorkWeatherSnapshot = {
  location: string;
  temperatureC: number | null;
  condition: string;
  conditionKey: WeatherConditionKey;
  isDay: boolean;
  highC: number | null;
  lowC: number | null;
  fetchedAt: string;
};

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
    is_day?: number;
  };
  daily?: {
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
  };
};

const TORONTO_LABEL = "Toronto";
const TORONTO_COORDINATES = {
  latitude: 43.6532,
  longitude: -79.3832,
};

export function getConditionKeyFromWeatherCode(code: number): WeatherConditionKey {
  if (code === 0) {
    return "clear";
  }

  if (code === 1 || code === 2) {
    return "partly-cloudy";
  }

  if (code === 3) {
    return "cloudy";
  }

  if (code === 45 || code === 48) {
    return "fog";
  }

  if (
    code === 51 ||
    code === 53 ||
    code === 55 ||
    code === 56 ||
    code === 57 ||
    code === 61 ||
    code === 63 ||
    code === 65 ||
    code === 66 ||
    code === 67 ||
    code === 80 ||
    code === 81 ||
    code === 82
  ) {
    return "rain";
  }

  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) {
    return "snow";
  }

  if (code === 95 || code === 96 || code === 99) {
    return "storm";
  }

  return "cloudy";
}

export function getConditionLabel(
  conditionKey: WeatherConditionKey,
  isDay: boolean,
): string {
  switch (conditionKey) {
    case "clear":
      return isDay ? "Clear skies" : "Clear tonight";
    case "partly-cloudy":
      return isDay ? "Partly cloudy" : "Clouds drifting in";
    case "cloudy":
      return "Overcast";
    case "fog":
      return "Fog over the city";
    case "rain":
      return "Rain moving through";
    case "snow":
      return "Snow over Toronto";
    case "storm":
      return "Storm watch";
    default:
      return "Current conditions";
  }
}

export async function fetchTorontoWeather(): Promise<WorkWeatherSnapshot> {
  const endpoint = new URL("https://api.open-meteo.com/v1/forecast");
  endpoint.searchParams.set("latitude", String(TORONTO_COORDINATES.latitude));
  endpoint.searchParams.set("longitude", String(TORONTO_COORDINATES.longitude));
  endpoint.searchParams.set("current", "temperature_2m,weather_code,is_day");
  endpoint.searchParams.set("daily", "temperature_2m_max,temperature_2m_min");
  endpoint.searchParams.set("forecast_days", "1");
  endpoint.searchParams.set("timezone", "America/Toronto");

  const response = await fetch(endpoint, {
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error("Unable to load weather data.");
  }

  const payload = (await response.json()) as OpenMeteoResponse;
  const temperature = payload.current?.temperature_2m;
  const weatherCode = payload.current?.weather_code;
  const isDay = Boolean(payload.current?.is_day);
  const high = payload.daily?.temperature_2m_max?.[0];
  const low = payload.daily?.temperature_2m_min?.[0];

  if (typeof temperature !== "number" || typeof weatherCode !== "number") {
    throw new Error("Weather payload missing current conditions.");
  }

  const conditionKey = getConditionKeyFromWeatherCode(weatherCode);

  return {
    location: TORONTO_LABEL,
    temperatureC: Math.round(temperature),
    condition: getConditionLabel(conditionKey, isDay),
    conditionKey,
    isDay,
    highC: typeof high === "number" ? Math.round(high) : null,
    lowC: typeof low === "number" ? Math.round(low) : null,
    fetchedAt: new Date().toISOString(),
  };
}

import type { LoaderFunctionArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getWeatherData } from "~/weather-service.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const env = context.cloudflare.env;
  const { latitude, longitude } = context.cloudflare.cf;
  return await getWeatherData({
    latitude,
    longitude,
    apiKey: env.API_KEY,
    environment: env.ENVIRONMENT,
  });
};

export default function Index() {
  const { weatherData } = useLoaderData<typeof loader>();
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.8",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ color: "#333", fontSize: "2.5em", textAlign: "center" }}>
        Welcome to Remix (with Vite and Cloudflare)
      </h1>
      <h2
        style={{
          color: "#666",
          fontSize: "1.8em",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        Nice to see you from {weatherData.name}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#333", fontSize: "1.5em" }}>Temperature</h3>
          <p style={{ color: "#666", fontSize: "1.2em" }}>
            {weatherData.main.temp}°C
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#333", fontSize: "1.5em" }}>Feels like</h3>
          <p style={{ color: "#666", fontSize: "1.2em" }}>
            {weatherData.main.feels_like}°C
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#333", fontSize: "1.5em" }}>Humidity</h3>
          <p style={{ color: "#666", fontSize: "1.2em" }}>
            {weatherData.main.humidity}%
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "#333", fontSize: "1.5em" }}>Wind Speed</h3>
          <p style={{ color: "#666", fontSize: "1.2em" }}>
            {weatherData.wind.speed}m/s
          </p>
        </div>
      </div>
    </div>
  );
}

export interface CurrentConditions {
    temp: number;
    feelslike: number;
    humidity: number;
    conditions: string;
    windspeed: number;
    uvindex: number;
}

export interface WeatherData {
    resolvedAddress: string;
    currentConditions: CurrentConditions;
}
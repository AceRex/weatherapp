type result = {
    name: string;
    weather: [{ id: number; main: string; description: string }];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      grnd_level: number;
    };
    sys: {
      country: string;
    };
  };

export type Rootstate = {
  slice: {
    location: string;
    result: result;
    error: string;
    status: string;
  };
};

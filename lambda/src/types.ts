type OfficeHour = {
  weekday: string;
  start: {
    hour: number;
    minute: number;
  };
  end: {
    hour: number;
    minute: number;
  };
  duration: number;
};

type CreateEventInput = {
  start: string;
  end: string;
  summary: string;
  description: string;
};

export { OfficeHour, CreateEventInput };

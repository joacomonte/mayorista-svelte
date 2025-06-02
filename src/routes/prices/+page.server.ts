export const config = {
  isr: {
    expiration: 60,
  },
};

interface GoogleSheetsResponse {
  values: any[];
  range: string;
  majorDimension: string;
}

interface PageData {
  data: any[];
}

export const load = async (): Promise<PageData> => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/1yCcKdMlr-UrBRNC0TQVhFY68ROe7SsMtOOEhfiZdHrM/values/'Hoja%201'?key=AIzaSyD896qSVu6moxcIbjp77cfnDDLA2r4hlFA`;
  const res = await fetch(url);
  const data: GoogleSheetsResponse = await res.json();
  return {data: data.values}
};

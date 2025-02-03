export const config = {
  isr: {
    expiration: 60,
  },
};

export async function Load({}) {

  const url = `https://sheets.googleapis.com/v4/spreadsheets/1yCcKdMlr-UrBRNC0TQVhFY68ROe7SsMtOOEhfiZdHrM/values/'Hoja%201'?key=AIzaSyD896qSVu6moxcIbjp77cfnDDLA2r4hlFA`;
  const res = await fetch(url)
  const data = await res.json();
  console.log(data);
  return data
  
}


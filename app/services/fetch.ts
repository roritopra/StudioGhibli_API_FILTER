export async function getData(){
  try {
    const data = await fetch('https://ghibliapi.herokuapp.com/films').then(res => res.json());
    return data;
  } catch (e) {
    console.log(e);
  }
}

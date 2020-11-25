async function fetchData() {
  try {
    let response = await fetch();
    let data = await response.json();
  } catch (error) {
    console.log('ErRRROR bject');
  }
}

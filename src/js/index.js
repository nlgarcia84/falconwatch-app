import '../css/styles.css';

const launchyearElement = document.getElementById('launch-year');
const searchButtonElement = document.getElementById('search_button');
const infoLaunchContainerElement = document.getElementById(
  'info_launch_container'
);

const getLaunch = async () => {
  try {
    infoLaunchContainerElement.textContent = '';
    const yearSelected = launchyearElement.value;
    const res = await fetch('https://api.spacexdata.com/v4/launches');
    const data = await res.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.dir(data);
    data.forEach((launch) => {
      if (launch.date_utc.slice(0, 4) === yearSelected) {
        const missionName = document.createElement('div');
        const missionDate = document.createElement('div');
        const missionPatch = document.createElement('img');
        infoLaunchContainerElement.appendChild(missionName);
        infoLaunchContainerElement.appendChild(missionDate);
        infoLaunchContainerElement.appendChild(missionPatch);
        missionName.textContent = `Mission Name: ${launch.name}`;
        missionDate.textContent = `Date: ${launch.date_utc}`;
        missionPatch.src = launch.links.patch.small;
      }
    });
  } catch (error) {
    console.log('Error');
  }
};
searchButtonElement.addEventListener('touchstart', getLaunch);
searchButtonElement.addEventListener('click', getLaunch);

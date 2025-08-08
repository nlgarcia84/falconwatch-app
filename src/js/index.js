import '../css/styles.css';

const launchyearElement = document.getElementById('launch-year');
const searchButtonElement = document.getElementById('search_button');
const infoLaunchContainerElement = document.getElementById(
  'info_launch_container'
);

const getLaunch = async (event) => {
  const yearSelected = launchyearElement.value;
  try {
    event.preventDefault();
    const res = await fetch('https://api.spacexdata.com/v3/launches');
    const data = await res.json();
    data.forEach((launch) => {
      if (launch.launch_year === yearSelected) {
        const missionName = document.createElement('div');
        infoLaunchContainerElement.appendChild(missionName);
        missionName.textContent = `Mission Name: ${launch.mission_name}`;
      }
    });
  } catch (error) {
    console.log('Error');
  }
};

searchButtonElement.addEventListener('click', getLaunch);

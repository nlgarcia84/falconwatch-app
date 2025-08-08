import '../css/styles.css';

const launchyearElement = document.getElementById('launch-year');
const searchButtonElement = document.getElementById('search_button');
const infoLaunchContainerElement = document.getElementById(
  'info_launch_container'
);

const getLaunch = async () => {
  try {
    const yearSelected = launchyearElement.value;
    infoLaunchContainerElement.textContent = '';
    const res = await fetch(
      'https://falconwatch-app-ryu7/api.spacexdata.com/v3/launches'
    );
    const data = await res.json();
    data.forEach((launch) => {
      if (launch.launch_year === yearSelected) {
        const missionName = document.createElement('div');
        const missionDate = document.createElement('div');
        const missionPatch = document.createElement('img');
        infoLaunchContainerElement.appendChild(missionName);
        infoLaunchContainerElement.appendChild(missionDate);
        infoLaunchContainerElement.appendChild(missionPatch);
        missionName.textContent = `Mission Name: ${launch.mission_name}`;
        missionDate.textContent = `Date: ${launch.launch_date_utc}`;
        missionPatch.src = launch.links.mission_patch_small;
      }
    });
  } catch (error) {
    console.log('Error');
  }
};
searchButtonElement.addEventListener('click', getLaunch);

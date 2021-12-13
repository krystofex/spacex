import Button from '@components/UI/Button';
import Link from 'next/link';
import { Launch } from 'types/generated';
import LaunchTableRow from './Row';

const LaunchTable: React.FC<{ launch: Launch }> = ({ launch }) => {
  const plannedLaunch = new Date(launch.launch_date_utc).toLocaleDateString(
    'en-UK',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
  );

  const actualLaunch = launch.static_fire_date_utc // if date is null return unknown
    ? new Date(launch.static_fire_date_utc).toLocaleDateString('en-UK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    : 'unknown';

  return (
    <>
      <div className="flex flex-col text-white font-medium divide-y divide-gray-500 max-w-md w-full ">
        <LaunchTableRow
          title="Rocket"
          value={launch.rocket?.rocket_name ?? 'unknown'}
        />

        <LaunchTableRow
          title="Mission"
          value={launch.mission_name ?? 'unknown'}
        />

        <LaunchTableRow
          title={
            // if launch is in past, return planned, bcs we don't have launch date yet
            new Date(launch.launch_date_utc) < new Date()
              ? 'planned launch date'
              : 'launch date'
          }
          value={plannedLaunch}
        />

        {plannedLaunch !== actualLaunch && ( // show actual launch date only if it differs from planned
          <LaunchTableRow title="launch date" value={actualLaunch} />
        )}

        <div>
          <div className="py-3 text-xs font-bold text-white">DESCRIPTION</div>
          <p className="font-normal text-xs ">{launch.details}</p>
        </div>
      </div>
      <span className="mt-12 w-full max-w-md flex justify-center">
        <Link href={`/launches/${launch.id}`} passHref>
          <a>
            <Button>SHOW DETAIL</Button>
          </a>
        </Link>
      </span>
    </>
  );
};

export default LaunchTable;

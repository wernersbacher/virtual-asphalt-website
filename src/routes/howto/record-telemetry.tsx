import { createFileRoute } from '@tanstack/react-router';

import { InfoBlock } from '../../components/InfoBlock';

export default function HowToRecordTelemetry() {
  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-center drop-shadow-lg">
        <span className="text-blue-700 dark:text-blue-400">HowTo:</span> Record
        Telemetry
      </h1>
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mb-4">
        Telemetry data can be shared and analysed in order to detect problems or
        compare the driving style of different laps or drivers. We use the{' '}
        <b>ACTI app</b> (recording) and the <b>Motec i2</b> software (analysis),
        both of which are available free of charge.
      </p>
      <InfoBlock color="blue">
        <p className="text-base">
          To generate the data, you first need the ACTI app. The overtake.gg
          package contains detailed installation instructions:
          <a
            href="https://www.racedepartment.com/downloads/acti-assetto-corsa-telemetry-interface.3948/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 ml-1"
          >
            ACTI on RaceDepartment
          </a>
        </p>
        <p className="text-base">
          This package also includes a Motec installer, but you can also get the
          latest version directly here (i2 Pro):
          <a
            href="https://www.motec.com.au/i2/i2downloads/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 ml-1"
          >
            Motec i2 Downloads
          </a>
        </p>
      </InfoBlock>
      <div className="my-6 space-y-4">
        <p className="text-base text-gray-800 dark:text-gray-200">
          To save telemetry data, the ACTI software must be running while
          driving. You can recognise the status in the ingame app. The light
          should be green.
        </p>
        <p className="text-base text-gray-800 dark:text-gray-200">
          ACTI generates <code className="bg-muted px-1 rounded">*.ld</code> and{' '}
          <code className="bg-muted px-1 rounded">*.ldx</code> files that can be
          imported into Motec. We also share these files with each other.
        </p>
        <p className="text-base text-gray-800 dark:text-gray-200">
          In the Assetto Corsa forum a user named <b>Manic</b> has created a
          pretty cool ACC workspace, which we have partially adapted for AC. You
          can get the customised workspace on our Discord. Simply unzip the
          folder and then paste it into{' '}
          <code className="bg-muted px-1 rounded">
            \Documents\MoTeC\i2\Workspaces
          </code>
          . It should then be displayed as a workspace in Motec.
        </p>
        <p className="text-base text-gray-800 dark:text-gray-200">
          Manic has created an overview video about the workspace and has also
          written several very detailed forum posts about its use.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <a
              href="https://www.youtube.com/watch?v=D0he1kyJVhw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
            >
              YouTube: Motec Workspace Overview
            </a>
          </li>
          <li>
            <a
              href="https://www.assettocorsa.net/forum/index.php?threads/motec-a-journey-getting-the-most-from-data-analysis.69903/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Assetto Corsa Forum: Motec Data Analysis
            </a>
          </li>
        </ul>

        <InfoBlock color="gray">
          Thanks to Baron for writing that guide.
        </InfoBlock>
      </div>
    </>
  );
}

export const Route = createFileRoute('/howto/record-telemetry')({
  component: HowToRecordTelemetry,
});

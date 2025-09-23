// src/content/rulesContent.tsx
// This file exports the rules content as a structured array for dynamic ToC and content rendering.
import React from 'react';

export interface RuleSection {
  id: string
  title: string
  content?: React.ReactNode
  subsections?: Array<RuleSection>
}

export const rulesContent: Array<RuleSection> = [
  {
    id: 'community-statutes',
    title: 'Community Statutes',
    subsections: [
      {
        id: 'community-intro',
        title: 'About virtual-Asphalt',
        content: (
          <>
            <p>
              <span className="font-semibold">
                virtual-Asphalt (abbreviation vA)
              </span>{' '}
              is a community of sim racing enthusiasts. Virtual races are
              prepared, trained, driven and celebrated together.
            </p>
            <p>
              The communication of the community takes place within{' '}
              <span className="font-semibold">Discord</span>.<br />
              We use <span className="font-semibold">ACswui</span> for the
              organisation of races.
            </p>
          </>
        ),
      },
      {
        id: 'community-goals',
        title: 'Community Goals',
        content: (
          <>
            <p>
              In addition to the obvious hobby of sim racing, we have a few
              specific goals that we are pursuing:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <span className="font-semibold">Mutual encouragement:</span> In
                preparation, we help each other to optimise the vehicle set-up,
                find the fastest driving line and the right tactics. Or with
                organisational problems, such as registering for races or
                solving software/hardware problems. We help newcomers in
                particular to find their way around.
              </li>
              <li>
                <span className="font-semibold">Weekly races:</span> We run one
                event per week – every Monday. This is usually one race or
                several shorter consecutive races. We use the days between races
                for preparation and training. We explicitly do not want to run
                an online server continuous race loop.
              </li>
              <li>
                <span className="font-semibold">Variety:</span> We run both
                championships and open races. Everyone in the community has a
                say in the choice of vehicle and route.
              </li>
              <li>
                <span className="font-semibold">ACswui:</span> We use the ACswui
                system to plan and organise training and racing operations. As
                the main developer is also a vA member, we provide suggestions
                for further development.
              </li>
            </ul>
            <p>
              Membership of the community is voluntary, informal and free of
              charge. There is no official register of members.
            </p>
          </>
        ),
      },
      {
        id: 'race-directors',
        title: 'Race Directors',
        content: (
          <>
            <p>
              Organisational tasks within the vA community are carried out by
              the race directors. Members of the race directors are appointed
              (not elected). The tasks of the race directors are not voluntary,
              but are carried out dutifully and responsibly.
            </p>
            <p>The race directors have the following tasks:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <span className="font-semibold">
                  Definition of the statutes:
                </span>{' '}
                These regulations are maintained by the race organisers, taking
                into account the wishes of the vA community.
              </li>
              <li>
                <span className="font-semibold">Organisation of races:</span>{' '}
                Planning, scheduling, announcing and organising championships
                and open races. The wishes of the community (regarding vehicle
                and track selection) are taken into account.
              </li>
              <li>
                <span className="font-semibold">Contact persons:</span>{' '}
                Complaints and problems (regarding the community!) can be
                reported to any race director. These reports will be handled
                confidentially and discreetly within the race organisation.
              </li>
              <li>
                <span className="font-semibold">
                  Enforcement of the reglement:
                </span>{' '}
                Race directors enforce the track regulations at events. Only the
                race directors are authorised to impose penalties within the vA
                community. Offences against the track regulations at events are
                investigated sporadically (random checks) or on the basis of a
                complaint from a driver.
              </li>
              <li>
                <span className="font-semibold">External image:</span>{' '}
                Production and distribution of race announcements and
                promotional material to external organisations (with their
                permission).
              </li>
              <li>
                <span className="font-semibold">Voting:</span> All race
                directors carry out their activities in coordination with the
                other race directors. In this way, the race directors represents
                a common strategy. To this end, all race organisers are
                committed to active communication.
              </li>
              <li>
                <span className="font-semibold">Quorum:</span> The race
                organisation is quorate with at least three members. In cases of
                understaffing, drivers can temporarily fill in the race
                management. Decisions are made with at least 75% majority.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
  // ...existing reglement (rules) sections below...
  {
    id: 'general-conduct',
    title: 'General Conduct',
    content: (
      <>
        <p>
          Tolerance, loyal behavior and mutual appreciation are the basis for a
          trusting environment. Driving actions with the recognizable aim of
          deliberately causing harm to a fellow competitor will not be tolerated
          at any time. This rule applies to driving in all parts of the
          competition, the chat or voice chat as well as the race debriefing in
          the forum and any other external communication between drivers. In
          serious cases, disqualification may be the consequence. Drivers who
          obstruct or endanger other drivers through their driving style or do
          not meet the requirements of the event may be disqualified from
          further participation in the event by the race management. Drivers who
          obviously obstruct, block, push off or endanger other drivers may be
          subject to penalties.
        </p>
        <p>
          Compliance with the regulations is based on trust. It is not mandatory
          for the race management to check the behavior of every driver.
          Protests against individual cases are possible by reporting them to
          the race management after the race.
        </p>
      </>
    ),
  },
  {
    id: 'drivers-briefing',
    title: 'Drivers Briefing',
    content: (
      <p>
        If necessary, a driver briefing will take place before the
        qualification. Special details will be announced in the invitation to
        the event.
      </p>
    ),
  },
  {
    id: 'flag-signals',
    title: 'Flag Signals',
    content: (
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <span className="font-semibold">Yellow Flag:</span> Indicates a danger
          or an obstacle next to or on the track. The speed at the danger zone
          must be adapted to the situation. Overtaking is prohibited.
        </li>
        <li>
          <span className="font-semibold">Blue Flag (in race only):</span> Shown
          to a vehicle that is about to be lapped (see chapter Lapping). The
          flag indicates to the driver that he must allow the following vehicle
          to overtake.
        </li>
      </ul>
    ),
  },
  {
    id: 'behavior-on-track',
    title: 'Behavior on the Track',
    subsections: [
      {
        id: 'track-limits',
        title: 'Track Limits',
        content: (
          <p>
            The track is basically defined by the track boundary lines or the
            road surface and is usually monitored automatically by Real Penalty.
            Curbs, artificial turf, grass pavers, speed bumps and raised curbs,
            which are usually placed in the second row, as well as other
            facilities attached to the normal curb, are not considered a track.
            At least one tire must be inside or on the track at all times. A
            tire is on the track as long as a part of the tire is still in
            contact with the track. In addition to this regulation, there may be
            special regulations for each track, which will be announced in the
            regulations or the drivers’ briefing.
          </p>
        ),
      },
      {
        id: 'overtaking',
        title: 'Overtaking',
        content: (
          <p>
            In a direct battle, the driver in front is allowed to change lanes
            once, but never as a direct reaction to the driver behind
            (blocking). As soon as there is an overlap between two vehicles, on
            a straight or in front of a braking zone, you must keep your own
            line. When attempting to outbrake a driver, the procedure must be
            aborted and the racing line released if the vehicle does not reach
            an overlap of half a vehicle length before the turn-in point.
            Furthermore, the vehicle may only enter the corner at a suitable
            speed. It must be possible to hold your own line (divebomb).
          </p>
        ),
      },
      {
        id: 'overlapping-multiclass',
        title: 'Overlapping and Multi Class Races',
        content: (
          <p>
            If a lapping maneuver is imminent, the overtaking driver is always
            responsible for ensuring a clean overtaking maneuver. In case of
            doubt, the overtaking must be aborted. The driver being lapped may
            only leave the racing line if this happens early and is clearly
            recognizable to the driver being lapped. The driver being lapped may
            not defend himself or block the driver behind him. This rule also
            applies to multi-class races (lower classes may not defend).
          </p>
        ),
      },
      {
        id: 'brake-points',
        title: 'Brake Points',
        content: (
          <p>
            Every driver must select the braking points and speed in such a way
            that they can prevent a collision with the vehicle in front.
            Particular care is required in the start phase, as braking points
            may change here. Exceptional braking points without necessity must
            be strictly avoided. It is expressly forbidden to deliberately allow
            the vehicle behind to run into you (brake testing).
          </p>
        ),
      },
      {
        id: 'leaving-track',
        title: 'Leaving the Track',
        content: (
          <p>
            If a driver leaves the road, they must ensure that no one is impeded
            when they drive back on.
          </p>
        ),
      },
      {
        id: 'stopping-on-track',
        title: 'Stopping on Track',
        content: (
          <p>
            A driver may not stop and leave his vehicle on the track, but must
            drive it into the pit lane or to another place off the track.
          </p>
        ),
      },
      {
        id: 'driving-with-damage',
        title: 'Driving with Damage',
        content: (
          <p>
            If a driver is relatively slower than other vehicles due to damage
            to his car, the vehicle should drive outside the racing line or
            clear the racing line at a suitable point as soon as a faster
            vehicle catches up.
          </p>
        ),
      },
    ],
  },
  {
    id: 'qualification',
    title: 'Qualification',
    content: (
      <p>
        In general, drivers on a fast lap must be allowed to pass without being
        impeded, unless you are on a fast lap yourself. This applies, among
        other things, to the outlap, the inlap and if you are no longer on a
        fast lap due to a mistake or cut. The pit lane must be left and entered
        in such a way that no drivers on a fast lap are impeded.
      </p>
    ),
  },
  {
    id: 'pit-lane',
    title: 'Pit Lane',
    content: (
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Vehicles entering the race track may neither touch nor cross the solid
          line at the pit exit. At the pit entrance, consideration must be given
          to the traffic behind.
        </li>
        <li>
          There is a speed limit in the pit lane which must be observed from the
          pit line onwards. The pit lane may only be entered at the maximum
          speed limit, no automatic braking is active. The entry speed is
          monitored by Real Penalty.
        </li>
        <li>
          The pit line is the line that is also recognized by Real Penalty. As
          this may deviate from the visually recognizable line on some tracks,
          it is recommended that every driver explicitly practices the pit entry
          on each track.
        </li>
      </ul>
    ),
  },
  {
    id: 'race-ending',
    title: 'Race Ending',
    subsections: [
      {
        id: 'finishing-the-race',
        title: 'Finishing the Race',
        content: (
          <p>
            The end of the race is indicated to the leading driver by showing
            the chequered flag as he crosses the finish line. When the
            prescribed number of laps is reached, first the fastest driver and
            then all those following are waved off, regardless of the number of
            laps they have completed. In races over a timed distance, the flag
            is waved when the leader crosses the finish line after the time has
            elapsed.
          </p>
        ),
      },
      {
        id: 'race-classification',
        title: 'Race Classification',
        content: (
          <p>
            The winner is the driver who has covered the specified distance with
            his vehicle in the shortest time. In races over a certain time
            distance, the lap started is completed after the time has elapsed.
            The winner is the driver who has completed the highest number of
            laps. If the number of laps is equal, the winner is the driver who
            has completed the number of laps first.
          </p>
        ),
      },
      {
        id: 'minimum-distance',
        title: 'Minimum Distance',
        content: (
          <p>
            In all races, only vehicles that have completed at least 66% of the
            distance covered by the winner will be classified.
          </p>
        ),
      },
    ],
  },
  {
    id: 'championships',
    title: 'Championships',
    content: (
      <p>
        In championships, points are usually counted using the ACswui system. If
        drivers have the same points in the final table, the best positions
        (most first places, most second places, etc.) count.
      </p>
    ),
  },
  {
    id: 'server-crashes',
    title: 'Server Crashes and Technical Problems',
    content: (
      <>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <span className="font-semibold">
              &lt;50% race distance covered:
            </span>{' '}
            The race will be restarted, if necessary on a new date.
          </li>
          <li>
            <span className="font-semibold">
              50%-75% race distance covered:
            </span>{' '}
            50% of the planned points will be awarded.
          </li>
          <li>
            <span className="font-semibold">
              75%-100% race distance covered:
            </span>{' '}
            The full number of points will be awarded.
          </li>
        </ul>
        <p>
          There might be exceptions to this rules, depending in the specific
          problems and other constraints.
        </p>
        <p>
          The basis for scoring in the event of an abandonment is the order of
          the last completed lap. Penalties already imposed but not yet
          completed will be converted into appropriate time penalties after the
          race and added to the total time of the respective drivers. If the
          results cannot be reconstructed, the race will not be scored.
        </p>
      </>
    ),
  },
  {
    id: 'technical-requirements',
    title: 'Technical Requirements',
    subsections: [
      {
        id: 'hardware',
        title: 'Hardware',
        content: (
          <p>
            Insufficient technical equipment does not count as an mitigating
            circumstance. The use of a headset or microphone is recommended for
            communication via voice chat, especially with the race management.
          </p>
        ),
      },
      {
        id: 'server-connection',
        title: 'Server Connection',
        content: (
          <p>
            The driver must have a stable internet connection. Each driver must
            ensure that their connection to the server does not have high
            latency or latency fluctuations and that they do not endanger or
            hinder other drivers due to connection problems.
          </p>
        ),
      },
    ],
  },
  {
    id: 'protest',
    title: 'Protest',
    subsections: [
      {
        id: 'protest-decisions',
        title: 'Protest against decisions of the race director',
        content: (
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Decisions of the race directors are final and cannot be appealed.
            </li>
            <li>
              A protest against the result of the qualifying session is not
              permitted.
            </li>
          </ul>
        ),
      },
      {
        id: 'protest-other-drivers',
        title: 'Protest against other drivers',
        content: (
          <>
            <p>
              Only drivers have the right to protest. If a driver wishes to file
              a protest against another driver, the following formalities must
              be observed:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <span className="font-semibold">Reason:</span> Situations that
                violate the regulations can be cited as a reason for protest
              </li>
              <li>
                <span className="font-semibold">Form:</span> via Discord as a
                direct message to a race director
              </li>
              <li>
                <span className="font-semibold">Content:</span> Protest driver,
                protest opponent, video clip with exterior and cockpit views of
                both drivers
              </li>
              <li>
                <span className="font-semibold">Deadline:</span> Protests can be
                lodged at the earliest 24 hours and at the latest 48 hours after
                the end of the race.
              </li>
            </ul>
            <p>No objections can be raised against technical errors.</p>
          </>
        ),
      },
    ],
  },
  {
    id: 'penalties',
    title: 'Penalties',
    content: (
      <>
        <p>
          The use of third-party software that influences or changes basic game
          mechanics (cheating) leads to immediate exclusion.
        </p>
        <p>
          In principle, the race directors assess incidents and impose any
          resulting penalties. Penalties can range from a five-second penalty to
          disqualification or point deduction. Race directors may impose
          penalties not listed here in accordance with the regulations.
        </p>
      </>
    ),
    subsections: [
      {
        id: 'announcement-of-penalties',
        title: 'Announcement of Penalties',
        content: (
          <p>
            Penalties are generally announced via Discord. As a rule, the
            announcement should be made up to one week after the end of the
            event, but in exceptional cases 24 hours before the following event.
          </p>
        ),
      },
      {
        id: 'reasons-for-mitigation',
        title: 'Reasons for Mitigation',
        content: (
          <p>
            Moments of surprise, opaque racing situations etc. awaiting the
            other party in the accident unusual consequences due to incorrect
            physical calculations may be taken into account to reduce the
            penalty.
          </p>
        ),
      },
      {
        id: 'exemption-from-punishment',
        title: 'Exemption from Punishment',
        content: (
          <p>
            In the case of very light contacts with no effect on the race, which
            are common within the series.
          </p>
        ),
      },
    ],
  },
];

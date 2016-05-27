#Waypoint control

Waypoint based control mechanism relies heavily on Artificial Intelligence running on a vessel and instructions set by the operator to provide "set and forget" like user experience.

#AI

## Evade maneuvers

## Feedback loop frequency

## Object detection

## Learned paths

## Waypoint weights
    - each waypoint has weight from 0 to 1 based on how difficult it is to handle from remote (etc.)

#Input and output parameters

## Physical limitations
  - function of engine momentum
  - function of acceleration/deceleration
  - function of changing the orientation, etc
  - weight distribution/control capabilities changing functions, etc

## Sensor data
  - engine control unit readings
  - etc ??

## Waypoint
    - speed at the endpoint or average speed between current and next endpoint
    - visit radius for fuel efficiency, smaller radius for precise point visit, bigger radius for possibility to orient the ship more free to save fuel
    - actions to be taken (e.g. automated radio commands)


#Usage flow

## Desired path
  - operator selects the desired path from predesigned paths or create new one
  - operator selects start and destination points and the desired path is created according to ship parameters, weather conditions, traffic schedules, ets, automatically setting waypoints, their weights and parameters

## Precalculated ship real path
  - real path of the ship should be matching desired path as close as possible
  - keep in mind best performance, fuel efficiency and speed of traveling, plus more parameters
  - operator sees the line of precalculated path along with the desired path on the map

## Ship path track
  - as ship moves, behind the ship oeprator sees the track of the last 10 minutes of the vesel path, sees how it was matching the designed and precalculated path
  - track is used by AI to calculate next step of ship movement to keep it on desired track

## Safety zone
- safely maneuverable area
- ship inertia limits the fast changing of the orientation of the ship, this area along the desired path should be clear in order to make sure ship will operate Safety
- if obstacle is detected in the safe area AI should recalibrate nest control steps, move next waypoint, or emerge a control to the shore operator if not possible to fix the problem automatically
- safe area depends on waypoint weight and ship parameters

## External conditions
- wind
- current
- weather
- radar readings
- other vesels signals?

## Scenario 1

Coastal map with desired path
- both harbors visible on map
- path is split into segments with criticality levels
    - from harbor to safe area (open ocean) -> criticality is PAN-PAN -> instructed in detail from remote control center
    - inside safe area -> criticality is autonomous -> monitored from remote control center (AI replication)
    - from safe to target harbor -> criticality is PAN-PAN -> instructed in detail from remote control center

import { mapStateToProps } from "../BoatListContainer";
import BoatRecord from "../../records/BoatRecord";
import WaterEventRecord from "../../records/WaterEventRecord";
import AttendeeRecord from "../../records/AttendeeRecord";
import { Map, List } from "immutable";
import { isArray } from "lodash";

describe("BoatListContainer", () => {
    it("maps state to props", () => {
        const state = {
            eventSettings: new WaterEventRecord(),
            boats: new Map({
                "boat-1": new BoatRecord({
                    boatId: "boat-1",
                    seatAssignments: Map([
                        [1, "rower-1"]
                    ])
                })
            }),
            attendees: new List([
                new AttendeeRecord({
                    attendeeId: "rower-1"
                }),
                new AttendeeRecord({
                    attendeeId: "rower-2"
                })
            ])
        };

        const props = mapStateToProps(state);
        const firstBoat = props.boats.first();

        const attendeeIdsInFirstBoat = firstBoat
            .get("attendees")
            .map(a => a.attendeeId)
            .toJS();

        expect(props.boats.count()).toBe(1);
        expect(firstBoat.getIn(["boat", "boatId"])).toBe("boat-1");
        expect(attendeeIdsInFirstBoat).toContain("rower-1");
        expect(attendeeIdsInFirstBoat).not.toContain("rower-2");
    });
});
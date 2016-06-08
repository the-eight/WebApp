import { Record } from "immutable";

const EventDetailsRecord = Record({
    eventId: "",
    date: new Date(1900, 0, 1),
    notes: "",
    mode: PRACTICE_MODE
});

export default EventDetailsRecord
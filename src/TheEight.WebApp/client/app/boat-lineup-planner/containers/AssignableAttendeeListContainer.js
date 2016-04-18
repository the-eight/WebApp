import AssignableAttendeeList from "../components/AssignableAttendeeList";
import { connect } from "react-redux";
import { List } from "immutable";
import { bindActionCreators } from "redux";
import { placeAttendees } from "../actionCreators";

export const attendeeIsAssignable = (attendee, boats, allowMultiple) => {
    if (allowMultiple) {
        return true;
    }

    const assigned = boats.map(b => b.seatAssignments.valueSeq()).flatten();
    const attendeeId = attendee.attendeeId;
    return !assigned.contains(attendeeId);
};

export const mapStateToProps = ({attendees, boats, eventSettings}) => {
    const assignableAttendees = attendees
        .filter(a => attendeeIsAssignable(a, boats, 
            eventSettings.allowMultipleAttendeeAssignments))
        .groupBy(a => a.isCoxswain ? "coxswains" : "rowers");

    const rowers = assignableAttendees.has("rowers")
        ? assignableAttendees.get("rowers").sortBy(a => a.sortName)
        : List();
    
    const coxswains = assignableAttendees.has("coxswains")
        ? assignableAttendees.get("coxswains").sortBy(a => a.sortName)
        : List();

    return { coxswains, rowers };
};

export const mapDispatchToProps = dispatch => 
    bindActionCreators({ placeAttendees }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignableAttendeeList);
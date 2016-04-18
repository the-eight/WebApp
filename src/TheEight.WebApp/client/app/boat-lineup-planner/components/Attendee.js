import Radium from "radium";
import { Component } from "react";
import { DragSource } from "react-dnd";
import { defaultDragCollector } from "../../common/dndDefaults";

export const dragSpec = {
    beginDrag: ({ attendee: { attendeeId }, seat }) => ({
        draggedAttendeeId: attendeeId,
        draggedOriginSeat: seat
    })
};

const styles = {
    root: {
        base: {
            "marginBottom": "10px",
            "padding": "10px",
            "color": "#F5F5F5",
            "cursor": "grab"
        },
        rower: {
            "backgroundColor": "#304F66"
        },
        coxswain: {
            "backgroundColor": "#2A4458"
        }
    }
};

@DragSource("ATTENDEE", dragSpec, defaultDragCollector)
@Radium
export default class extends Component {
    render() {
        const { attendee, connectDragSource } = this.props;
    
        const rootStyles = [styles.root.base];
        rootStyles.push(attendee.isCoxswain ? styles.root.coxswain : styles.root.rower);

        return connectDragSource(
            <div style={rootStyles}>
		        {attendee.displayName}
	        </div>
        );
    }
}

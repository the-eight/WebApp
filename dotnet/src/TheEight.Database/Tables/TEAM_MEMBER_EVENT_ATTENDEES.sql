﻿CREATE TABLE [dbo].[TEAM_MEMBER_EVENT_ATTENDEES]
(
    [AttendeeId] UNIQUEIDENTIFIER NOT NULL, 
    [TeamMemberId] UNIQUEIDENTIFIER NOT NULL, 
    CONSTRAINT [PK__TEAM_MEMBER_EVENT_ATTENDEES] PRIMARY KEY ([AttendeeId]), 
    CONSTRAINT [FK__TEAM_MEMBER_EVENT_ATTENDEES__EVENT_ATTENDEES] FOREIGN KEY ([AttendeeId]) 
        REFERENCES [EVENT_ATTENDEES]([AttendeeId]), 
    CONSTRAINT [FK__TEAM_MEMBER_EVENT_ATTENDEES__TEAM_MEMBERS] FOREIGN KEY ([TeamMemberId]) 
        REFERENCES [TEAM_MEMBERS]([TeamMemberId])
)
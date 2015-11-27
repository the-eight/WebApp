﻿using System.Collections.Generic;
using NodaTime;

namespace TheEight.Domain.Teams
{
    public class Team
    {
        public string Id { get; set; }

        public string Name { get; set; }
        public Interval ActivePeriod { get; set; }

        public IList<TeamMember> TeamMembers { get; set; } = new List<TeamMember>();
    }
}

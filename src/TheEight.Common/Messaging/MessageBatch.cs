﻿using System.Collections.Generic;

namespace TheEight.Common.Messaging
{
    public class MessageBatch
    {
        public IEnumerable<string> RecipientIds { get; set; }
        public Message Message { get; set; }
    }
}
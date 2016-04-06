﻿using System;
using Base32;

namespace TheEight.WebApp.Services.Invites
{
    public class AccessCodeGenerator : IAccessCodeGenerator
    {
        public string GenerateCode()
        {
            var rng = new Random();
            var randomBytes = new byte[14];
            rng.NextBytes(randomBytes);

            var uniqueBytes = Guid.NewGuid().ToByteArray();

            var combinedBytesLength = randomBytes.Length + uniqueBytes.Length;
            var combinedBytes = new byte[combinedBytesLength];
            randomBytes.CopyTo(combinedBytes, 0);
            uniqueBytes.CopyTo(combinedBytes, randomBytes.Length);

            var encoded = Base32Encoder.Encode(combinedBytes);
            return encoded;
        }
    }
}
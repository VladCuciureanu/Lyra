using Lyra.Application.Common.Interfaces;
using System;

namespace Lyra.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
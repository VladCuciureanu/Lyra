using System;
using Lyra.Application.Common.Interfaces;

namespace Lyra.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
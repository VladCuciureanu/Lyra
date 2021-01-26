using Lyra.Domain.Common;
using System.Threading.Tasks;

namespace Lyra.Application.Common.Interfaces
{
    public interface IDomainEventService
    {
        Task Publish(DomainEvent domainEvent);
    }
}
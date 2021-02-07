using System.Threading.Tasks;
using Lyra.Domain.Common;

namespace Lyra.Application.Common.Interfaces
{
    public interface IDomainEventService
    {
        Task Publish(DomainEvent domainEvent);
    }
}
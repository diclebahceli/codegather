using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class GetAllSubmissionsQueryHandler : BaseHandler, IRequestHandler<GetAllSubmissionsQueryRequest, GetAllSubmissionsQueryResponse>
{
    public GetAllSubmissionsQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetAllSubmissionsQueryResponse> Handle(GetAllSubmissionsQueryRequest request, CancellationToken cancellationToken)
    {
        var submissions = await unitOfWork.GetReadRepository<Submission>().GetAllAsync();
        return new GetAllSubmissionsQueryResponse
        {
            Submissions = submissions
        };
    }
}


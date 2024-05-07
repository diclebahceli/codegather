using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class GetSubmissionByIdQueryHandler : BaseHandler, IRequestHandler<GetSubmissionByIdQueryRequest, GetSubmissionByIdQueryResponse>
{
    public GetSubmissionByIdQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public Task<GetSubmissionByIdQueryResponse> Handle(GetSubmissionByIdQueryRequest request, CancellationToken cancellationToken)
    {
        var submission = await unitOfWork.GetReadRepository<Submission>().GetByIdAsync(request.SubmissionId);
        return new GetSubmissionByIdQueryResponse
        {
            Submission = submission
        };
    }
}

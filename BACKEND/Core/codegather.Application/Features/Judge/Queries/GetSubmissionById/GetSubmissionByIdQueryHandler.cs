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

    public async Task<GetSubmissionByIdQueryResponse> Handle(GetSubmissionByIdQueryRequest request, CancellationToken cancellationToken)
    {
        var submission = await unitOfWork.GetReadRepository<Submission>().GetAsync(predicate: s => s.Id == request.SubmissionId && !s.IsDeleted, enableTracking: false) ?? throw new Exception("Submission not found");
        return new GetSubmissionByIdQueryResponse
        {
            Submission = mapper.Map<SubmissionDto, Submission>(submission)
        };
    }
}

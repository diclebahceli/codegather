using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;

public class GetAllQuestionsQueryHandler : BaseHandler, IRequestHandler<GetAllQuestionsQueryRequest, GetAllQuestionsQueryResponse>
{
    public GetAllQuestionsQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetAllQuestionsQueryResponse> Handle(GetAllQuestionsQueryRequest request, CancellationToken cancellationToken)
    {
        var questions = await unitOfWork
        .GetReadRepository<Question>()
        .GetAllAsync(include: q => q.Include(q => q.Competition), enableTracking: false, predicate: q => !q.IsDeleted);

        mapper.AddConfig<CompetitionDto, Competition>();

        var response = new GetAllQuestionsQueryResponse
        {
            Questions = questions.Select(q => mapper.Map<QuestionDto, Question>(q)).ToList()
        };

        return response;
    }
}

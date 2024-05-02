using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace codegather.Application;
public class GetQuestionByIdQueryHandler : BaseHandler, IRequestHandler<GetQuestionByIdQueryRequest, GetQuestionByIdQueryResponse>
{
    public GetQuestionByIdQueryHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<GetQuestionByIdQueryResponse> Handle(GetQuestionByIdQueryRequest request, CancellationToken cancellationToken)
    {
        var question = await unitOfWork.GetReadRepository<Question>().GetAsync(
            predicate: q => q.Id == request.Id,
            include: q => q.Include(q => q.Submissions.Where(s => !s.IsDeleted))
            .Include(q => q.TestCases.Where(t => !t.IsDeleted)));

        if (question == null)
            throw new Exception("No such question found");

        return new GetQuestionByIdQueryResponse
        {
            Question = mapper.Map<QuestionDto, Question>(question),
            Submissions = question.Submissions.Select(s => mapper.Map<SubmissionDto>(s)).ToList(),
            TestCases = question.TestCases.Select(t => mapper.Map<TestCaseDto>(t)).ToList()
        };
    }
}

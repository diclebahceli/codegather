using codegather.Application;
using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;
public class UpdateQuestionCommandHandler: BaseHandler, IRequestHandler<UpdateQuestionCommandRequest, UpdateQuestionCommandResponse>
{
    public UpdateQuestionCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<UpdateQuestionCommandResponse> Handle(UpdateQuestionCommandRequest request, CancellationToken cancellationToken)
    {
        var question = await unitOfWork.GetReadRepository<Question>().GetAsync(predicate: q => q.Id == request.Id);
        if (question == null)
            throw new Exception("No such question found");


        question.Description = request.Description;
        question.TestCases = request.TestCases;

        await unitOfWork.GetWriteRepository<Question>().UpdateAsync(question);

        return new UpdateQuestionCommandResponse
        {
            Question = mapper.Map<QuestionDto>(question)
        };
    }
}

using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;
public class CreateQuestionCommandHandler : BaseHandler, IRequestHandler<CreateQuestionCommandRequest, CreateQuestionCommandResponse>
{
    public CreateQuestionCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<CreateQuestionCommandResponse> Handle(CreateQuestionCommandRequest request, CancellationToken cancellationToken)
    {
        Question question = mapper.Map<Question, CreateQuestionCommandRequest>(request);

        await unitOfWork.GetWriteRepository<Question>().AddAsync(question);
        await unitOfWork.SaveAsync();

        return new CreateQuestionCommandResponse
        {
            Question = mapper.Map<QuestionDto>(question)
        };

    }
}

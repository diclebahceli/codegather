using codegather.Application.Interfaces.AutoMapper;
using codegather.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;
public class DeleteQuestionCommandHandler : BaseHandler, IRequestHandler<DeleteQuestionCommandRequest, Unit>
{
    public DeleteQuestionCommandHandler(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
    }

    public async Task<Unit> Handle(DeleteQuestionCommandRequest request, CancellationToken cancellationToken)
    {
        var question = await unitOfWork.GetReadRepository<Question>().GetAsync(predicate: q => q.Id == request.Id);

        if(question == null)
            throw new Exception("No such question found");

        question.IsDeleted = true;

        await unitOfWork.GetWriteRepository<Question>().UpdateAsync(question);
        await unitOfWork.SaveAsync();

        return Unit.Value;
    }
}

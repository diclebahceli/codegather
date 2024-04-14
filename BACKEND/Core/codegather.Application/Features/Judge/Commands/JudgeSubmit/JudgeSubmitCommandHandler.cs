using codegather.Application.Interfaces.AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class JudgeSubmitCommandHandler : BaseHandler, IRequestHandler<JudgeSubmitCommandRequest, Unit>
{
    ICodeEditorService codeEditorService;
    public JudgeSubmitCommandHandler(ICodeEditorService codeEditorService, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.codeEditorService = codeEditorService;
    }

    public async Task<Unit> Handle(JudgeSubmitCommandRequest request, CancellationToken cancellationToken)
    {
        await codeEditorService.CreateSubmission(request.JudgeSubmission);

        return Unit.Value;

    }
}

using codegather.Application.Interfaces.AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class SubmitCommandHandler : BaseHandler, IRequestHandler<SubmitCommandRequest, SubmitCommandResponse>
{
    ICodeEditorService codeEditorService;
    public SubmitCommandHandler(ICodeEditorService codeEditorService, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.codeEditorService = codeEditorService;
    }

    public async Task<SubmitCommandResponse> Handle(SubmitCommandRequest request, CancellationToken cancellationToken)
    {
        RunResultDto result = await codeEditorService.CreateSubmission(request.JudgeSubmission);
        return new SubmitCommandResponse
        {
            JudgeResult = result

        };

    }


}

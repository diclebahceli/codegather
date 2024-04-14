using codegather.Application.Interfaces.AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class GetResultByTokenQueryHandler : BaseHandler, IRequestHandler<GetResultByTokenQueryRequest, GetResultByTokenQueryResponse>
{
    ICodeEditorService codeEditorService;
    public GetResultByTokenQueryHandler(ICodeEditorService codeEditorService, IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor) : base(mapper, unitOfWork, httpContextAccessor)
    {
        this.codeEditorService = codeEditorService;
    }

    public async Task<GetResultByTokenQueryResponse> Handle(GetResultByTokenQueryRequest request, CancellationToken cancellationToken)
    {
        // var result = await codeEditorService.GetResult(request.Token);
        // if (result == null)
        //     throw new Exception("No such submission found");

        // return new GetResultByTokenQueryResponse
        // {
        //     Submission = result
        // };
        return new GetResultByTokenQueryResponse();
    }
}

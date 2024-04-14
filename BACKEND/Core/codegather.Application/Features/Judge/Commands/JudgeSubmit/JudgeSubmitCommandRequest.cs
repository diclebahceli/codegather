using MediatR;

namespace codegather.Application;

public class JudgeSubmitCommandRequest : IRequest<JudgeSubmitCommandResponse>
{
    public JudgeSubmissionDto JudgeSubmission { get; set; }
}

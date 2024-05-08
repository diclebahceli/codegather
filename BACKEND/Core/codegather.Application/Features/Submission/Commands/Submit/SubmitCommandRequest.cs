using MediatR;

namespace codegather.Application;

public class SubmitCommandRequest : IRequest<SubmitCommandResponse>
{
    public JudgeSubmissionDto JudgeSubmission { get; set; }
}

using MediatR;

namespace codegather.Application;

public class JudgeSubmitCommandRequest : IRequest<Unit>
{
    public JudgeSubmissionDto JudgeSubmission { get; set; }
}

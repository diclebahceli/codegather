using codegather.Domain;

namespace codegather.Application;
public class GetUserScoresQueryResponse
{
   public ICollection<UserScoreDto> UserScores { get; set; }     
}

using System.Net.Http.Headers;
using System.Text;
using codegather.Application;
using Newtonsoft.Json;

namespace codegather.Infrastructure;

public class CodeEditorApiService : ICodeEditorService
{
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl = "https://api.judge0.com"; // Replace with actual API endpoint

    public CodeEditorApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }


    public async Task CreateSubmission(JudgeSubmissionDto judgeSubmissionDto)
    {
        var url = $"{_baseUrl}/submissions/?base64_encoded=false&wait=false";
        var contentString = JsonConvert.SerializeObject(judgeSubmissionDto);

        using var request = new HttpRequestMessage()
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*"),
            Headers =
    {
        { "X-RapidAPI-Key", "d610722e0amsh546a2f247001efcp1a8792jsn42efcc04d934" },
        { "X-RapidAPI-Host", "judge0-ce.p.rapidapi.com" },
    },
            Content = new StringContent(JsonConvert.SerializeObject(judgeSubmissionDto))
            {
                Headers =
        {
            ContentType = new MediaTypeHeaderValue("application/json")
        }
            }
        };

        using var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
    }



    public async Task<JudgeResultDto> GetResult(string token)
    {
        var url = $"{_baseUrl}/submissions/{token}?base64_encoded=false&fields=stdout,stderr,status_id,language_id";

        using var request = new HttpRequestMessage(HttpMethod.Get, url);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer");

        using var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var responseString = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<JudgeResultDto>(responseString);

        return result;
    }


}

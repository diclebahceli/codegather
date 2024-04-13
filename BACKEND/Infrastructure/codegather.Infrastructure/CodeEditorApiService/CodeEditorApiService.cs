using System.Net.Http.Headers;
using System.Text;
using codegather.Application;
using Newtonsoft.Json;

namespace codegather.Infrastructure;

public class CodeEditorApiService : ICodeEditorService
{
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl = " https://ce.judge0.com"; // Replace with actual API endpoint
    private readonly string _apiKey; // Replace with actual API key or token

    public CodeEditorApiService(HttpClient httpClient, string apiKey)
    {
        _httpClient = httpClient;
        _apiKey = apiKey;
    }


    public async Task CreateSubmission(JudgeSubmissionDto judgeSubmissionDto)
    {
        var url = $"{_baseUrl}/submissions/?base64_encoded=false&wait=false";
        var requestBody = new { judgeSubmissionDto };
        var contentString = JsonConvert.SerializeObject(requestBody);

        using var request = new HttpRequestMessage(HttpMethod.Post, url);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);
        request.Content = new StringContent(contentString, Encoding.UTF8, "application/json");

        using var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();
    }



    public async Task<JudgeResultDto> GetResult(string token)
    {
        var url = $"{_baseUrl}/submissions/{token}?base64_encoded=false&fields=stdout,stderr,status_id,language_id";

        using var request = new HttpRequestMessage(HttpMethod.Get, url);
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

        using var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var responseString = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<JudgeResultDto>(responseString);

        return result;
    }


}

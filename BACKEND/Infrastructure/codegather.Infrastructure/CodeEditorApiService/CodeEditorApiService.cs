using System.Net.Http.Headers;
using System.Text;
using codegather.Application;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace codegather.Infrastructure;

public class CodeEditorApiService : ICodeEditorService
{
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl = "https://api.judge0.com"; // Replace with actual API endpoint

    public CodeEditorApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }


    public async Task<JudgeResultDto> CreateSubmission(JudgeSubmissionDto judgeSubmissionDto)
    {

        using var request = new HttpRequestMessage()
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&fields=*"),
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

        using (var response = await _httpClient.SendAsync(request))
        {
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            JObject jsonObject = JObject.Parse(body);

            // Extract the token
            string token = (string)jsonObject["token"];
            JudgeResultDto res = await GetResult(token);
            Console.WriteLine(token);
            return res;
        }
    }



    public async Task<JudgeResultDto> GetResult(string token)
    {
        using var request = new HttpRequestMessage()
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://judge0-ce.p.rapidapi.com/submissions/{token}?base64_encoded=false&fields=*"),
            Headers =
    {
        { "X-RapidAPI-Key", "d610722e0amsh546a2f247001efcp1a8792jsn42efcc04d934" },
        { "X-RapidAPI-Host", "judge0-ce.p.rapidapi.com" },
    },

        };

        using (var response = await _httpClient.SendAsync(request))
        {
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            JObject jsonObject = JObject.Parse(body);

            // Extract the token
            string time = (string)jsonObject["time"];
            string memory = (string)jsonObject["memory"];

            string stderr = (string)jsonObject["stderr"];
            string stdout = (string)jsonObject["stdout"];


            string tokenn = (string)jsonObject["token"];

            Console.WriteLine(body);

            return new JudgeResultDto()
            {
                time = time,
                memory = Convert.ToInt32(memory),
                stderr = stderr,
                stdout = stdout,
                token = tokenn
            };


        }
    }
}




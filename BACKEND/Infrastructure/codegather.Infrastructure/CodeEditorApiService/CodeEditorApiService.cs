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

    public async Task<RunResultDto> GetResult(string token)
    {

        using var request = new HttpRequestMessage()
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://judge0-ce.p.rapidapi.com/submissions/{token}?base64_encoded=false&fields=*"),
            Headers =
    {
        { "X-RapidAPI-Key", "94738b5d94msh9b79d7aabe81986p1a8ed5jsn69188f7a57ee" },
        { "X-RapidAPI-Host", "judge0-ce.p.rapidapi.com" },
    },

        };

        using (var response = await _httpClient.SendAsync(request))
        {
            Console.WriteLine(response);
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            JObject jsonObject = JObject.Parse(body);

            // Extract the token
            string time = (string)jsonObject["time"];
            string memory = (string)jsonObject["memory"];

            string stderr = (string)jsonObject["stderr"];
            string stdout = ((string)jsonObject["stdout"])?.Trim();


            string tokenn = (string)jsonObject["token"];

            Console.WriteLine(body);

            return new RunResultDto()
            {
                time = time,
                memory = memory,
                stderr = stderr,
                stdout = stdout,
                token = tokenn
            };


        }
    }



    public async Task<RunResultDto> RunCode(RunSubmissionDto runSubmissionDto)
    {
        using var request = new HttpRequestMessage()
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&fields=*"),
            Headers =
    {
        { "X-RapidAPI-Key", "94738b5d94msh9b79d7aabe81986p1a8ed5jsn69188f7a57ee" },
        { "X-RapidAPI-Host", "judge0-ce.p.rapidapi.com" },
    },
            Content = new StringContent(JsonConvert.SerializeObject(runSubmissionDto))
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
            await Task.Delay(500);
            RunResultDto res = await GetResult(token);
            return res;
        }
    }

    public async Task<List<RunResultDto>> RunCode(List<RunSubmissionDto> runSubmissionDtos)
    {
        var requestBody = new
        {
            submissions = runSubmissionDtos
        };
        using var request = new HttpRequestMessage()
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri("https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=false&fields=*"),
            Headers =
    {
        { "X-RapidAPI-Key", "94738b5d94msh9b79d7aabe81986p1a8ed5jsn69188f7a57ee" },
        { "X-RapidAPI-Host", "judge0-ce.p.rapidapi.com" },
    },
            Content = new StringContent(JsonConvert.SerializeObject(requestBody))
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
            JArray jsonArray = JArray.Parse(body);
            var formattedList = new List<object>();

            foreach (var item in jsonArray)
            {
                var token = (string)item["token"];
                var formattedItem = new
                {
                    token
                };
                formattedList.Add(formattedItem);
            }

            await Task.Delay(500);

            List<RunResultDto> results = new();
            foreach (var item in formattedList)
            {
                var token = (string)item.GetType().GetProperty("token").GetValue(item, null);
                RunResultDto res = await GetResult(token);
                results.Add(res);
            }
            return results;
        }
    }
}

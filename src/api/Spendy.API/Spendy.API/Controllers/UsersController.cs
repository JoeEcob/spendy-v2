namespace Spendy.API.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Spendy.API.Models;
    using Spendy.API.Services;
    using System.Linq;
    using System.Threading.Tasks;

    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly UserService _userService;

        public UsersController(ILogger<UsersController> logger, UserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public async Task<ActionResult<User>> Get(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }

            return await _userService.Get(id);
        }

        [HttpPost]
        public async Task<ActionResult<User>> Create(User user)
        {
            var newUser = await _userService.Create(user);

            return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, newUser);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, User user)
        {
            if (user == null)
            {
                return NotFound();
            }

            var existingUser = await _userService.Get(id);
            if (existingUser == null)
            {
                _logger.LogDebug($"User not found: {id}");
                return NotFound();
            }

            user.Id = existingUser.Id;

            await _userService.Update(id, user);

            return NoContent();
        }
    }
}

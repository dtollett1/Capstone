using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CapstoneProject.Models;

namespace CapstoneProject.Controllers
{
    // All of these routes will be at the base URL:     /api/Films
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case FilmsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class FilmsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public FilmsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Films
        //
        // Returns a list of all your Films
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Film>>> GetFilms(string filter)
        {
            if (filter == null)
            {
                return await _context.Films.OrderByDescending(film => film.Id).Include(film => film.Locations).ToListAsync();
            }
            else
            {
                return await _context.Films.Where(film => film.Title.ToLower().Contains(filter.ToLower()) ||
                                                                  film.Description.ToLower().Contains(filter.ToLower())).
                                                                  OrderByDescending(film => film.Id).Include(film => film.Locations).ToListAsync();
            }
        }
        // GET: api/Films/5
        //
        // Fetches and returns a specific film by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Film>> GetFilm(int id)
        {
            // Find the film in the database using `FindAsync` to look it up by id
            var film = await _context.Films.Include(film => film.Locations).Where(film => film.Id == id).FirstOrDefaultAsync();

            // If we didn't find anything, we receive a `null` in return
            if (film == null)
            {
                // Return a `404` response to the client indicating we could not find a film with this id
                return NotFound();
            }

            //  Return the film as a JSON object.
            return film;
        }

        // PUT: api/Films/5
        //
        // Update an individual film with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Film
        // variable named film. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Film POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFilm(int id, Film film)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != film.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in film to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from film
            _context.Entry(film).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!FilmExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the updated data.
            //
            // return Ok(film)
            //
            return NoContent();
        }

        // POST: api/Films
        //
        // Creates a new film in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Film
        // variable named film. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Film POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<Film>> PostFilm(Film film)
        {
            // Indicate to the database context we want to add this new record
            _context.Films.Add(film);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetFilm", new { id = film.Id }, film);
        }

        // DELETE: api/Films/5
        //
        // Deletes an individual film with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFilm(int id)
        {
            // Find this film by looking for the specific id
            var film = await _context.Films.FindAsync(id);
            if (film == null)
            {
                // There wasn't a film with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Films.Remove(film);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the deleted data.
            //
            // return Ok(film)
            //
            return NoContent();
        }

        // Private helper method that looks up an existing film by the supplied id
        private bool FilmExists(int id)
        {
            return _context.Films.Any(film => film.Id == id);
        }
    }
}

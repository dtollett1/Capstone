using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CapstoneProject.Models;
using capstoneProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Geocoding.Microsoft;

namespace CapstoneProject.Controllers
{
    // All of these routes will be at the base URL:     /api/Locations
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case LocationsController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // API key for BING Maps
        private readonly string BING_MAPS_KEY;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public LocationsController(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            BING_MAPS_KEY = config["BING_MAPS_KEY"];
        }

        // GET: api/Locations
        //
        // Returns a list of all your Locations
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocations(string filter)
        {
            if (filter == null)
            {
                return await _context.Locations.OrderByDescending(location => location.Id).Include(location => location.Reviews).ToListAsync();
            }
            else
            {
                return await _context.Locations.Where(location => location.Name.ToLower().Contains(filter.ToLower()) ||
                                                                  location.Address.ToLower().Contains(filter.ToLower())).
                                                                  OrderByDescending(location => location.Id).Include(location => location.Reviews).ToListAsync();
            }
        }

        // GET: api/Locations/5
        //
        // Fetches and returns a specific location by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> GetLocation(int id)
        {
            // Find the location in the database using `FindAsync` to look it up by id


            var location = await _context.Locations.Include(location => location.Reviews).Where(location => location.Id == id).FirstOrDefaultAsync();

            // If we didn't find anything, we receive a `null` in return
            if (location == null)
            {
                // Return a `404` response to the client indicating we could not find a location with this id
                return NotFound();
            }

            //  Return the location as a JSON object.
            return location;
        }

        // PUT: api/Locations/5
        //
        // Update an individual location with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Location
        // variable named location. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Location POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocation(int id, Location location)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != location.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in location to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from location
            _context.Entry(location).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!LocationExists(id))
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
            // return Ok(location)
            //
            return NoContent();
        }

        // POST: api/Locations
        //
        // Creates a new location in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Location
        // variable named location. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Location POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Location>> PostLocation(Location location)
        {
            // Create a new geocoder
            var geocoder = new BingMapsGeocoder(BING_MAPS_KEY);

            // Request this address to be geocoded.
            var geocodedAddresses = await geocoder.GeocodeAsync(location.Address);

            // ... and pick out the best address sorted by the confidence level
            var bestGeocodedAddress = geocodedAddresses.OrderBy(address => address.Confidence).LastOrDefault();

            // If we have a best geocoded address, use the latitude and longitude from that result
            if (bestGeocodedAddress != null)
            {
                location.Latitude = bestGeocodedAddress.Coordinates.Latitude;
                location.Longitude = bestGeocodedAddress.Coordinates.Longitude;
            }

            // Set the UserID to the current user id, this overrides anything the user specifies.
            location.UserId = GetCurrentUserId();
            // Indicate to the database context we want to add this new record
            _context.Locations.Add(location);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetLocation", new { id = location.Id }, location);
        }

        // DELETE: api/Locations/5
        //
        // Deletes an individual location with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            // Find this location by looking for the specific id
            var location = await _context.Locations.FindAsync(id);
            if (location == null)
            {
                // There wasn't a location with that id so return a `404` not found
                return NotFound();
            }
            if (location.UserId != GetCurrentUserId())
            {
                // Make a custom error response
                var response = new
                {
                    status = 401,
                    errors = new List<string>() { "Not Authorized" }
                };

                // Return our error with the custom response
                return Unauthorized(response);
            }

            // Tell the database we want to remove this record
            _context.Locations.Remove(location);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // return NoContent to indicate the update was done. Alternatively you can use the
            // following to send back a copy of the deleted data.
            //
            // return Ok(location)
            //
            return NoContent();
        }

        // Private helper method that looks up an existing location by the supplied id
        private bool LocationExists(int id)
        {
            return _context.Locations.Any(location => location.Id == id);
        }
        // Private helper method to get the JWT claim related to the user ID
        private int GetCurrentUserId()
        {
            // Get the User Id from the claim and then parse it as an integer.
            return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
        }
    }
}

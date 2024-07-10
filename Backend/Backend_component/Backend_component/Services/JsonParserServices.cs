using Backend_component.Context;
using Backend_component.DTOS;
using Backend_component.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_component.Services
{
    public class JsonParserServices
    {
        private ArtistDbContext _artistDbContext;
        private AlbumDbContext _albumDbContext;
        private SongDbContext _songDbContext;

        public JsonParserServices(ArtistDbContext artistDbContext, AlbumDbContext albumDbContext, SongDbContext songDbContext)
        {
            _artistDbContext = artistDbContext;
            _albumDbContext = albumDbContext;
            _songDbContext = songDbContext;
        }

        public bool ParseJsonFile(JsonParserDTO pathToFile)
        {
            try
            {
                string jsonString = File.ReadAllText(pathToFile.PathToFile);
                var artistObjects = JsonConvert.DeserializeObject<List<ArtistParser>>(jsonString);

                // Extracting artists, albums, and songs from the JSON data
                foreach (var artistItem in artistObjects)
                {
                    Artist artist = new Artist()
                    {
                        Name = artistItem.Name,
                    };
                    _artistDbContext.Add(artist);
                    _artistDbContext.SaveChanges();

                    // Add the albums
                    foreach (var albumItem in artistItem.Albums)
                    {
                        Album album = new Album()
                        {
                            Title = albumItem.Title,
                            Description = albumItem.Description,
                            Artistid = artist.id,
                        };
                        _albumDbContext.Add(album);
                        _albumDbContext.SaveChanges();

                        // Add the songs
                        foreach (var songItem in albumItem.Songs)
                        {
                            Song song = new Song()
                            {
                                Title = songItem.Title,
                                Length = songItem.Length,
                                Albumid = album.id,
                            };
                            _songDbContext.Songs.Add(song);
                            _songDbContext.SaveChanges();
                        }
                    }
                }

            }
            catch(Exception ex)
            {
                Console.WriteLine($"Error parsing JSON file: {ex.Message}");
                return false;
            }
            return true;
        }
    }
}

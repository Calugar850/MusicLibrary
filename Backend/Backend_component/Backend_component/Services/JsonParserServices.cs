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
                var artistObjects = JsonConvert.DeserializeObject<List<JsonPARSER>>(jsonString);

                // Extracting artists, albums, and songs from the JSON data
                foreach (var artist in artistObjects)
                {
                    // Add the artist
                    //artists.Add(new Artist
                    //{
                    //    Name = artist.Name
                    //});

                    // Add the albums
                    foreach (var album in artist.Albums)
                    {
                        //albums.Add(new Album
                        //{
                        //    Id = album.Id,
                        //    Title = album.Title,
                        //    Description = album.Description,
                        //    ArtistId = album.ArtistId
                        //});

                        // Add the songs
                        //foreach (var song in album.Songs)
                        //{
                        //    //songs.Add(new Song
                        //    //{
                        //    //    Id = song.Id,
                        //    //    Title = song.Title,
                        //    //    Length = song.Length,
                        //    //    AlbumId = song.AlbumId
                        //    //});
                        //}
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

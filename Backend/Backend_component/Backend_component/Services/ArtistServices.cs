using Backend_component.Context;
using Backend_component.DTOS;
using Backend_component.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_component.Services
{
    public class ArtistServices
    {
        private ArtistDbContext _artistDbContext;
        private AlbumDbContext _albumDbContext;
        private SongDbContext _songDbContext;

        public ArtistServices(ArtistDbContext artistDbContext, AlbumDbContext albumDbContext, SongDbContext songDbContext)
        {
            this._artistDbContext = artistDbContext;
            this._albumDbContext = albumDbContext;
            this._songDbContext = songDbContext;
        }


        public int CreateArtist(ArtistDTO artistDTO)
        {
            Artist artist = new Artist()
            {
                Name = artistDTO.Name,
            };
            _artistDbContext.Add(artist);
            _artistDbContext.SaveChanges();

            return artist.id;
        }

        public ArtistDTO GetArtistById(int id)
        {
            Artist artist = _artistDbContext.Artists.Where(album => album.id == id).FirstOrDefault();
            return new ArtistDTO()
            {
                id = artist.id,
                Name = artist.Name,
            };
        }

        public List<ArtistDTO> GetAllArtists()
        {
            List<Artist> artists = _artistDbContext.Artists.ToList();
            return artists.Select(artist => new ArtistDTO
            {
                id = artist.id,
                Name = artist.Name,
            }).ToList();
        }

        public bool RemoveArtist(int id)
        {
            Artist artist = _artistDbContext.Artists.FirstOrDefault(song => song.id == id);
            if (artist != null)
            {
                _artistDbContext.Artists.Remove(artist);
                _artistDbContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public ArtistDTO UpdateArtist(ArtistDTO artistDTO)
        {
            Artist artist = _artistDbContext.Artists.FirstOrDefault(album => album.id == artistDTO.id);
            if (artist == null)
            {
                return null;
            }

            artist.Name= artistDTO.Name;

            _artistDbContext.SaveChanges();

            return artistDTO;
        }
    }
}

using Backend_component.Context;
using Backend_component.DTOS;
using Backend_component.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_component.Services
{
    public class AlbumServices
    {
        private AlbumDbContext _albumDbContext;
        private SongDbContext _songDbContext;

        public AlbumServices(AlbumDbContext albumDbContext, SongDbContext songDbContext)
        {
            _albumDbContext = albumDbContext;
            _songDbContext = songDbContext;
        }

        public int CreateAlbum(AlbumDTO albumDTO)
        {
            Album album = new Album()
            {
                Title = albumDTO.Title,
                Description = albumDTO.Description,
                Artistid = albumDTO.Artistid,
            };
            _albumDbContext.Add(album);
            _albumDbContext.SaveChanges();

            return album.id;
        }

        public AlbumDTO GetAlbumById(int id)
        {
            Album album = _albumDbContext.Albums.Where(album => album.id == id).FirstOrDefault();
            return new AlbumDTO()
            {
                id = album.id,
                Title = album.Title,
                Description = album.Description,
                Artistid = album.Artistid,
            };
        }

        public List<AlbumDTO> GetAllAlbums()
        {
            List<Album> albums = _albumDbContext.Albums.ToList();
            return albums.Select(album => new AlbumDTO
            {
                id = album.id,
                Title = album.Title,
                Description = album.Description,
                Artistid = album.Artistid,
            }).ToList();
        }

        public bool RemoveAlbum(int id)
        {
            Album album = _albumDbContext.Albums.FirstOrDefault(song => song.id == id);
            if (album != null)
            {
                _albumDbContext.Albums.Remove(album);
                _albumDbContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public AlbumDTO UpdateAlbum(AlbumDTO albumDTO)
        {
            Album album = _albumDbContext.Albums.FirstOrDefault(album => album.id == albumDTO.id);
            if (album == null)
            {
                return null;
            }

            album.Title = albumDTO.Title;
            album.Description = albumDTO.Description;
            album.Artistid = albumDTO.Artistid;

            _albumDbContext.SaveChanges();

            return albumDTO;
        }

        public List<AlbumDTO> GetAllAlbumsForArtist(int artistId)
        {
            List<Album> albums = _albumDbContext.Albums.Where(album => album.Artistid == artistId).ToList();
            return albums.Select(album => new AlbumDTO
            {
                id = album.id,
                Title = album.Title,
                Description = album.Description,
                Artistid = album.Artistid,
            }).ToList();
        }
    }
}

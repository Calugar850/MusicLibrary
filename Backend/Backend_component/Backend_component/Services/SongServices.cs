using Backend_component.Context;
using Backend_component.DTOS;
using Backend_component.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_component.Services
{
    public class SongServices
    {
        private SongDbContext _songDbContext;

        public SongServices(SongDbContext songDbContext)
        {
            _songDbContext = songDbContext;
        }

        public int CreateSong(SongDTO songDTO)
        {
            Song song = new Song()
            {
                Title = songDTO.Title,
                Length = songDTO.Length,
                Albumid = songDTO.Albumid,
            };
            _songDbContext.Songs.Add(song);
            _songDbContext.SaveChanges();

            return song.id;
        }

        public SongDTO GetSongById(int id)
        {
            Song song = _songDbContext.Songs.Where(song => song.id == id).FirstOrDefault();
            return new SongDTO()
            {
                id = song.id,
                Title = song.Title,
                Length = song.Length
            };
        }

        public List<SongDTO> GetAllSongs()
        {
            List<Song> songs = _songDbContext.Songs.ToList();
            return songs.Select(song => new SongDTO
            {
                id = song.id,
                Title = song.Title,
                Length = song.Length
            }).ToList();
        }

        public bool RemoveSong(int id)
        {
            Song song = _songDbContext.Songs.FirstOrDefault(song => song.id == id);
            if (song != null)
            {
                _songDbContext.Songs.Remove(song);
                _songDbContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public SongDTO UpdateSong(SongDTO songDTO)
        {
            Song song = _songDbContext.Songs.FirstOrDefault(s => s.id == songDTO.id);
            if (song == null)
            {
                return null;
            }

            song.Title = songDTO.Title;
            song.Length = songDTO.Length;
            song.Albumid = songDTO.Albumid;

            _songDbContext.SaveChanges();

            return songDTO;
        }

        public List<SongDTO> GetAllSongsForAlbum(int albumId)
        {
            List<Song> songs = _songDbContext.Songs.Where(song => song.Albumid == albumId).ToList();
            return songs.Select(song => new SongDTO
            {
                id = song.id,
                Title = song.Title,
                Length = song.Length
            }).ToList();
        }
    }
}

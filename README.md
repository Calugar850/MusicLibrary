Grad/Junior Full Stack Engineer

Setup Guide:

1. Open a terminal and run next command **git clone https://github.com/Calugar850/MusicLibrary.git**

2. Open the Backend part in Visul Studio, go to **appsettings.json** and modify ConectionStrings with the value from your database.

3. Open Package Manager Console and run these commands: **update-database -Context ArtistDbContext**, **update-database -Context AlbumDbContext**, **update-database -Context SongDbContext** to apply the migrations to your database.

4. Build the backend part and run it
  When the project starts a new tab will open where you have a swagger interface to test the implemented operations.

5. Open a terminal in  **frontend_component** folder and run the **npm start** command.
   When the project starts a new tab will open where you have the interface of the app.

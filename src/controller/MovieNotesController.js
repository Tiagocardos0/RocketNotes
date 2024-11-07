const knex = require("../database/knex");

class MovieNotesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const { user_id } = request.params;

        const [ movieNotesId ] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });

        const movieTags = tags.map(name => {
            return {
                notes_id: movieNotesId,
                user_id,
                name
            }
        });

        await knex("movie_tags").insert(movieTags);

        response.json();
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("movie_notes").where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const { title, user_id, tags } = request.query;

        let movieNotes;

        if(tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());

            movieNotes = await knex("movie_tags")
            .select([
                "movie_notes.id",
                "movie_notes.title",
                "movie_notes.user_id",
            ])

            .where("movie_notes.user_id", user_id)
            .whereLike("movie_notes.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("movie_notes", "movie_notes.id", "movie_tags.notes_id")
            .orderBy("movie_notes.title");

        }else {
            movieNotes = await knex("movie_notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        }

        const userTags = await knex("movie_tags").where({ user_id });
        const movieNotesWithTags = movieNotes.map(movieNotes => {
            const movieNotesTags = userTags.filter(tag => tag.notes_id === movieNotes.id);

            return {
                ...movieNotes,
                tags: movieNotesTags
            }
        });

        return response.json(movieNotesWithTags);
    }
}

module.exports = MovieNotesController;